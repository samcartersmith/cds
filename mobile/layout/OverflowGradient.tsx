import { useMemo, memo } from 'react';

import { PinningDirection } from '@cbhq/cds-common';
import { overrideAlpha } from '@cbhq/cds-utils';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { usePalette } from '../hooks/usePalette';
import { usePinStyles } from '../hooks/usePinStyles';

export interface OverflowGradientProps {
  pin?: PinningDirection;
}

const start = { x: 0, y: 0 } as const;
const end = { x: 1, y: 0 } as const;

export const OverflowGradient = memo(({ pin = 'right' }: OverflowGradientProps) => {
  const palette = usePalette();
  const pinStyles = usePinStyles(pin);
  const gradientColors = useMemo(
    () => [
      /* Override background to be transparent bc android can't gradient from 'transparent' string */
      overrideAlpha(palette.background, 0),
      palette.background,
    ],
    [palette.background]
  );

  return (
    <LinearGradient
      pointerEvents="none"
      style={[styles.gradient, pinStyles]}
      colors={gradientColors}
      start={start}
      end={end}
    />
  );
});

OverflowGradient.displayName = 'OverflowGradient';

const styles = StyleSheet.create({
  gradient: {
    width: 30,
  },
});
