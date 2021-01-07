import svgr from '@svgr/core';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as glob from 'fast-glob';
import * as fs from 'fs';
import { camelize, pascalize } from 'humps';
import * as path from 'path';
// @ts-expect-error No types for this package
import webfont from 'webfont';

import { iconPixelSizes, iconSizes } from './configs/iconConfig';
import iconTemplate from './templates/components/Icon';
import { getSourcePath } from './utils/getSourcePath';

interface GlyphData {
  contents: string;
  srcPath: string;
  metadata: {
    path: string;
    name: string;
    unicode: string[];
    renamed: boolean;
    width: number;
    height: number;
    color: string;
  };
}

export const Icon = {
  async data() {
    const SVGS_DIR = await getSourcePath('icons/svg');
    const FONTS_DIR = await getSourcePath('icons/fonts');

    const font = await webfont({
      centerHorizontally: true,
      files: path.join(SVGS_DIR, '*.svg'),
      fontHeight: 4096,
      fontName: 'CoinbaseIcons',
      formats: ['ttf'],
      normalize: true,
      startUnicode: 0xe000, // \uE000
    });

    await fs.promises.writeFile(path.join(FONTS_DIR, 'CoinbaseIcons.ttf'), font.ttf);

    const namesSet = new Set<string>();
    const sizeMap = iconPixelSizes.reduce((obj, size) => {
      obj[size] = {};
      return obj;
    }, {} as Record<string, Record<string, string>>);

    (font.glyphsData as GlyphData[]).forEach(({ metadata }) => {
      const [, key, size, style] = metadata.name.split('-');
      const name = camelize(`${key} ${style}`);

      namesSet.add(name);
      sizeMap[size][name] = metadata.unicode.join('');
    });

    // Check for any missing sizes. If any name is missing for a given size,
    // than reference the glyph of the closest size, start with the largest
    // sibling and cycling upwards
    iconPixelSizes.forEach((size, sizeIndex) => {
      namesSet.forEach(name => {
        if (sizeMap[size][name]) {
          return;
        }

        let nextIndex = sizeIndex + 1;
        let nextSize = iconPixelSizes[nextIndex];

        while (!nextSize || !sizeMap[nextSize] || !sizeMap[nextSize][name]) {
          nextIndex += 1;

          if (nextIndex >= iconPixelSizes.length) {
            nextIndex = 0;
          }

          nextSize = iconPixelSizes[nextIndex];
        }

        sizeMap[size][name] = sizeMap[nextSize][name];
      });

      const mapSize = Object.keys(sizeMap[size]).length;

      if (mapSize !== namesSet.size) {
        console.error(
          `Glyph map "${size}" missing icons. Expected ${namesSet.size}, found ${mapSize}.`
        );
      }
    });

    const kindsSet = new Set(Array.from(namesSet).map(name => name.replace(/(Light|Heavy)$/g, '')));

    return {
      glyphMap: sizeMap,
      kinds: Array.from(kindsSet),
      names: Array.from(namesSet),
      pixels: iconPixelSizes,
      sizes: iconSizes,
    };
  },

  async svgs() {
    const SVGS_DIR = await getSourcePath('icons/svg');
    const COMPONENTS_DIR = await getSourcePath('icons/src/components');

    const svgrConfig = {
      expandProps: 'end',
      memo: true,
      plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx', '@svgr/plugin-prettier'],
      prettier: true,
      replaceAttrValues: {
        '#1652F0': '{fill}',
        '#3453EB': '{fill}',
      },
      svgProps: {
        className: 'cds-icon',
        role: '{role}',
      },
      svgo: true,
      template: iconTemplate,
      titleProp: true,
      typescript: true,
    };

    const files = await glob('*.svg', { absolute: true, cwd: SVGS_DIR });

    await Promise.all(
      files.map(async file => {
        const componentName = pascalize(path.basename(file, '.svg')).replace(
          /(USD|JPY|GBP|EUR)/,
          match => match.charAt(0) + match.slice(1).toLowerCase()
        );

        const content = await svgr(await fs.promises.readFile(file), svgrConfig, {
          componentName: `Svg${componentName}`,
        });

        return fs.promises.writeFile(path.join(COMPONENTS_DIR, `${componentName}.tsx`), content);
      })
    );
  },
};
