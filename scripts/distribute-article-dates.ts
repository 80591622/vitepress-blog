#!/usr/bin/env node
/**
 * 为发生变更的文章写入实际日期。
 *
 * 由 pre-commit 调用，只处理暂存区中的 Markdown 文件：
 * - 首次处理：补充 date 与 lastUpdated。
 * - 后续处理：保留原 date，只更新 lastUpdated。
 * - 不扫描全站，避免误改历史文章。
 */
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

function formatLocalDate(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

function updateFile(inputPath: string, now: Date): boolean {
  const absolutePath = path.resolve(projectRoot, inputPath);
  if (!absolutePath.startsWith(`${projectRoot}${path.sep}`)) {
    throw new Error(`文件必须位于项目目录内：${inputPath}`);
  }
  if (!absolutePath.endsWith(".md") || !fs.existsSync(absolutePath)) {
    throw new Error(`找不到 Markdown 文件：${inputPath}`);
  }

  const raw = fs.readFileSync(absolutePath, "utf8");
  const parsed = matter(raw);
  const { data: frontmatter, content } = parsed;

  if (frontmatter.layout === "home" || frontmatter.layout === false) return false;

  if (!frontmatter.date) frontmatter.date = formatLocalDate(now);
  frontmatter.lastUpdated = now.toISOString();

  const next = `${matter.stringify(content, frontmatter).replace(/\r\n/g, "\n")}\n`;
  if (next === raw) return false;

  fs.writeFileSync(absolutePath, next, "utf8");
  return true;
}

function getStagedMarkdownFiles(): string[] {
  const output = execFileSync("git", ["diff", "--cached", "--name-only", "--diff-filter=ACMR", "--", "*.md"], {
    cwd: projectRoot,
    encoding: "utf8",
  });
  return output.split("\n").filter(Boolean);
}

function stageFiles(files: string[]): void {
  if (files.length === 0) return;
  execFileSync("git", ["add", "--", ...files], { cwd: projectRoot, stdio: "inherit" });
}

function main(): void {
  const args = process.argv.slice(2);
  const useStagedFiles = args.length === 1 && args[0] === "--staged";
  const files = useStagedFiles ? getStagedMarkdownFiles() : args;

  if (files.length === 0) {
    if (useStagedFiles) {
      console.log("ℹ️ 暂存区没有需要更新日期的 Markdown 文档。");
      return;
    }
    throw new Error("请至少传入一个 Markdown 文件路径，或使用 --staged。");
  }

  const now = new Date();
  let updated = 0;
  for (const file of files) {
    if (updateFile(file, now)) updated++;
  }
  if (useStagedFiles) stageFiles(files);

  console.log(`✅ 已更新 ${updated} 篇文章的日期字段。`);
}

try {
  main();
} catch (error) {
  console.error("❌ 更新失败：", error);
  process.exit(1);
}
