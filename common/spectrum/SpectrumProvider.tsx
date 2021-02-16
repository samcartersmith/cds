import * as React from 'react';

import { Spectrum } from '../types';
import { SpectrumContext } from './context';
import { useSpectrum } from './useSpectrum';

type SpectrumProviderProps = {
  value?: Spectrum;
};

export const SpectrumProvider: React.FC<SpectrumProviderProps> = React.memo(
  ({ value, children }) => {
    const spectrum = useSpectrum();
    return (
      <SpectrumContext.Provider value={value ?? spectrum}>{children}</SpectrumContext.Provider>
    );
  }
);

SpectrumProvider.displayName = 'SpectrumProvider';
