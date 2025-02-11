import { globSync } from 'glob';
import fs from 'node:fs';
import path from 'node:path';
import { $ } from 'zx';

import pkg from './package.json';

$.verbose = true;

const MONOREPO_ROOT = process.env.PROJECT_CWD ?? process.env.NX_MONOREPO_ROOT;

if (!MONOREPO_ROOT) throw Error('MONOREPO_ROOT is undefined');

async function readCss(files: string[]): Promise<string> {
  const css = await Promise.all(files.map(async (file) => fs.promises.readFile(file, 'utf8')));
  return css.reduce((out, code) => out + code, '');
}

function mapCssPaths(files: string[], cssFiles: Set<string>) {
  return files.map((fileName) => {
    let newPath = '';
    cssFiles.forEach((cssFile) => {
      if (cssFile.endsWith(fileName)) {
        cssFiles.delete(cssFile);
        newPath = cssFile;
      }
    });
    return newPath || fileName;
  });
}

async function copyFontsToOut(dir: string, outputDir: string) {
  const fontFiles = new Set(globSync(`${dir}/**/*.woff2`, { absolute: true }));
  await Promise.all(
    Array.from(fontFiles).map(async (fontFile) => {
      await fs.promises.writeFile(
        path.join(outputDir, path.basename(fontFile)),
        (await fs.promises.readFile(fontFile)) as any,
      );
    }),
  );
}

async function writeCssToOut(css: string, cssNoFonts: string, outputDir: string) {
  const packageVersion = pkg.version;
  const filename = `version-${packageVersion}`;
  const cssPath = path.join(outputDir, `${filename}.css`);
  const cssPathNoFonts = path.join(outputDir, `${filename}-no-fonts.css`);

  await Promise.all([
    fs.promises.writeFile(cssPath, css.replace(/\n/g, ''), 'utf8'),
    fs.promises.writeFile(cssPathNoFonts, cssNoFonts.replace(/\n/g, ''), 'utf8'),
  ]);

  // Compress
  await Promise.all([
    $`parcel-css --minify ${cssPath} -o ${cssPath}`,
    $`parcel-css --minify ${cssPathNoFonts} -o ${cssPathNoFonts}`,
  ]);
  await Promise.all([
    $`postcss ${cssPath} --output ${cssPath} --env production`,
    $`postcss ${cssPathNoFonts} --output ${cssPathNoFonts} --env production`,
  ]);
}

export default async function buildCss() {
  const repoRoot = MONOREPO_ROOT as string;
  const fontsOutputDir = path.join(repoRoot, 'packages/fonts/esm');
  const iconsOutputDir = path.join(repoRoot, 'packages/icons/esm/fonts/web');
  const webOutputDir = path.join(repoRoot, 'packages/web/esm');
  const outputDir = path.join(repoRoot, 'packages/web/dist');

  // Extract CSS from web package first
  const cssFiles = new Set(globSync(`${webOutputDir}/**/*.css`, { absolute: true }));

  // Extract critical CSS that *must* be at the top of the file
  const criticalCss = await readCss(
    mapCssPaths(['global.css', 'scale.css', 'spectrum.css'], cssFiles),
  );

  // Include font families
  let fontsCss = await readCss([path.join(fontsOutputDir, 'fonts.css')]);

  // Extract icon font CSS
  fontsCss += await readCss([path.join(iconsOutputDir, 'icon-font.css')]);

  // Extract remaining CSS Files
  const otherCss = await readCss(Array.from(cssFiles));

  // Clean output directory
  if (fs.existsSync(outputDir)) fs.rmSync(outputDir, { recursive: true });
  fs.mkdirSync(outputDir, { recursive: true });

  // Write css and fonts to bazel out
  try {
    await Promise.all([
      writeCssToOut(criticalCss + fontsCss + otherCss, criticalCss + otherCss, outputDir),
      copyFontsToOut(iconsOutputDir, outputDir),
      copyFontsToOut(fontsOutputDir, outputDir),
      copyFontsToOut(webOutputDir, outputDir),
    ]);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(`Error with packages/web build-css.ts script: ${e}`);
  }
}

void buildCss();
