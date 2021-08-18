import React, { memo } from 'react';

import {
  DevicePreferencesBaseProviderProps,
  DevicePreferencesBaseProvider,
} from '@cbhq/cds-common/system/DevicePreferencesBaseProvider';
import { Scale, Spectrum } from '@cbhq/cds-common';
import { RootSpectrumSyncManager } from './RootSpectrumSyncManager';
import { RootScaleSyncManager } from './RootScaleSyncManager';

export const DevicePreferencesProvider: React.FC<DevicePreferencesBaseProviderProps> = memo(
  ({ children, scale, spectrum, ...props }) => {
    return (
      <DevicePreferencesBaseProvider
        scale={scale as Scale}
        spectrum={spectrum as Spectrum}
        {...props}
      >
        {!scale && <RootScaleSyncManager />}
        {!spectrum && <RootSpectrumSyncManager />}
        {children}
      </DevicePreferencesBaseProvider>
    );
  },
);

DevicePreferencesProvider.displayName = 'DevicePreferencesProvider';
