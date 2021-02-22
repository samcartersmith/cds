import { arrayToObject } from '@cbhq/cds-utils';

import { iconPixelSizes } from '../configs/iconConfig';
import { manifest } from './manifest';

type UnicodeMap = Record<string, Record<number, number | string>>;
export const createUnicodeMap = (nameSet: Set<string>) => {
  const unicodeMap: UnicodeMap = manifest.unicodeMap;
  let lastUnicodeCopy = manifest.lastUnicode;

  nameSet.forEach(name => {
    if (!unicodeMap[name]) {
      unicodeMap[name] = arrayToObject(iconPixelSizes);
      for (const size of iconPixelSizes) {
        const unicode = String.fromCodePoint(lastUnicodeCopy++)
          .codePointAt(0)
          ?.toString(16)
          ?.toUpperCase();
        unicodeMap[name][size] = `u${unicode}`;
      }
    }
  });
  return {
    unicodeMap,
    lastUnicode: lastUnicodeCopy,
  };
};
