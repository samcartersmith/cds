import React, { memo, useMemo } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { PinningDirection, SharedProps } from '@cbhq/cds-common';

import { LinearGradient } from '../gradients/LinearGradient';
import { usePalette } from '../hooks/usePalette';
import { usePinStyles } from '../hooks/usePinStyles';

export type OverflowGradientProps = {
  pin?: Exclude<PinningDirection, 'all'>;
  dangerouslySetStyle?: ViewStyle;
} & SharedProps;

const gradient = {
  left: {
    start: { x: 1, y: 0 },
    end: { x: 0, y: 0 },
  },
  right: {
    start: { x: 0, y: 0 },
    end: { x: 1, y: 0 },
  },
  bottom: {
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
  },
  top: {
    start: { x: 0, y: 1 },
    end: { x: 0, y: 0 },
  },
} as const;

export const OverflowGradient = memo(function OverflowGradient({
  pin = 'right',
  dangerouslySetStyle,
  testID,
}: OverflowGradientProps) {
  const palette = usePalette();
  const pinStyles = usePinStyles(pin);
  const gradientColors = useMemo(
    () => [
      /* Override background to be transparent bc android can't gradient from 'transparent' string */
      palette.transparent, // transparent will always be an rgba string
      palette.background,
    ],
    [palette],
  );

  return (
    <LinearGradient
      pointerEvents="none"
      style={[styles.gradient, pinStyles, dangerouslySetStyle]}
      colors={gradientColors}
      start={gradient[pin].start}
      end={gradient[pin].end}
      testID={testID}
    />
  );
});

OverflowGradient.displayName = 'OverflowGradient';

const styles = StyleSheet.create({
  gradient: {
    width: 30,
  },
});
