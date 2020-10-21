import { useScale, Scale } from '@cb/design-system-web/primitives';
import { css } from 'linaria';

import type { IconSize, Pixels } from './IconProps';

/* eslint-disable id-length */
const scaleMap1: Record<IconSize, Pixels> = { L: 24, M: 16, S: 12, XS: 8 };
const scaleMap2: Record<IconSize, Pixels> = { L: 32, M: 24, S: 16, XS: 12 };
/* eslint-enable id-length */
const mapping: Record<Scale, Record<IconSize, Pixels>> = {
  xSmall: scaleMap1,
  small: scaleMap1,
  medium: scaleMap1,
  large: scaleMap1,
  xLarge: scaleMap2,
  xxLarge: scaleMap2,
  xxxLarge: scaleMap2,
};

export const placeholderStyles = {
  8: css`
    width: 8px;
    height: 8px;
  `,
  12: css`
    width: 12px;
    height: 12px;
  `,
  16: css`
    width: 16px;
    height: 16px;
  `,
  24: css`
    width: 24px;
    height: 24px;
  `,
  32: css`
    width: 32px;
    height: 32px;
  `,
};

export const useIconPixelSize = (size: IconSize) => {
  const scale = useScale();
  return mapping[scale][size];
};
