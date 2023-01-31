import React, { memo } from 'react';
import { DevicePreferencesBaseProviderProps } from '@cbhq/cds-common/system/DevicePreferencesBaseProvider';

import { RootScaleProvider } from './RootScaleProvider';
import { RootSpectrumProvider } from './RootSpectrumProvider';

export const DevicePreferencesProvider: React.FC<
  React.PropsWithChildren<DevicePreferencesBaseProviderProps>
> = memo(({ children, spectrum, scale }) => {
  return (
    <RootSpectrumProvider value={spectrum ?? 'system'}>
      <RootScaleProvider value={scale ?? 'system'}>{children}</RootScaleProvider>
    </RootSpectrumProvider>
  );
});

DevicePreferencesProvider.displayName = 'DevicePreferencesProvider';
