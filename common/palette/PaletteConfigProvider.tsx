import * as React from 'react';

import { emptyObject } from '@cds/utils';

import { PartialPaletteConfig } from '../types';
import { defaultPalette } from './constants';
import { PaletteConfigContext } from './context';
import { usePaletteConfig } from './usePaletteConfig';

export type PaletteConfigProviderProps = {
  value?: PartialPaletteConfig;
};

export const PaletteConfigProvider: React.FC<PaletteConfigProviderProps> = React.memo(
  ({ value = emptyObject, children }) => {
    const palette = usePaletteConfig();
    const memoizedPaletteConfig = React.useMemo(
      () => ({
        // Fallback to defaultPalette in case root context has partial palette config
        ...defaultPalette,
        // Fallback to values from parent palette
        ...palette,
        // Custom palette overrides
        ...value,
      }),
      [palette, value]
    );

    return (
      <PaletteConfigContext.Provider value={memoizedPaletteConfig}>
        {children}
      </PaletteConfigContext.Provider>
    );
  }
);

PaletteConfigProvider.displayName = 'PaletteProvider';
