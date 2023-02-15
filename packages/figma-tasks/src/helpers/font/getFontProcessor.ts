import path from 'node:path';

import { convertCodepoint } from './convertCodepoint';
import { oldManifest } from './oldManifest';
import {
  FontProcessorCallbackFunction,
  FontProcessorComponentSetChild,
  FontProcessorManifest,
  FontProcessorParams,
} from './types';

export function getFontProcessor<
  T extends FontProcessorManifest,
  K extends FontProcessorComponentSetChild,
>({ manifest, svgFileMap }: FontProcessorParams<T, K>) {
  return function fontProcessor(file: string, callbackFn: FontProcessorCallbackFunction) {
    const item = svgFileMap.get(file);
    const { name: imageName } = path.parse(file);
    if (item) {
      // TODO: remove oldManifest fallback after we run first sync
      let unicodeCodePoint =
        item.metadata?.unicode ??
        oldManifest.unicodeMap[imageName as keyof typeof oldManifest.unicodeMap];

      let { lastUnicode } = manifest.metadata;

      if (!unicodeCodePoint) {
        /** Decimal representation of a unicode code point */
        lastUnicode += 1;
        manifest.setMetadata({ lastUnicode });
        /**
         * ^^^^^^^ tldr ^^^^^^^
         * We use decimal format in our manifest to ensure we increment upwards within the custom code point range.
         * We also want to maintain backwards compatibility when updating, adding or removing icons.
         * If we didn't save the decimal version and always increment upwards by 1 digit, we could have icons
         * associated to different unicodes in different releases depending on where it fell after alphabetical sorting.
         * On mobile this is important because it's disruptive if engineers need to rebuild the entire mobile app
         * in order to see accurate representation of icons after mobile font change.
         */

        /** Convert the decimal value into a hexadecimal value, which is required in the unicode character encoding system. */
        const hexadecimal = convertCodepoint.decimalToHexadecimal(lastUnicode);
        /**
         * ^^^^^^^ tldr ^^^^^^^
         * hexadecimal is a positional numeral system that represents numbers using a base of 16.
         * In the hexadecimal system, the numbers 0-9 are used to represent the first ten digits,
         * and the letters A-F are used to represent the remaining six digits.
         * This means that each digit in a hexadecimal number can have 16 different values,
         * which makes it a convenient way to represent large numbers in a compact form.
         */

        /** The "u" prefix indicates that the code point is part of the Unicode character set,
         * and the four-digit hexadecimal number is the code point.  */
        unicodeCodePoint = convertCodepoint.hexadecimalToUnicodeHexadecimal(hexadecimal);

        /** Once in hexadecimal format we can safely update our manifest so lastUnicode decimal value
         * can be used/incremented by the next icon
         */
      }

      if (unicodeCodePoint) {
        item.setMetadata({ unicode: unicodeCodePoint });

        return callbackFn(null, {
          file,
          name: path.parse(file).name,
          unicode: [unicodeCodePoint],
          renamed: false,
          /**
           * `createdAt` is custom metadata property we have added onto the default webfont
           * ones so we can sort the generated glyphMap by createdAt when displaying
           * in visreg environments
           */
          createdAt: item.componentSet.createdAt,
        });
      }
    }

    return callbackFn(new Error(`Unable to find matching ${file} in svgs.`));
  };
}
