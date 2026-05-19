#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const configPath = path.join(__dirname, "deploy.config.json");

interface DeployConfig {
  distDir: string;
  archiveName: string;
  serverUser: string;
  serverIP: string;
  serverDir: string;
  serverPort?: string | number | null;
}

interface ExecError extends Error {
  status?: number;
}

const log = {
  info(message: string) {
    console.log(`ℹ️  ${message}`);
  },
  success(message: string) {
    console.log(`✅ ${message}`);
  },
  error(message: string) {
    console.error(`❌ ${message}`);
  },
  step(message: string) {
    console.log(`🚀 ${message}`);
  },
};

function formatExecError(error: unknown): string {
  if (error && typeof error === "object" && "status" in error) {
    const status = (error as ExecError).status;
    if (typeof status === "number") {
      return ` (exit code ${status})`;
    }
  }
  return "";
}

function readConfig(): DeployConfig & { serverPort: string } {
  let raw: string;

  try {
    raw = fs.readFileSync(configPath, "utf8");
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`读取部署配置失败：${message}`, { cause: error });
  }

  let config: DeployConfig;

  try {
    config = JSON.parse(raw) as DeployConfig;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`部署配置 JSON 格式无效：${message}`, { cause: error });
  }

  const requiredKeys: (keyof DeployConfig)[] = ["distDir", "archiveName", "serverUser", "serverIP", "serverDir"];
  const missingKeys = requiredKeys.filter(key => {
    const value = config[key];
    return typeof value !== "string" || value.trim() === "";
  });

  if (missingKeys.length > 0) {
    throw new Error(`缺少必要的部署配置项：${missingKeys.join(", ")}`);
  }

  return {
    ...config,
    distDir: config.distDir.trim(),
    archiveName: config.archiveName.trim(),
    serverUser: config.serverUser.trim(),
    serverIP: config.serverIP.trim(),
    serverDir: config.serverDir.trim(),
    serverPort: config.serverPort === undefined || config.serverPort === null ? "" : String(config.serverPort).trim(),
  };
}

function validateRelativePath(value: string, fieldName: string): string {
  const normalized = value.replace(/\\/g, "/");

  if (path.posix.isAbsolute(normalized)) {
    throw new Error(`${fieldName} 必须是相对路径`);
  }

  const segments = normalized.split("/").filter(Boolean);

  if (segments.length === 0 || segments.includes("..")) {
    throw new Error(`${fieldName} 不能为空，且不能包含 ".."`);
  }

  return normalized;
}

function quotePosix(value: string): string {
  return `'${String(value).replace(/'/g, `'\\''`)}'`;
}

function buildSshArgs(serverPort: string): string[] {
  const args = ["-o", "StrictHostKeyChecking=accept-new", "-o", "ConnectTimeout=5"];

  if (serverPort) {
    args.push("-p", serverPort);
  }

  return args;
}

function buildScpArgs(serverPort: string): string[] {
  const args = ["-o", "StrictHostKeyChecking=accept-new", "-o", "ConnectTimeout=5"];

  if (serverPort) {
    args.push("-P", serverPort);
  }

  return args;
}

function crossSpawn(command: string, args: string[], options: { cwd?: string; stdio?: "inherit" | "pipe" } = {}): void {
  const isWindows = process.platform === "win32";
  const finalCommand = isWindows ? process.env.ComSpec || "cmd.exe" : command;
  const finalArgs = isWindows ? ["/c", command, ...args] : args;

  const result = spawnSync(finalCommand, finalArgs, {
    cwd: projectRoot,
    stdio: "inherit",
    ...options,
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    const err = new Error(`Command failed with exit code ${result.status}`) as ExecError;
    err.status = result.status ?? undefined;
    throw err;
  }
}

function runCommand(
  command: string,
  args: string[],
  description: string,
  options: { cwd?: string; stdio?: "inherit" | "pipe" } = {}
): void {
  log.step(description);

  try {
    crossSpawn(command, args, options);
    log.success(`${description}完成`);
  } catch (error) {
    throw new Error(`${description}失败${formatExecError(error)}`, { cause: error });
  }
}

function runSshBashScript(target: string, serverPort: string, scriptBody: string, description: string): void {
  log.step(description);
  const input = scriptBody.endsWith("\n") ? scriptBody : `${scriptBody}\n`;
  const result = spawnSync("ssh", [...buildSshArgs(serverPort), target, "bash", "-s"], {
    cwd: projectRoot,
    input,
    stdio: ["pipe", "inherit", "inherit"],
    windowsHide: true,
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    const err = new Error(`Command failed with exit code ${result.status}`) as ExecError;
    err.status = result.status ?? undefined;
    throw err;
  }

  log.success(`${description}完成`);
}

function checkSshConnection(config: DeployConfig & { serverPort: string }): void {
  const target = `${config.serverUser}@${config.serverIP}`;
  log.info(`检查 SSH 连接：${target}`);

  try {
    crossSpawn("ssh", [...buildSshArgs(config.serverPort), target, "printf ok"]);
    log.success("SSH 连接正常");
  } catch (error) {
    throw new Error(`SSH 连接检查失败${formatExecError(error)}`, { cause: error });
  }
}

function buildRemoteDeployEnv(config: DeployConfig & { serverPort: string }): string {
  const timestamp = Date.now();
  const remoteArchiveName = path.posix.basename(config.archiveName.replace(/\\/g, "/"));
  const remoteTargetPath = validateRelativePath(config.distDir, "distDir");

  return [
    `DEPLOY_SERVER_DIR=${quotePosix(config.serverDir)}`,
    `DEPLOY_TARGET_PATH=${quotePosix(remoteTargetPath)}`,
    `DEPLOY_ARCHIVE_NAME=${quotePosix(remoteArchiveName)}`,
    `DEPLOY_TIMESTAMP=${quotePosix(String(timestamp))}`,
  ].join(" ");
}

function deploy(): void {
  const config = readConfig();
  const distDir = validateRelativePath(config.distDir, "distDir");
  const archiveName = validateRelativePath(config.archiveName, "archiveName");
  const archivePath = path.resolve(projectRoot, archiveName);
  const localArchiveName = path.relative(projectRoot, archivePath);
  const target = `${config.serverUser}@${config.serverIP}`;
  const remoteArchiveName = path.posix.basename(archiveName.replace(/\\/g, "/"));
  const remoteArchivePath = path.posix.join(config.serverDir, remoteArchiveName);

  checkSshConnection(config);
  runCommand("pnpm", ["clean"], "🧹 清理旧的构建产物");
  runCommand("pnpm", ["build"], "📦 构建站点");

  if (!fs.existsSync(path.resolve(projectRoot, distDir))) {
    throw new Error(`构建产物不存在：${distDir}`);
  }

  try {
    fs.mkdirSync(path.dirname(archivePath), { recursive: true });
    fs.rmSync(archivePath, { force: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`准备本地压缩包路径失败：${message}`, { cause: error });
  }

  try {
    runCommand("tar", ["-zcf", localArchiveName, distDir], `🗜️  压缩 ${distDir}`);
    runCommand(
      "scp",
      [...buildScpArgs(config.serverPort), "-C", archivePath, `${target}:${remoteArchivePath}`],
      `📤 上传 ${remoteArchiveName} 到 ${target}`
    );
    const remoteDeployScript = fs.readFileSync(path.join(__dirname, "remote-deploy.sh"), "utf8");
    runSshBashScript(
      target,
      config.serverPort,
      `${buildRemoteDeployEnv(config)}\n${remoteDeployScript}`,
      `🖥️  在远程服务器部署 ${remoteArchiveName}`
    );
    fs.rmSync(path.resolve(projectRoot, distDir), {
      recursive: true,
      force: true,
    });
    log.success("🎉 部署完成");
  } finally {
    try {
      fs.rmSync(archivePath, { force: true });
      log.info(`🧹 已删除本地压缩包：${path.basename(archivePath)}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      log.info(`📁 跳过本地压缩包清理：${path.basename(archivePath)}（${message}）`);
    }
  }
}

try {
  deploy();
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  log.error(message);
  process.exit(1);
}
