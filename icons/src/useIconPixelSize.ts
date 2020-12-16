/* eslint-disable id-length */

import { useScale, Scale } from '@cb/design-system-web/primitives';

import type { IconSize, IconPixels } from './types';

type IconScaleMap = Record<IconSize, IconPixels>;

const scaleMap1: IconScaleMap = { l: 24, m: 16, s: 12, xs: 8 };
const scaleMap2: IconScaleMap = { l: 32, m: 24, s: 16, xs: 12 };

const mapping: Record<Scale, IconScaleMap> = {
  xSmall: scaleMap1,
  small: scaleMap1,
  medium: scaleMap1,
  large: scaleMap1,
  xLarge: scaleMap2,
  xxLarge: scaleMap2,
  xxxLarge: scaleMap2,
};

export const useIconPixelSize = (size: IconSize) => {
  const scale = useScale();
  return mapping[scale][size];
};
