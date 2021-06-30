import React, { memo, useContext, useState } from 'react';

import type { Scale } from '../types';
import { RootScaleContext, RootScaleUpdaterContext, DEFAULT_SCALE } from './context';
import { ScaleProvider } from './ScaleProvider';

type RootScaleProviderProps = {
  value?: Scale | null;
};

/** The top most scale provider to be rendered in RootThemeProvider. Can be updated via useRootScaleUpdater. */
export const RootScaleProvider: React.FC<RootScaleProviderProps> = memo(({ children, value }) => {
  const [scale, setScale] = useState<Scale>(value ?? DEFAULT_SCALE);
  const context = useContext(RootScaleContext);

  /** Guarantee we only have a single RootScaleContext  */
  if (process.env.NODE_ENV !== 'production' && context) {
    // eslint-disable-next-line no-console
    console.error(
      'Multiple RootScaleProviders were rendered and there should only be one. Ensure there is a single RootScaleProvider to resolve.'
    );
  }

  return (
    <RootScaleContext.Provider value={scale}>
      <RootScaleUpdaterContext.Provider value={setScale}>
        <ScaleProvider value={scale}>{children}</ScaleProvider>
      </RootScaleUpdaterContext.Provider>
    </RootScaleContext.Provider>
  );
});

RootScaleProvider.displayName = 'RootScaleProvider';
