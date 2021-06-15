import { useMemo } from 'react';

import type { ElevationLevels } from '@cbhq/cds-common';
import { useElevationChildOverrides } from '@cbhq/cds-common/context/ElevationProvider';
import { useSpectrumConditional } from '@cbhq/cds-common/hooks/useSpectrumConditional';
import { elevation as elevationTokens } from '@cbhq/cds-common/tokens/elevation';
import { emptyObject } from '@cbhq/cds-utils';

import { usePaletteToCssVars } from './usePaletteToCssVars';

export const useElevationStyles = (elevation?: ElevationLevels) => {
  const paletteCssVars = usePaletteToCssVars();
  const paletteOverrides = useSpectrumConditional({ light: emptyObject, dark: paletteCssVars });
  const childOverrides = useElevationChildOverrides();
  return useMemo(() => {
    if (childOverrides) return paletteOverrides;
    if (!elevation) return emptyObject;
    const { shadowOffset, shadowRadius, shadowOpacity } = elevationTokens[elevation];
    const boxShadow = `${shadowOffset.width}px ${shadowOffset.height}px ${shadowRadius}px rgba(0, 0, 0, ${shadowOpacity})`;
    return {
      ...paletteOverrides,
      boxShadow,
    };
  }, [elevation, childOverrides, paletteOverrides]);
};
