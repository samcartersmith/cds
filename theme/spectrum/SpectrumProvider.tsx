import * as React from 'react';

import { SpectrumContext } from '@cds/theme/spectrum/context';
import { Spectrum } from '@cds/theme/spectrum/types';
import { useSpectrum } from '@cds/theme/spectrum/useSpectrum';

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
