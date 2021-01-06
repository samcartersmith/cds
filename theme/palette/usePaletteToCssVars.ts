import * as React from 'react';

import { mapValues, mapKeys, toCssVar, toCssVarFn } from '@cds/utils';

import { usePaletteConfig } from './usePaletteConfig';

export const usePaletteToCssVars = () => {
  const paletteConfig = usePaletteConfig();
  return React.useMemo(() => {
    const transformedValues = mapValues(paletteConfig, spectrumAlias => {
      const [alias, opacity] = typeof spectrumAlias === 'string' ? [spectrumAlias] : spectrumAlias;
      const cssVariable = toCssVarFn(alias);
      if (opacity) {
        return `rgba(${cssVariable},${opacity})` as const;
      } else {
        return `rgb(${cssVariable})` as const;
      }
    });

    return mapKeys(transformedValues, (_, key) => toCssVar(key));
  }, [paletteConfig]);
};
