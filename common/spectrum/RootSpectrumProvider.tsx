import React, { memo, useContext, useState } from 'react';

import type { Spectrum } from '../types';
import { RootSpectrumContext, RootSpectrumUpdaterContext, DEFAULT_SPECTRUM } from './context';
import { SpectrumProvider } from './SpectrumProvider';

type RootSpectrumProviderProps = {
  value?: Spectrum | null;
};

/** The top most spectrum provider to be rendered in RootThemeProvider. Can be updated via useRootSpectrumUdpater.  */
export const RootSpectrumProvider: React.FC<RootSpectrumProviderProps> = memo(
  ({ children, value }) => {
    const [spectrum, setSpectrum] = useState<Spectrum>(value ?? DEFAULT_SPECTRUM);
    const context = useContext(RootSpectrumContext);

    /** Guarantee we only have a single RootScaleContext  */
    if (process.env.NODE_ENV !== 'production' && context) {
      // eslint-disable-next-line no-console
      console.error(
        'Multiple RootSpectrumProviders were rendered and there should only be one. Ensure there is a single RootSpectrumProvider to resolve.',
      );
    }

    return (
      <RootSpectrumContext.Provider value={spectrum}>
        <RootSpectrumUpdaterContext.Provider value={setSpectrum}>
          <SpectrumProvider value={spectrum}>{children}</SpectrumProvider>
        </RootSpectrumUpdaterContext.Provider>
      </RootSpectrumContext.Provider>
    );
  },
);

RootSpectrumProvider.displayName = 'RootSpectrumProvider';
