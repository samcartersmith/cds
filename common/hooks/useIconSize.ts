import { useMemo } from 'react';

import { useScale } from '../scale/useScale';
import type { IconSize, IconPixelSize, Scale } from '../types';

type IconScaleMap = Record<IconSize, IconPixelSize>;

/* eslint-disable id-length */
const scaleMap1: IconScaleMap = { l: 24, m: 16, s: 12, xs: 8 };
const scaleMap2: IconScaleMap = { l: 32, m: 24, s: 16, xs: 12 };
/* eslint-enable id-length */

const mapping: Record<Scale, IconScaleMap> = {
  xSmall: scaleMap1,
  small: scaleMap1,
  medium: scaleMap1,
  large: scaleMap2,
  xLarge: scaleMap2,
  xxLarge: scaleMap2,
  xxxLarge: scaleMap2,
};

export const useIconSize = (size: IconSize, bordered?: boolean) => {
  const scale = useScale();
  const wrapperSize = mapping[scale][size];
  const iconSize = useMemo(() => {
    if (bordered) {
      switch (size) {
        case 'l':
          return mapping[scale].s;
        case 'm':
          return mapping[scale].xs;
      }
    }
    return wrapperSize;
  }, [bordered, size, wrapperSize, scale]);

  return useMemo(() => ({ wrapperSize, iconSize }), [iconSize, wrapperSize]);
};
