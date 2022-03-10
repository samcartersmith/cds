import React, { memo, useContext, useState } from 'react';
import { isProduction } from '@cbhq/cds-utils';

import { RootSpectrumPreference } from '../types';

import { RootSpectrumPreferenceContext, RootSpectrumPreferenceUpdaterContext } from './context';

export type RootSpectrumPreferenceProviderProps = {
  value?: RootSpectrumPreference;
};

/** The top most spectrum provider to be rendered in DevicePreferencesProvider. Can be updated via useRootSpectrumUdpater.  */
export const RootSpectrumPreferenceProvider: React.FC<RootSpectrumPreferenceProviderProps> = memo(
  ({ children, value }) => {
    const [spectrum, setSpectrum] = useState<RootSpectrumPreference>(value ?? 'system');
    const context = useContext(RootSpectrumPreferenceContext);

    /** Guarantee we only have a single RootScaleContext  */
    if (!isProduction() && context) {
       
      console.error(
        'Multiple RootSpectrumPreferenceProviders were rendered and there should only be one. Ensure there is a single RootSpectrumPreferenceProvider to resolve.',
      );
    }

    return (
      <RootSpectrumPreferenceContext.Provider value={spectrum}>
        <RootSpectrumPreferenceUpdaterContext.Provider value={setSpectrum}>
          {children}
        </RootSpectrumPreferenceUpdaterContext.Provider>
      </RootSpectrumPreferenceContext.Provider>
    );
  },
);

RootSpectrumPreferenceProvider.displayName = 'RootSpectrumPreferenceProvider';
