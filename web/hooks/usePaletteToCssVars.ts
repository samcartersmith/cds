import * as React from 'react';

import { usePaletteConfig } from '@cbhq/cds-common';
import { mapValues, mapKeys, toCssVar, toCssVarFn } from '@cbhq/cds-utils';

export const usePaletteToCssVars = () => {
  const paletteConfig = usePaletteConfig();
  return React.useMemo(() => {
    const transformedValues = mapValues(paletteConfig, spectrumAlias => {
      const [alias, opacity] = typeof spectrumAlias === 'string' ? [spectrumAlias] : spectrumAlias;
      const cssVariable = toCssVarFn(alias);
      if (opacity) {
        return `rgba(${cssVariable},${opacity})`;
      } else {
        return `rgb(${cssVariable})`;
      }
    });

    return mapKeys(transformedValues, (_, key) => toCssVar(key));
  }, [paletteConfig]);
};
