import * as React from 'react';

import { toCssVar, toCssVarFn, mapKeys, mapValues } from '@cds/utils';

import { usePaletteConfig } from './usePaletteConfig';

export const usePalette = () => {
  const paletteConfig = usePaletteConfig();
  return React.useMemo(() => {
    return mapKeys(
      mapValues(paletteConfig, spectrumAlias => {
        const [alias, opacity] =
          typeof spectrumAlias === 'string' ? [spectrumAlias] : spectrumAlias;
        const cssVariable = toCssVarFn(alias);
        if (opacity) {
          return `rgba(${cssVariable},${opacity})` as const;
        } else {
          return `rgb(${cssVariable})` as const;
        }
      }),
      (_, key) => toCssVar(key)
    );
  }, [paletteConfig]);
};
