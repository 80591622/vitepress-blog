#!/usr/bin/env node
/**
 * 将文章 frontmatter 的 date / lastUpdated 按文件路径确定性分散到 2020-01-01 ~ 2026-06-06。
 * 用法：pnpm exec tsx scripts/distribute-article-dates.ts
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const sourceDir = path.join(projectRoot, "source");

const RANGE_START = Date.UTC(2020, 0, 1, 0, 0, 0);
const RANGE_END = Date.UTC(2026, 5, 6, 23, 59, 59);

function hashString(input: string): number {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function mixHash(seed: number, salt: string): number {
  return hashString(`${seed}:${salt}`);
}

function pickTimestamp(relativePath: string, salt: string): number {
  const h1 = hashString(relativePath);
  const h2 = mixHash(h1, salt);
  const span = RANGE_END - RANGE_START;
  const offset = (h1 + h2 * 9973) % (span + 1);
  return RANGE_START + offset;
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

function formatLocalDate(ts: number): string {
  const d = new Date(ts);
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())} ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}`;
}

function formatIsoDate(ts: number): string {
  return new Date(ts).toISOString();
}

function shouldSkip(relativePath: string): boolean {
  const normalized = relativePath.replace(/\\/g, "/");
  if (normalized === "index.md") return true;
  if (normalized.startsWith("routes/")) return true;
  if (normalized.startsWith(".vitepress/")) return true;
  return false;
}

function updateFile(absolutePath: string): boolean {
  const relativePath = path.relative(sourceDir, absolutePath).replace(/\\/g, "/");
  if (shouldSkip(relativePath)) return false;

  const raw = fs.readFileSync(absolutePath, "utf8");
  const parsed = matter(raw);
  const { data: frontmatter, content } = parsed;

  if (frontmatter.layout === "home" || frontmatter.layout === false) return false;

  const publishTs = pickTimestamp(relativePath, "publish");
  const updateOffsetDays = mixHash(publishTs, "update-offset") % 120;
  const updateTs = Math.min(RANGE_END, publishTs + updateOffsetDays * 24 * 60 * 60 * 1000);

  frontmatter.date = formatLocalDate(publishTs);
  frontmatter.lastUpdated = formatIsoDate(updateTs);

  const next = matter.stringify(content, frontmatter).replace(/\r\n/g, "\n");
  const normalized = raw.endsWith("\n") ? `${next}\n` : next;

  if (normalized === raw) return false;
  fs.writeFileSync(absolutePath, normalized, "utf8");
  return true;
}

function collectMarkdownFiles(dir: string, result: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const absolutePath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === ".vitepress" || entry.name === "node_modules") continue;
      collectMarkdownFiles(absolutePath, result);
      continue;
    }
    if (entry.isFile() && entry.name.endsWith(".md")) result.push(absolutePath);
  }
  return result;
}

function main(): void {
  const files = collectMarkdownFiles(sourceDir);
  let updated = 0;
  for (const file of files) {
    if (updateFile(file)) updated++;
  }

  console.log(`✅ 已更新 ${updated} 篇文章的 date / lastUpdated（区间 2020-01-01 ~ 2026-06-06）`);
}

try {
  main();
} catch (error) {
  console.error("❌ 更新失败：", error);
  process.exit(1);
}
