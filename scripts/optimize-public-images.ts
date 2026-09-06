#!/usr/bin/env node

import { existsSync } from "node:fs";
import { readdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, "..");
const imageDir = path.join(projectRoot, "source", "public", "img");
const replaceSource = process.argv.includes("--replace-source");
const supportedExtensions = new Set([".png", ".jpg", ".jpeg"]);

function runCwebp(source: string, target: string) {
  const result = spawnSync("cwebp", ["-quiet", "-q", "82", "-m", "6", "-metadata", "none", source, "-o", target], {
    stdio: "inherit",
  });

  if (result.error) throw new Error(`无法执行 cwebp：${result.error.message}`);
  if (result.status !== 0) throw new Error(`cwebp 转换失败：${source}`);
}

async function updateImageReferences(conversions: Map<string, string>) {
  if (!conversions.size) return 0;

  const sourceRoot = path.join(projectRoot, "source");
  const result = spawnSync("rg", ["--files", sourceRoot, "-g", "*.md", "-g", "*.ts", "-g", "*.vue"], {
    encoding: "utf8",
  });

  if (result.error || result.status !== 0) throw new Error("无法扫描图片引用文件");

  let changed = 0;
  const pattern = /\/img\/([^/\s"')]+?)\.(?:png|jpe?g)(?=[\s"')?])/g;

  for (const file of result.stdout.split("\n").filter(Boolean)) {
    const raw = await readFile(file, "utf8");
    const next = raw.replace(pattern, (full, basename: string) => conversions.get(full) || `/img/${basename}.webp`);

    if (next === raw) continue;
    await writeFile(file, next);
    changed++;
  }

  return changed;
}

async function optimizeImages() {
  if (!existsSync(imageDir)) throw new Error(`图片目录不存在：${imageDir}`);

  const files = await readdir(imageDir, { withFileTypes: true });
  let converted = 0;
  let skipped = 0;
  let savedBytes = 0;
  const conversions = new Map<string, string>();

  for (const file of files) {
    if (!file.isFile()) continue;

    const extension = path.extname(file.name).toLowerCase();
    if (!supportedExtensions.has(extension)) continue;

    const source = path.join(imageDir, file.name);
    const target = path.join(imageDir, `${path.basename(file.name, extension)}.webp`);
    const sourceStat = await stat(source);

    if (existsSync(target) && (await stat(target)).mtimeMs >= sourceStat.mtimeMs) {
      skipped++;
      conversions.set(`/img/${file.name}`, `/img/${path.basename(file.name, extension)}.webp`);
      continue;
    }

    runCwebp(source, target);
    const targetStat = await stat(target);
    savedBytes += sourceStat.size - targetStat.size;
    converted++;
    conversions.set(`/img/${file.name}`, `/img/${path.basename(file.name, extension)}.webp`);
  }

  const referencesUpdated = replaceSource ? await updateImageReferences(conversions) : 0;

  if (replaceSource) {
    for (const [sourceUrl] of conversions) {
      await rm(path.join(imageDir, path.basename(sourceUrl)));
    }
  }

  console.log(
    `图片优化完成：转换 ${converted} 个，跳过 ${skipped} 个，预计减少 ${(savedBytes / 1024 / 1024).toFixed(2)} MiB${
      replaceSource ? `，已更新 ${referencesUpdated} 个引用文件并移除原始 PNG/JPEG` : ""
    }`
  );
}

optimizeImages().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
