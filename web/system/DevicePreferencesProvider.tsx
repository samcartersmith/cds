import React, { memo } from 'react';
import {
  DevicePreferencesBaseProviderProps,
  DevicePreferencesBaseProvider,
} from '@cbhq/cds-common/system/DevicePreferencesBaseProvider';
import { Spectrum } from '@cbhq/cds-common';
import { RootSpectrumSyncManager } from './RootSpectrumSyncManager';

export const DevicePreferencesProvider: React.FC<DevicePreferencesBaseProviderProps> = memo(
  ({ children, spectrum, ...props }) => {
    return (
      <DevicePreferencesBaseProvider spectrum={spectrum as Spectrum} {...props}>
        {!spectrum && <RootSpectrumSyncManager />}
        {children}
      </DevicePreferencesBaseProvider>
    );
  },
);

DevicePreferencesProvider.displayName = 'DevicePreferencesProvider';
