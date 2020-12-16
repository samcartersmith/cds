import { writePrettyFile } from '@tools/writePrettyFile';
import * as fs from 'fs';
import { camelize } from 'humps';
import IconFontBuildr from 'icon-font-buildr';
import * as path from 'path';

const SRC_DIR = path.join(__dirname, '../src');
const SVGS_DIR = path.join(__dirname, '../svg');
const FONTS_DIR = path.join(__dirname, '../fonts');

const prettierConfig = path.resolve('../../../../.prettierrc');

/**
 * Node script for generating icon fonts
 *
 * Icons are grouped by size: xlarge (32px), large (24px), medium (16px), small (12px), xsmall (8px)
 *
 * This script will grab those SVGs + generate corresponding font file for each size.
 * It will also generate a glyphMap file which will map an SVG's file name to its font unicode character.
 *
 * To add a new icon, drag the svg(s) to corresponding size folder and run `gen_icon_font`.
 */

async function generateIconFont() {
  const icons = await fs
    .readdirSync(SVGS_DIR)
    .filter(item => item.includes('.svg'))
    .map(item => path.basename(item, '.svg'));

  const builder = new IconFontBuildr({
    sources: [path.join(SVGS_DIR, '[icon].svg')],
    icons,
    output: {
      codepoints: true,
      fonts: FONTS_DIR,
      fontName: 'CoinbaseIcons',
      formats: ['ttf'],
    },
  });

  await builder.build();

  const namesSet = new Set<string>();
  const sizeMap: Record<string, Record<string, string>> = {
    8: {},
    12: {},
    16: {},
    24: {},
    32: {},
  };

  Object.entries(builder.getIconsCodepoints()).forEach(([codepointKey, codepointValue]) => {
    const [, name, size, style] = codepointKey.split('-');
    const key = camelize(`${name} ${style}`);

    namesSet.add(key);
    sizeMap[size][key] = codepointValue[0];
  });

  // Check for any missing sizes. If any name is missing for a given size,
  // than reference the glyph of the closest size, start with the largest
  // sibling and cycling upwards
  const sizes = Object.keys(sizeMap);

  sizes.forEach((size, sizeIndex) => {
    namesSet.forEach(name => {
      if (sizeMap[size][name]) {
        return;
      }

      let nextIndex = sizeIndex + 1;
      let nextSize = sizes[nextIndex];

      while (!nextSize || !sizeMap[nextSize] || !sizeMap[nextSize][name]) {
        nextIndex += 1;

        if (nextIndex >= sizes.length) {
          nextIndex = 0;
        }

        nextSize = sizes[nextIndex];
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

  // Glyphs
  await writePrettyFile({
    prettierConfig,
    contents: `export const glyphMap = ${JSON.stringify(sizeMap)}`,
    outFile: path.join(SRC_DIR, `native/glyphs.ts`),
  });

  // Common types
  const kindsSet = new Set(Array.from(namesSet).map(name => name.replace(/(Light|Heavy)$/g, '')));

  await writePrettyFile({
    prettierConfig,
    contents: `/**
 * DO NOT MODIFY
 * Generated automatically
 */

      export type IconSize = 'xs' | 's' | 'm' | 'l';

      export type IconPixels = 8 | 12 | 16 | 24 | 32;

      export type IconKind = ${formatSetToUnion(kindsSet).join(' | ')}

      export type IconName = ${formatSetToUnion(namesSet).join(' | ')}`,
    outFile: path.join(SRC_DIR, `types.ts`),
  });
}

function formatSetToUnion(set: Set<string>): string[] {
  return Array.from(set).map(name => `'${name}'`);
}

generateIconFont();
