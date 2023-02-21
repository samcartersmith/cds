import fs from 'node:fs';
import type { Config } from 'svgo';
import { downloadSvgImage } from '@cbhq/figma-api';
import { writePrettyFile } from '@cbhq/script-utils';

import { ColorStyles } from '../../tools/ColorStyles';

import { optimizeSvg } from './optimizeSvg';
import { writeVersionedFile } from './writeVersionedFile';

type CreateSvgContentParams = {
  figmaUrl: string;
  svgDir: string;
  svgJsDir?: string;
  colorStyles?: ColorStyles;
  imageName: string;
  svgoConfig?: Config;
};

export type SvgContent = {
  light?: string;
  dark?: string;
  themeable?: string;
};

function svgWriter(content: string) {
  return async function writeSvg(filePath: string) {
    await fs.promises.writeFile(filePath, content, 'utf-8');
  };
}

function svgJsWriter(content: string) {
  return async function writeSvg(filePath: string) {
    await writePrettyFile(filePath, content);
  };
}

export async function createSvgContent({
  colorStyles,
  figmaUrl,
  svgDir,
  svgJsDir,
  imageName,
  svgoConfig,
}: CreateSvgContentParams) {
  const svgContent: SvgContent = {
    light: undefined,
    dark: undefined,
    themeable: undefined,
  };

  const sharedParams = {
    directory: svgDir,
    format: 'svg',
    imageName,
  } as const;

  svgContent.light = await downloadSvgImage(figmaUrl);
  svgContent.light = optimizeSvg(svgContent.light, svgoConfig);

  if (colorStyles) {
    svgContent.dark = colorStyles.replaceLightWithDarkFills(svgContent.light);
    svgContent.themeable = colorStyles.replaceWithCssVariables(svgContent.light);

    const [svgLight, svgDark, svgThemed, svgJsLight, svgJsDark] = await Promise.all([
      writeVersionedFile({
        ...sharedParams,
        category: 'light',
        format: 'svg',
        directory: svgDir,
        writeFile: svgWriter(svgContent.light),
      }),
      writeVersionedFile({
        ...sharedParams,
        category: 'dark',
        format: 'svg',
        directory: svgDir,
        writeFile: svgWriter(svgContent.dark),
      }),
      writeVersionedFile({
        ...sharedParams,
        category: 'themeable',
        format: 'svg',
        directory: svgDir,
        writeFile: svgWriter(svgContent.themeable),
      }),
      ...(svgJsDir
        ? [
            writeVersionedFile({
              ...sharedParams,
              category: 'light',
              format: 'js',
              directory: svgJsDir,
              writeFile: svgJsWriter(`module.exports = { content:\`${svgContent.light}\` };`),
            }),
            writeVersionedFile({
              ...sharedParams,
              category: 'dark',
              format: 'js',
              directory: svgJsDir,
              writeFile: svgJsWriter(`module.exports = { content:\`${svgContent.dark}\` };`),
            }),
          ]
        : []),
    ]);
    return {
      outputs: {
        svgLight,
        svgDark,
        ...(svgThemed ? { svgThemed } : {}),
        ...(svgJsLight ? { svgJsLight } : {}),
        ...(svgJsDark ? { svgJsDark } : {}),
      },
      svgContent,
    };
  }
  const svgLight = await writeVersionedFile({
    ...sharedParams,
    writeFile: svgWriter(svgContent.light),
  });

  return { outputs: { svgLight }, svgContent };
}
