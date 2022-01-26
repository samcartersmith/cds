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

/**
 * For all Text and TextInputs we set allowFontScaling={true} and maxFontSizeMultiplier={1}.
 * CDS handles everything above 1 and anything below 1 will use React Native's font scaling.
 * This is temporary until we run a scale project to sort out how we want CDS scale to work with dense device scales.
 */
export const fontScaleProps = {
  allowFontScaling: true,
  maxFontSizeMultiplier: 1,
} as const;

/** Maps device font scale to CDS scale */
export const useDeviceScaleToCdsScale = () => {
  const deviceScale = useDeviceFontScale();

  return useMemo(() => {
    /** For xSmall through medium we return large until we can revist device to CDS scale logic. */
    if (deviceScale <= deviceScaleMap.large) {
      return 'large';
    }
    if (deviceScale <= deviceScaleMap.xLarge) {
      return 'xLarge';
    }
    if (deviceScale <= deviceScaleMap.xxLarge) {
      return 'xxLarge';
    }
    if (deviceScale >= deviceScaleMap.xxxLarge) {
      return 'xxxLarge';
    }
    return 'large';
  }, [deviceScale]);
};
