import { useMemo } from 'react';

import type { Scale } from '@cbhq/cds-common/types';

import { useDeviceFontScale } from './useDeviceFontScale';

export const deviceScaleMap: Record<Scale, number> = {
  xSmall: 0.823,
  small: 0.882,
  medium: 0.941,
  large: 1,
  xLarge: 1.118,
  xxLarge: 1.235,
  xxxLarge: 1.353,
};

/** Maps device font scale to CDS scale */
export const useDeviceScaleToCdsScale = () => {
  const deviceScale = useDeviceFontScale();

  return useMemo(() => {
    if (deviceScale <= deviceScaleMap.xSmall) {
      return 'xSmall';
    } else if (deviceScale <= deviceScaleMap.small) {
      return 'small';
    } else if (deviceScale <= deviceScaleMap.medium) {
      return 'medium';
    } else if (deviceScale <= deviceScaleMap.large) {
      return 'large';
    } else if (deviceScale <= deviceScaleMap.xLarge) {
      return 'xLarge';
    } else if (deviceScale <= deviceScaleMap.xxLarge) {
      return 'xxLarge';
    } else if (deviceScale >= deviceScaleMap.xxxLarge) {
      return 'xxxLarge';
    }
    return 'large';
  }, [deviceScale]);
};
