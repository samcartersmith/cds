import React, { memo } from 'react';

import { DevicePreferencesBaseProviderProps } from '@cbhq/cds-common/system/DevicePreferencesBaseProvider';
import { RootSpectrumProvider } from './RootSpectrumProvider';
import { RootScaleProvider } from './RootScaleProvider';

export const DevicePreferencesProvider: React.FC<DevicePreferencesBaseProviderProps> = memo(
  ({ children, spectrum, scale }) => {
    return (
      <RootSpectrumProvider value={spectrum ?? 'system'}>
        <RootScaleProvider value={scale ?? 'system'}>{children}</RootScaleProvider>
      </RootSpectrumProvider>
    );
  },
);

DevicePreferencesProvider.displayName = 'DevicePreferencesProvider';
