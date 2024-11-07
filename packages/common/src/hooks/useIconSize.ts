import { useMemo } from 'react';

import { useScaleConditional } from '../scale/useScaleConditional';
import type { IconPixelSize, IconSize } from '../types';

type IconScaleMap = Record<IconSize, IconPixelSize>;

const denseScaleMap: IconScaleMap = { l: 24, m: 16, s: 12, xs: 8 };
export const normalScaleMap: IconScaleMap = { l: 32, m: 24, s: 16, xs: 12 };

export const useIconSize = (size: IconSize, bordered?: boolean) => {
  const scaleMap = useScaleConditional({ dense: denseScaleMap, normal: normalScaleMap });
  const wrapperSize = scaleMap[size];

  const iconSize = useMemo(() => {
    if (bordered) {
      switch (size) {
        case 'l':
          return scaleMap.s;
        case 'm':
        default:
          return scaleMap.xs;
      }
    }
    return wrapperSize;
  }, [bordered, size, wrapperSize, scaleMap]);

  /**
   * Design did not create an 8px or 32px size, since it would be same as 12px and 24px version respectively.
   * To account for this we can use the same glyph as 12px but with 8px iconSize or same glyph as 24px but with 32px iconSize.
   * The `sourceSize` value is what will return either 12 | 16 | 24, which will be
   * available in our glyphMap lookup
   */
  const sourceSize = useMemo(() => {
    if (iconSize === 8) {
      return 12;
    }
    if (iconSize === 32) {
      return 24;
    }
    return iconSize;
  }, [iconSize]);

  return useMemo(
    () => ({ wrapperSize, iconSize, sourceSize }),
    [iconSize, wrapperSize, sourceSize],
  );
};
