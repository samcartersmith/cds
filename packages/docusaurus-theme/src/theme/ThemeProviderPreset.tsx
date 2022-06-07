import React, { memo } from 'react';
import createCustomTheme from '@theme/createCustomTheme';
import type { ThemePresets, ThemeProviderPresetProps } from '@theme/ThemeProviderPreset';

export const presets: ThemePresets = {
  black: createCustomTheme({
    background: 'gray100',
    foreground: 'gray0',
    primary: 'blue30',
  }),
  yellow: createCustomTheme({ light: { primary: 'yellow20' }, dark: { primary: 'gray20' } }),
  orange: createCustomTheme({
    light: { primary: 'orange30' },
    dark: { primary: 'gray30' },
  }),
};

const ThemeProviderPreset = memo(function ThemeProviderPreset({
  preset,
  children,
  ...props
}: ThemeProviderPresetProps) {
  const ThemeProvider = presets[preset];
  if (ThemeProvider) {
    return <ThemeProvider {...props}>{children}</ThemeProvider>;
  }
  return null;
});

export default ThemeProviderPreset;
