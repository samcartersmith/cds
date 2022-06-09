import glob from 'fast-glob';
import fs from 'fs';
import path from 'path';
import postcss, { AcceptedPlugin } from 'postcss';
import postcssPresetEnv from 'postcss-preset-env';
import prettier from 'prettier';

const writeConfig = { encoding: 'utf8', flag: 'w' } as const;

void (async function buildCss() {
  const prettierOptions = await prettier.resolveConfig('@cbhq/eslint-plugin/prettierConfig.json');
  const srcDir = path.resolve(__dirname, '../src');
  const destDir = path.resolve(__dirname, '../lib');

  const cssFiles = await glob(['**/*.css.ts', '**/*.css'], {
    cwd: srcDir,
    absolute: true,
  });

  const combinedCss = await Promise.all(
    cssFiles.map(async (file) => import(file).then((item) => item.default as string)),
  );

  const prettifiedCss = prettier.format(combinedCss.join('\n'), {
    ...prettierOptions,
    parser: 'css',
  });

  const presetEnv = postcssPresetEnv({
    stage: 3,
    features: {
      'nesting-rules': true,
    },
  }) as unknown as AcceptedPlugin;

  await postcss([presetEnv])
    .process(prettifiedCss, { from: undefined })
    .then(async (result) => {
      const dest = path.join(destDir, 'css/styles.css');
      await fs.promises.writeFile(dest, result.css, writeConfig);
    });
})();
