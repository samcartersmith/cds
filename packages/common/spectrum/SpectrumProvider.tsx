import React, { memo } from 'react';

import { Spectrum } from '../types';

import { SpectrumContext } from './context';
import { useSpectrum } from './useSpectrum';

type SpectrumProviderProps = {
  value?: Spectrum | null;
};

export const SpectrumProvider: React.FC<SpectrumProviderProps> = memo(({ value, children }) => {
  const spectrum = useSpectrum();
  return <SpectrumContext.Provider value={value ?? spectrum}>{children}</SpectrumContext.Provider>;
});

SpectrumProvider.displayName = 'SpectrumProvider';
