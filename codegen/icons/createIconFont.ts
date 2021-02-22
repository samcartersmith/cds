import { arrayToObject } from '@cbhq/cds-utils';
import * as fs from 'fs';
import * as path from 'path';
// @ts-expect-error No types for this package
import webfont from 'webfont';

import { iconPixelSizes, iconSizes } from '../configs/iconConfig';
import { getSourcePath } from '../utils/getSourcePath';
import { createIconSet } from './createIconSet';
import { manifest } from './manifest';

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

export const createIconFont = async () => {
  const SVGS_DIR = await getSourcePath('codegen/icons/svg');
  const FONTS_DIR = await getSourcePath('mobile/icons/font');

  const font = await webfont({
    centerHorizontally: true,
    files: path.join(SVGS_DIR, '*.svg'),
    fontHeight: 4096,
    fontName: 'CoinbaseIcons',
    formats: ['ttf'],
    normalize: true,
    startUnicode: 0xe000, // uE000
    prependUnicode: true,
  });

  await fs.promises.writeFile(path.join(FONTS_DIR, 'CoinbaseIcons.ttf'), font.ttf);
  const { nameSet, sizeMap } = createIconSet();

  (font.glyphsData as GlyphData[]).forEach(({ metadata }) => {
    const [name, size] = metadata.name.split('-') as [
      keyof typeof manifest.unicodeMap,
      keyof typeof manifest.unicodeMap[keyof typeof manifest.unicodeMap]
    ];
    nameSet.add(name);
    sizeMap[size][name] = metadata.unicode.join('');
    if (name in manifest.unicodeMap && size in manifest.unicodeMap[name]) {
      const unicodeMap = (manifest.unicodeMap as unknown) as Record<
        typeof name,
        Record<typeof size, string>
      >;

      const manifestUnicode = unicodeMap[name][size].replace('u', '');
      const fontUnicode = metadata.unicode[0].charCodeAt(0).toString(16).toUpperCase();
      if (manifestUnicode !== fontUnicode) {
        throw new Error(`Font unicode does not match unicode in manifest for ${name}.`);
      }
    }
  });

  const glyphMap: Record<string, { [x: string]: string }> = {};
  nameSet.forEach(name => {
    glyphMap[name] = arrayToObject(Object.keys(sizeMap));
    for (const size of iconPixelSizes) {
      glyphMap[name][size] = sizeMap[size][name] as string;
    }
  });

  return {
    glyphMap,
    names: Array.from(nameSet),
    pixels: iconPixelSizes,
    sizes: iconSizes,
  };
};
