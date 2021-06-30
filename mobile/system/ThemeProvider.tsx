import React, { memo } from 'react';

import { SystemProvider, SystemProviderProps } from '@cbhq/cds-common';

export const ThemeProvider = SystemProvider; // This is necessary for docs codegen
export const NormalScaleProvider = memo((props: SystemProviderProps) => (
  <SystemProvider scale="large" {...props} />
));
export const DenseScaleProvider = memo((props: SystemProviderProps) => (
  <SystemProvider scale="xSmall" {...props} />
));
export const DarkModeProvider = memo((props: SystemProviderProps) => (
  <SystemProvider spectrum="dark" {...props} />
));
export const LightModeProvider = memo((props: SystemProviderProps) => (
  <SystemProvider spectrum="light" {...props} />
));

export type ThemeProviderProps = SystemProviderProps;

ThemeProvider.displayName = 'ThemeProvider';
NormalScaleProvider.displayName = 'NormalScaleProvider';
DenseScaleProvider.displayName = 'DenseScaleProvider';
DarkModeProvider.displayName = 'DarkModeProvider';
LightModeProvider.displayName = 'LightModeProvider';
