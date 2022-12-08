import { Manifest } from '../../tools/Manifest';
import { GeneratedSvgs } from '../svgsGenerator';

import { convertCodepoint } from './convertCodepoint';
import { oldManifest } from './oldManifest';
import { FontManifestShape, FontProcessorCallbackFunction } from './types';

type FontProcessorParams<ManifestType extends FontManifestShape> = {
  manifest: Manifest<ManifestType>;
  svgs: GeneratedSvgs;
};

export function getFontProcessor<ManifestType extends FontManifestShape>({
  manifest,
  svgs,
}: FontProcessorParams<ManifestType>) {
  return function fontProcessor(filePath: string, callbackFn: FontProcessorCallbackFunction) {
    // TODO: remove `?? oldManifest.lastUnicode` once migration complete since this will be set in manifest.json after inital run
    const lastUnicode = manifest.metadata?.lastUnicode ?? oldManifest.lastUnicode;

    manifest.setMetadata({ lastUnicode });

    const svgMatch = svgs.get(filePath);
    if (svgMatch) {
      const svgName = svgMatch.item.name;

      // TODO: remove once migration complete
      let unicodeCodePoint =
        (svgMatch.item.metadata?.unicode as string | undefined) ??
        oldManifest.unicodeMap[svgName as keyof typeof oldManifest.unicodeMap];

      if (!unicodeCodePoint) {
        // TODO: remove once migration complete
        manifest.updates.add(
          svgMatch.item.nodeType === 'componentSet' ? svgMatch.item : svgMatch.item?.componentSet,
        );

        /** Decimal representation of a unicode code point */
        const decimalValue = manifest.metadata.lastUnicode + 1;
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
        const hexadecimal = convertCodepoint.decimalToHexadecimal(decimalValue);
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
        manifest.setMetadata({ lastUnicode: decimalValue });
      }

      if (unicodeCodePoint) {
        svgMatch.item.setMetadata({ unicode: unicodeCodePoint });

        return callbackFn(null, {
          file: svgMatch.filePath,
          name: svgName,
          unicode: [unicodeCodePoint],
          renamed: false,
        });
      }
    }

    return callbackFn(new Error(`Unable to find matching ${filePath} in svgs.`));
  };
}
