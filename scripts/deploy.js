#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const projectRoot = path.resolve(__dirname, "..");
const configPath = path.join(__dirname, "deploy.config.json");

const log = {
  info(message) {
    console.log(`ℹ️  ${message}`);
  },
  success(message) {
    console.log(`✅ ${message}`);
  },
  error(message) {
    console.error(`❌ ${message}`);
  },
  step(message) {
    console.log(`🚀 ${message}`);
  },
};

function formatExecError(error) {
  if (typeof error?.status === "number") {
    return ` (exit code ${error.status})`;
  }
  return "";
}

function readConfig() {
  let raw;

  try {
    raw = fs.readFileSync(configPath, "utf8");
  } catch (error) {
    throw new Error(`读取部署配置失败：${error.message}`);
  }

  let config;

  try {
    config = JSON.parse(raw);
  } catch (error) {
    throw new Error(`部署配置 JSON 格式无效：${error.message}`);
  }

  const requiredKeys = [
    "distDir",
    "archiveName",
    "serverUser",
    "serverIP",
    "serverDir",
  ];
  const missingKeys = requiredKeys.filter(
    (key) => typeof config[key] !== "string" || config[key].trim() === ""
  );

  if (missingKeys.length > 0) {
    throw new Error(
      `缺少必要的部署配置项：${missingKeys.join(", ")}`
    );
  }

  return {
    ...config,
    distDir: config.distDir.trim(),
    archiveName: config.archiveName.trim(),
    serverUser: config.serverUser.trim(),
    serverIP: config.serverIP.trim(),
    serverDir: config.serverDir.trim(),
    serverPort:
      config.serverPort === undefined || config.serverPort === null
        ? ""
        : String(config.serverPort).trim(),
  };
}

function validateRelativePath(value, fieldName) {
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

function quotePosix(value) {
  return `'${String(value).replace(/'/g, `'\\''`)}'`;
}

function buildSshArgs(serverPort) {
  const args = [
    "-o",
    "StrictHostKeyChecking=accept-new",
    "-o",
    "ConnectTimeout=5",
  ];

  if (serverPort) {
    args.push("-p", serverPort);
  }

  return args;
}

function buildScpArgs(serverPort) {
  const args = [
    "-o",
    "StrictHostKeyChecking=accept-new",
    "-o",
    "ConnectTimeout=5",
  ];

  if (serverPort) {
    args.push("-P", serverPort);
  }

  return args;
}

function runCommand(command, args, description, options = {}) {
  log.step(description);

  try {
    execFileSync(command, args, {
      cwd: projectRoot,
      stdio: "inherit",
      ...options,
    });
    log.success(`${description}完成`);
  } catch (error) {
    throw new Error(`${description}失败${formatExecError(error)}`);
  }
}

function checkSshConnection(config) {
  const target = `${config.serverUser}@${config.serverIP}`;
  log.info(`检查 SSH 连接：${target}`);

  try {
    execFileSync(
      "ssh",
      [...buildSshArgs(config.serverPort), target, "printf ok"],
      {
        cwd: projectRoot,
        stdio: "inherit",
      }
    );
    log.success("SSH 连接正常");
  } catch (error) {
    throw new Error(`SSH 连接检查失败${formatExecError(error)}`);
  }
}

function buildRemoteDeployScript(config) {
  const timestamp = Date.now();
  const releaseDir = `.deploy-release-${timestamp}`;
  const backupDir = `.deploy-backup-${timestamp}`;
  const remoteArchiveName = path.posix.basename(
    config.archiveName.replace(/\\/g, "/")
  );
  const remoteTargetPath = validateRelativePath(config.distDir, "distDir");
  const remoteTargetParent = path.posix.dirname(remoteTargetPath);

  return [
    "set -e",
    `cd ${quotePosix(config.serverDir)}`,
    `release_dir=${quotePosix(releaseDir)}`,
    `backup_dir=${quotePosix(backupDir)}`,
    `archive_name=${quotePosix(remoteArchiveName)}`,
    `target_path=${quotePosix(remoteTargetPath)}`,
    `target_parent=${quotePosix(remoteTargetParent)}`,
    "cleanup() {",
    '  rm -rf "$release_dir" "$backup_dir"',
    '  rm -f "$archive_name"',
    "}",
    "rollback() {",
    "  status=$?",
    '  if [ "$status" -ne 0 ] && [ -e "$backup_dir" ] && [ ! -e "$target_path" ]; then',
    '    if [ "$target_parent" != "." ]; then',
    '      mkdir -p "$target_parent"',
    "    fi",
    '    mv "$backup_dir" "$target_path"',
    "  fi",
    "  cleanup",
    '  exit "$status"',
    "}",
    "trap rollback EXIT",
    'rm -rf "$release_dir" "$backup_dir"',
    'mkdir -p "$release_dir"',
    'tar -zxf "$archive_name" -C "$release_dir"',
    'if [ ! -e "$release_dir/$target_path" ]; then',
    '  echo "未找到解压后的目标目录：$release_dir/$target_path" >&2',
    "  exit 1",
    "fi",
    'if [ "$target_parent" != "." ]; then',
    '  mkdir -p "$target_parent"',
    "fi",
    'if [ -e "$target_path" ]; then',
    '  mv "$target_path" "$backup_dir"',
    "fi",
    'mv "$release_dir/$target_path" "$target_path"',
    'rm -rf "$backup_dir"',
    'rm -rf "$release_dir"',
    'rm -f "$archive_name"',
    "trap - EXIT",
  ].join("\n");
}

function deploy() {
  const config = readConfig();
  const distDir = validateRelativePath(config.distDir, "distDir");
  const archiveName = validateRelativePath(config.archiveName, "archiveName");
  const archivePath = path.resolve(projectRoot, archiveName);
  const localArchiveName = path.relative(projectRoot, archivePath);
  const target = `${config.serverUser}@${config.serverIP}`;
  const remoteArchiveName = path.posix.basename(
    archiveName.replace(/\\/g, "/")
  );
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
    throw new Error(`准备本地压缩包路径失败：${error.message}`);
  }

  try {
    runCommand("tar", ["-zcf", localArchiveName, distDir], `🗜️  压缩 ${distDir}`);
    runCommand(
      "scp",
      [...buildScpArgs(config.serverPort), "-C", archivePath, `${target}:${remoteArchivePath}`],
      `📤 上传 ${remoteArchiveName} 到 ${target}`
    );
    runCommand(
      "ssh",
      [...buildSshArgs(config.serverPort), target, buildRemoteDeployScript(config)],
      `🖥️  在远程服务器部署 ${remoteArchiveName}`
    );
    fs.rmSync(path.resolve(projectRoot, distDir), { recursive: true, force: true });
    log.success("🎉 部署完成");
  } finally {
    try {
      fs.rmSync(archivePath, { force: true });
      log.info(`🧹 已删除本地压缩包：${path.basename(archivePath)}`);
    } catch (error) {
      log.info(
        `📁 跳过本地压缩包清理：${path.basename(archivePath)}（${error.message}）`
      );
    }
  }
}

try {
  deploy();
} catch (error) {
  log.error(error.message);
  process.exit(1);
}
