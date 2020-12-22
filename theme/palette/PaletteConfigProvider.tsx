import * as React from 'react';

import { emptyObject } from '@cds/utils';

import { PaletteConfigContext } from './context';
import { PaletteConfig } from './types';
import { usePaletteConfig } from './usePaletteConfig';

export type PaletteConfigProviderProps = {
  value?: Partial<PaletteConfig>;
};

export const PaletteConfigProvider: React.FC<PaletteConfigProviderProps> = React.memo(
  ({ value = emptyObject, children }) => {
    const palette = usePaletteConfig();
    const memoizedPaletteConfig = React.useMemo(() => ({ ...palette, ...value }), [palette, value]);

    return (
      <PaletteConfigContext.Provider value={memoizedPaletteConfig}>
        {children}
      </PaletteConfigContext.Provider>
    );
  }
);

PaletteConfigProvider.displayName = 'PaletteProvider';
