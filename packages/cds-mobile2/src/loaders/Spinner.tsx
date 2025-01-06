import React, { memo } from 'react';
import { ActivityIndicator, ActivityIndicatorProps } from 'react-native';

import { useColorScheme } from '../hooks/useColorScheme';
import { useTheme } from '../system';

export const Spinner = memo(function Spinner({
  size = 'small',
  animating,
  ...props
}: ActivityIndicatorProps) {
  const theme = useTheme();
  const colorScheme = useColorScheme();
  const color =
    colorScheme === 'dark' ? theme.color.backgroundOverlay : theme.color.backgroundPrimary;

  return <ActivityIndicator animating={animating} color={color} size={size} {...props} />;
});
