import React, { memo } from 'react';
import { ActivityIndicator, ActivityIndicatorProps } from 'react-native';
import { useSpectrumConditional } from '@cbhq/cds-common/hooks/useSpectrumConditional';

import { usePalette } from '../hooks/usePalette';

export const Spinner = memo(function Spinner({
  size = 'small',
  animating,
  ...props
}: ActivityIndicatorProps) {
  const palette = usePalette();
  const color = useSpectrumConditional({
    light: palette.primary,
    dark: palette.backgroundOverlay,
  });

  return <ActivityIndicator color={color} size={size} animating={animating} {...props} />;
});
