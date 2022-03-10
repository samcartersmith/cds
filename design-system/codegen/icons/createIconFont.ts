import { arrayToObject } from '@cbhq/cds-utils';
import * as fs from 'fs';
import * as path from 'path';
// @ts-expect-error No types for this package
import webfont from 'webfont';

import { iconPixelSizes, iconSizes } from '../configs/iconConfig';
import { buildTemplates } from '../utils/buildTemplates';
import { getSourcePath } from '../utils/getSourcePath';
import { createIconSet } from './createIconSet';
import { manifest } from './manifest';

type GlyphData = {
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
};

/**
 * Remove svgs after IconFonts are created
 */
export const removeSVGs = async () => {
  const SVGS_DIR = await getSourcePath('codegen/icons/svg');
  fs.rmdirSync(SVGS_DIR, { recursive: true });
};

export const createIconFont = async () => {
  const SVGS_DIR = await getSourcePath('codegen/icons/svg');
  const MOBILE_FONTS_DIR = await getSourcePath('mobile/icons/font');
  const WEB_FONTS_DIR = await getSourcePath('web/icons/font');

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const font = (await webfont({
    centerHorizontally: true,
    files: path.join(SVGS_DIR, '*.svg'),
    fontHeight: 4096,
    fontName: 'CoinbaseIcons',
    formats: ['ttf', 'woff2'],
    normalize: true,
    /**
     * Make sure generated unicode is inside PUA to avoid fallback emojis on iOS
     * https://www.filamentgroup.com/lab/bulletproof_icon_fonts.html
     * https://github.com/nfroidure/svgicons2svgfont/blob/master/src/metadata.js#L10-L15
     */
    startUnicode: 0xf000, // U+F000
    prependUnicode: true,
  })) as {
    ttf: string;
    woff2: string;
    glyphsData: GlyphData[];
  };

  const hash = Date.now();
  const webFontName = `CoinbaseIcons-${hash}.woff2`;

  await buildTemplates({
    'iconFontFace.ejs': [
      {
        data: { fileName: webFontName },
        dest: 'web/styles/icon-font.css',
      },
    ],
  });
  // Delete old web icon font
  fs.rmdirSync(WEB_FONTS_DIR, { recursive: true });
  // Create web font directory so writeFile doesn't fail
  fs.mkdirSync(WEB_FONTS_DIR, { recursive: true });
  await fs.promises.writeFile(path.join(MOBILE_FONTS_DIR, 'CoinbaseIcons.ttf'), font.ttf);
  await fs.promises.writeFile(path.join(WEB_FONTS_DIR, webFontName), font.woff2);

  const { nameSet, sizeMap } = createIconSet();

  font.glyphsData.forEach(({ metadata }) => {
    const [name, size] = metadata.name.split('-') as [
      keyof typeof manifest.unicodeMap,
      keyof typeof manifest.unicodeMap[keyof typeof manifest.unicodeMap],
    ];
    nameSet.add(name);
    sizeMap[size][name] = metadata.unicode.join('');
    if (name in manifest.unicodeMap && size in manifest.unicodeMap[name]) {
      const unicodeMap = manifest.unicodeMap as unknown as Record<
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

  const glyphMap: Record<string, Record<string, string>> = {};
  nameSet.forEach((name) => {
    glyphMap[name] = arrayToObject(Object.keys(sizeMap));
    for (const size of iconPixelSizes) {
      glyphMap[name][size] = sizeMap[size][name] as string;
    }
  });

  return {
    glyphMap,
    names: Array.from(nameSet.values()).sort((prev, next) => prev.localeCompare(next)),
    pixels: iconPixelSizes,
    sizes: iconSizes,
  };
};
