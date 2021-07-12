import glob from 'fast-glob';
import fs from 'fs';
import path from 'path';
import { argv } from 'yargs';

// bazel-out/darwin-fastbuild/bin/eng/shared/design-system/web/cds.css
const outputDir = path.normalize(argv.outputDir as string);

// bazel-out/darwin-fastbuild/bin/eng/shared/design-system/web/package_merged
const packageJsonPath = path.normalize(argv.packageJsonPath as string);

// bazel-out/darwin-fastbuild/bin/eng/shared/design-system/fonts/package_copy
const fontsOutputDir = path.normalize(argv.fontsOutputDir as string);

// bazel-out/darwin-fastbuild/bin/eng/shared/design-system/web/package_merged
const webOutputDir = path.normalize(argv.webOutputDir as string);

async function readCss(files: string[]): Promise<string> {
  const css = await Promise.all(files.map(file => fs.promises.readFile(file, 'utf8')));

  return css.reduce((out, code) => out + code, '');
}

function mapCssPaths(files: string[], cssFiles: Set<string>) {
  return files.map(fileName => {
    let newPath = '';

    cssFiles.forEach(cssFile => {
      if (cssFile.endsWith(fileName)) {
        cssFiles.delete(cssFile);
        newPath = cssFile;
      }
    });

    return newPath || fileName;
  });
}

async function copyFontsToOut(dir: string) {
  const fontFiles = new Set(
    await glob(`${dir}/**/*.woff2`, {
      absolute: true,
      onlyFiles: true,
    })
  );

  await Promise.all(
    Array.from(fontFiles).map(async fontFile => {
      await fs.promises.writeFile(
        path.join(outputDir, path.basename(fontFile)),
        await fs.promises.readFile(fontFile)
      );
    })
  );
}

async function writeCssToOut(css: string, cssNoFonts: string) {
  const packageVersion = JSON.parse(await fs.promises.readFile(packageJsonPath, 'utf8')).version;

  await Promise.all([
    fs.promises.writeFile(
      path.join(outputDir, `version-${packageVersion}.css`),
      css.replace(/\n/g, ''),
      'utf8'
    ),
    fs.promises.writeFile(
      path.join(outputDir, `version-${packageVersion}-no-fonts.css`),
      cssNoFonts.replace(/\n/g, ''),
      'utf8'
    ),
  ]);
}

async function combine() {
  // Extract CSS from web package first
  const cssFiles = new Set(
    await glob(`${webOutputDir}/**/*.css`, {
      absolute: true,
      onlyFiles: true,
    })
  );

  // Extract critical CSS that *must* be at the top of the file
  const criticalCss = await readCss(
    mapCssPaths(['global.css', 'resetStyles.css', 'scale.css', 'spectrum.css'], cssFiles)
  );

  // Extract icon font CSS
  let fontsCss = await readCss(mapCssPaths(['iconFont.css'], cssFiles));

  // Update font file path to be relative to this combined file
  fontsCss = fontsCss.replace('../icons/font/', './');

  // Include font families
  fontsCss += await readCss([path.join(fontsOutputDir, 'fonts.css')]);

  // Extract remaining CSS Files
  const otherCss = await readCss(Array.from(cssFiles));

  // Write css and fonts to bazel out
  await Promise.all([
    writeCssToOut(criticalCss + fontsCss + otherCss, criticalCss + otherCss),
    copyFontsToOut(fontsOutputDir),
    copyFontsToOut(webOutputDir),
  ]);
}

combine();
