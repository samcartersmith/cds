import React, { memo } from 'react';
import { Spectrum } from '@cbhq/cds-common';
import { RootSpectrumContext } from '@cbhq/cds-common/src/spectrum/context';
import {
  RootSpectrumPreferenceProvider,
  RootSpectrumPreferenceProviderProps,
} from '@cbhq/cds-common/src/spectrum/RootSpectrumPreferenceProvider';
import { SpectrumProvider } from '@cbhq/cds-common/src/spectrum/SpectrumProvider';
import { useRootSpectrumPreference } from '@cbhq/cds-common/src/spectrum/useRootSpectrumPreference';

import { useDeviceSpectrum } from '../hooks/useDeviceSpectrum';

const LocalSpectrumProvider = ({ children }: { children: React.ReactNode }) => {
  const rootSpectrum = useRootSpectrumPreference();
  const deviceSpectrum = useDeviceSpectrum();
  const spectrum: Spectrum = rootSpectrum === 'system' ? deviceSpectrum : rootSpectrum;
  return (
    <RootSpectrumContext.Provider value={spectrum}>
      <SpectrumProvider value={spectrum}>{children}</SpectrumProvider>
    </RootSpectrumContext.Provider>
  );
};

export const RootSpectrumProvider: React.FC<RootSpectrumPreferenceProviderProps> = memo(
  ({ children, value }) => {
    return (
      <RootSpectrumPreferenceProvider value={value}>
        <LocalSpectrumProvider>{children}</LocalSpectrumProvider>
      </RootSpectrumPreferenceProvider>
    );
  },
);

RootSpectrumProvider.displayName = 'RootSpectrumProvider';
