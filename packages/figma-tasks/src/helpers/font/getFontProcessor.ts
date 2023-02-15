import path from 'node:path';

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
    let { lastUnicode } = manifest.metadata;

    if (item) {
      let unicodeCodePoint = item.metadata?.unicode;

      if (unicodeCodePoint === undefined) {
        lastUnicode += 1;
        unicodeCodePoint = lastUnicode;
        item.setMetadata({ unicode: unicodeCodePoint });
        manifest.setMetadata({ lastUnicode });
      }

      if (unicodeCodePoint) {
        return callbackFn(null, {
          file,
          name: path.parse(file).name,
          unicode: [String.fromCodePoint(unicodeCodePoint)],
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
