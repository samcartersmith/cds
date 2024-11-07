import React, { memo, useContext, useState } from 'react';
import { isProduction } from '@cbhq/cds-utils';

import type { RootScalePreference } from '../types';

import { RootScalePreferenceContext, RootScalePreferenceUpdaterContext } from './context';

export type RootScalePreferenceProviderProps = {
  value?: RootScalePreference;
};

/** The top most scale provider to be rendered in DevicePreferencesProvider. Can be updated via useRootScalePreferenceUpdater. */
export const RootScalePreferenceProvider: React.FC<
  React.PropsWithChildren<RootScalePreferenceProviderProps>
> = memo(({ children, value }) => {
  const [scale, setScale] = useState<RootScalePreference>(value ?? 'system');
  const context = useContext(RootScalePreferenceContext);

  /** Guarantee we only have a single RootScaleContext  */
  if (!isProduction() && context) {
    // eslint-disable-next-line no-console
    console.error(
      'Multiple RootScalePreferenceProviders were rendered and there should only be one. Ensure there is a single RootScalePreferenceProvider to resolve.',
    );
  }

  return (
    <RootScalePreferenceContext.Provider value={scale}>
      <RootScalePreferenceUpdaterContext.Provider value={setScale}>
        {children}
      </RootScalePreferenceUpdaterContext.Provider>
    </RootScalePreferenceContext.Provider>
  );
});

RootScalePreferenceProvider.displayName = 'RootScalePreferenceProvider';
