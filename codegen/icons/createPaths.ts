import { mapValues, mapKeys } from '@cbhq/cds-utils';
// @ts-expect-error No types for this package
import toPath from 'element-to-path';
// eslint-disable-next-line import/no-extraneous-dependencies
import glob from 'fast-glob';
import fs from 'fs';
import path from 'path';
import { parse } from 'svgson';

import { iconSizes } from '../configs/iconConfig';
import { getSourcePath } from '../utils/getSourcePath';
import { createIconSet, SvgData } from './createIconSet';

export const createPaths = async () => {
  const { nameSet, sizeMap } = createIconSet();
  const SVGS_DIR = await getSourcePath('codegen/icons/svg');
  const files = await glob('*.svg', { absolute: true, cwd: SVGS_DIR });

  await Promise.all(
    files.map(async file => {
      const [_unicode, name, size] = path.basename(file, '.svg').split('-');
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

  return {
    svgPaths: Object.values(
      mapValues(
        mapKeys(sizeMap, (_, key) => `size-${key}`),
        (val, key) => ({
          dest: `web/icons/paths/${key}.ts`,
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
};
