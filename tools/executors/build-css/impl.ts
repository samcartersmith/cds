import { ExecutorContext } from '@nrwl/devkit';
import glob from 'fast-glob';
import path from 'path';
import fs from 'fs';
import { createDir, deleteDir, getProjectPath } from '../utils';

type BuildCssOptions = {
  fontsOutputDir: string;
  webOutputDir: string;
  outputDir: string;
};

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
  const fontFiles = new Set(
    await glob(`${dir}/**/*.woff2`, {
      absolute: true,
      onlyFiles: true,
    }),
  );

  await Promise.all(
    Array.from(fontFiles).map(async (fontFile) => {
      await fs.promises.writeFile(
        path.join(outputDir, path.basename(fontFile)),
        await fs.promises.readFile(fontFile),
      );
    }),
  );
}

async function writeCssToOut(
  css: string,
  cssNoFonts: string,
  outputDir: string,
  context: ExecutorContext,
) {
  const packageVersion = (
    JSON.parse(
      await fs.promises.readFile(
        path.join(context.root, getProjectPath(context), 'package.json'),
        'utf8',
      ),
    ) as { version: string }
  ).version;

  await Promise.all([
    fs.promises.writeFile(
      path.join(outputDir, `version-${packageVersion}.css`),
      css.replace(/\n/g, ''),
      'utf8',
    ),
    fs.promises.writeFile(
      path.join(outputDir, `version-${packageVersion}-no-fonts.css`),
      cssNoFonts.replace(/\n/g, ''),
      'utf8',
    ),
  ]);
}

export default async function buildCss(options: BuildCssOptions, context: ExecutorContext) {
  const { fontsOutputDir, webOutputDir, outputDir } = options;

  let success = true;

  // Extract CSS from web package first
  const cssFiles = new Set(
    await glob(`${webOutputDir}/**/*.css`, {
      absolute: true,
      onlyFiles: true,
    }),
  );

  // Extract critical CSS that *must* be at the top of the file
  const criticalCss = await readCss(
    mapCssPaths(['global.css', 'scale.css', 'spectrum.css'], cssFiles),
  );

  // Extract icon font CSS
  let fontsCss = await readCss(mapCssPaths(['icon-font.css'], cssFiles));

  // Update font file path to be relative to this combined file
  fontsCss = fontsCss.replace('../icons/font/', './');

  // Include font families
  fontsCss += await readCss([path.join(fontsOutputDir, 'fonts.css')]);

  // Extract remaining CSS Files
  const otherCss = await readCss(Array.from(cssFiles));

  await deleteDir(outputDir);

  await createDir(outputDir);

  // Write css and fonts to bazel out
  try {
    await Promise.all([
      writeCssToOut(criticalCss + fontsCss + otherCss, criticalCss + otherCss, outputDir, context),
      copyFontsToOut(fontsOutputDir, outputDir),
      copyFontsToOut(webOutputDir, outputDir),
    ]);
  } catch (e) {
    console.log(`error: ${e}`);
    success = false;
  }

  return { success };
}
