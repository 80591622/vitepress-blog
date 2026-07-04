import { existsSync } from "node:fs";
import { cp, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { compile } from "sass";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, "..");
const themeChalkRoot = path.join(projectRoot, "packages", "theme-chalk");
const themeChalkSrc = path.join(themeChalkRoot, "src");
const teekRoot = path.join(projectRoot, "packages", "teek");
const teekThemeChalkRoot = path.join(teekRoot, "theme-chalk");

const IGNORE_TOP_LEVEL_DIRS = new Set(["common", "mixins", "module", "var"]);

const collectScssFiles = async (absDir: string, relDir = "", out: string[] = []): Promise<string[]> => {
  const entries = await readdir(absDir, { withFileTypes: true });

  for (const entry of entries) {
    const entryRel = relDir ? path.join(relDir, entry.name) : entry.name;
    const entryAbs = path.join(absDir, entry.name);

    if (entry.isDirectory()) {
      if (!relDir && IGNORE_TOP_LEVEL_DIRS.has(entry.name)) continue;
      await collectScssFiles(entryAbs, entryRel, out);
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(".scss")) out.push(entryAbs);
  }

  return out;
};

const pickPreferredStemFile = (files: string[]) => {
  const stemToFile = new Map<string, string>();

  for (const file of files) {
    const stem = path.basename(file, ".scss");
    const prev = stemToFile.get(stem);

    if (!prev) {
      stemToFile.set(stem, file);
      continue;
    }

    const prevDepth = prev.split(path.sep).length;
    const nextDepth = file.split(path.sep).length;

    if (nextDepth < prevDepth || (nextDepth === prevDepth && file.length < prev.length)) {
      stemToFile.set(stem, file);
    }
  }

  return stemToFile;
};

const cleanGeneratedCss = async (dir: string) => {
  if (!existsSync(dir)) return;

  const entries = await readdir(dir, { withFileTypes: true });
  await Promise.all(
    entries
      .filter(entry => entry.isFile() && entry.name.endsWith(".css"))
      .map(entry => rm(path.join(dir, entry.name), { force: true }))
  );
};

const ensureDir = async (dir: string) => {
  await mkdir(dir, { recursive: true });
};

const buildThemeChalk = async () => {
  await cleanGeneratedCss(themeChalkRoot);
  await rm(path.join(teekRoot, "index.css"), { force: true });
  await rm(teekThemeChalkRoot, { recursive: true, force: true });

  const scssFiles = await collectScssFiles(themeChalkSrc);
  const stemToFile = pickPreferredStemFile(scssFiles);
  const generatedFiles: string[] = [];

  for (const [stem, file] of stemToFile) {
    const css = compile(file, { style: "expanded" }).css;

    if (stem === "index") {
      const indexCss = path.join(themeChalkRoot, "index.css");
      await writeFile(indexCss, css);
      generatedFiles.push(indexCss);
      continue;
    }

    const bareCss = path.join(themeChalkRoot, `${stem}.css`);
    const prefixedCss = path.join(themeChalkRoot, `tk-${stem}.css`);

    await writeFile(bareCss, css);
    await writeFile(prefixedCss, css);
    generatedFiles.push(bareCss, prefixedCss);
  }

  await ensureDir(teekThemeChalkRoot);
  await cp(themeChalkSrc, path.join(teekThemeChalkRoot, "src"), { recursive: true });

  for (const generatedFile of generatedFiles) {
    const filename = path.basename(generatedFile);
    await writeFile(path.join(teekThemeChalkRoot, filename), await readFile(generatedFile, "utf8"));
  }

  await writeFile(path.join(teekRoot, "index.css"), await readFile(path.join(themeChalkRoot, "index.css"), "utf8"));

  console.log(`Built theme-chalk CSS (${generatedFiles.length} files)`);
};

buildThemeChalk().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
