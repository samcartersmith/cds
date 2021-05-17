import { memo } from 'react';

import { SystemProvider, SystemProviderProps } from '@cbhq/cds-common';

// This is necessary for docs codegen
export const ThemeProvider = SystemProvider;
export const NormalScaleProvider = memo((props: SystemProviderProps) => (
  <SystemProvider scale="large" {...props} />
));
export const DenseScaleProvider = memo((props: SystemProviderProps) => (
  <SystemProvider scale="xSmall" {...props} />
));

export type ThemeProviderProps = SystemProviderProps;

ThemeProvider.displayName = 'ThemeProvider';
NormalScaleProvider.displayName = 'NormalScaleProvider';
DenseScaleProvider.displayName = 'DenseScaleProvider';
