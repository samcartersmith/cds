import { mapKeys, mapValues } from '@cds/utils';
// @ts-expect-error No types for this package
import * as toPath from 'element-to-path';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as glob from 'fast-glob';
import * as fs from 'fs';
import { camelize } from 'humps';
import * as path from 'path';
import { parse } from 'svgson';
// @ts-expect-error No types for this package
import webfont from 'webfont';

import { iconPixelSizes, iconSizes } from '../configs/iconConfig';
import { getSourcePath } from '../utils/getSourcePath';

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

type SvgData = { paths: string[]; viewBox: string };
type SvgPathMap = Record<string, SvgData>;
type GlyphMap = Record<string, string>;
type SizeMap = Record<string, SvgPathMap | GlyphMap>;

const createIconSet = () => {
  const nameSet = new Set<string>();
  const sizeMap = iconPixelSizes.reduce((obj, size) => {
    obj[size] = {};
    return obj;
  }, {} as SizeMap);

  return { nameSet, sizeMap };
};

const fillInMissing = (nameSet: Set<string>, sizeMap: SizeMap) => {
  // Check for any missing sizes. If any name is missing for a given size,
  // than reference the glyph of the closest size, start with the largest
  // sibling and cycling upwards
  iconPixelSizes.forEach((size, sizeIndex) => {
    nameSet.forEach(name => {
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

    if (mapSize !== nameSet.size) {
      console.error(
        `Glyph map "${size}" missing icons. Expected ${nameSet.size}, found ${mapSize}.`
      );
    }
  });
};

const normalizeName = (baseFileName: string) => {
  const [key, size, style] = baseFileName.split('-');
  return {
    name: camelize(`${key} ${style}`.replace('Icon', '')),
    size,
  };
};

export const Icon = {
  async data() {
    const SVGS_DIR = await getSourcePath('codegen/icons/svg');
    const FONTS_DIR = await getSourcePath('fonts/native');

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
    const { nameSet, sizeMap } = createIconSet();

    (font.glyphsData as GlyphData[]).forEach(({ metadata }) => {
      const { name, size } = normalizeName(metadata.name);
      nameSet.add(name);
      sizeMap[size][name] = metadata.unicode.join('');
    });

    fillInMissing(nameSet, sizeMap);

    return {
      glyphMap: sizeMap,
      names: Array.from(nameSet),
      pixels: iconPixelSizes,
      sizes: iconSizes,
    };
  },
  async web() {
    const SVGS_DIR = await getSourcePath('codegen/icons/svg');
    const files = await glob('*.svg', { absolute: true, cwd: SVGS_DIR });
    const { nameSet, sizeMap } = createIconSet();

    await Promise.all(
      files.map(async file => {
        const { size, name } = normalizeName(path.basename(file, '.svg'));
        nameSet.add(name);
        const fileContents = await fs.promises.readFile(file, 'utf8');
        // Convert SVG to JSON AST
        // https://github.com/elrumordelaluz/svgson
        const jsonAst = await parse(fileContents);
        const iconData: SvgData = {
          paths: [],
          viewBox: jsonAst.attributes.viewBox,
        };
        jsonAst.children.forEach(child => {
          const pathForChild = toPath(child);
          // eslint-disable-next-line id-length
          iconData.paths.push(pathForChild);
        });
        // Convert JSON AST to svg path attribute
        // https://github.com/elrumordelaluz/element-to-path
        sizeMap[size][name] = iconData;
      })
    );

    fillInMissing(nameSet, sizeMap);

    return {
      svgPaths: Object.values(
        mapValues(
          mapKeys(sizeMap, (_, key) => `size-${key}`),
          (val, key) => ({
            dest: `web/Icon/paths/${key}.ts`,
            data: val,
            config: {
              disableAsConst: true,
              sort: true,
            },
          })
        )
      ),
      names: Array.from(nameSet.values()).sort((prev, next) => prev.localeCompare(next)),
      iconSizes,
    };
  },
};
