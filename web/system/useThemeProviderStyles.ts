import { useMemo } from 'react';

import { useScale, useSpectrum } from '@cbhq/cds-common';
import { cx } from 'linaria';

import { usePaletteToCssVars } from '../hooks/usePaletteToCssVars';
import * as scaleCss from '../styles/scale';
import * as spectrumCss from '../styles/spectrum';

export const useThemeProviderStyles = () => {
  const scale = useScale();
  const spectrum = useSpectrum();
  const palette = usePaletteToCssVars();
  return useMemo(
    () =>
      ({
        className: cx(scaleCss[scale], spectrumCss[spectrum]),
        style: palette as React.CSSProperties,
      } as const),
    [palette, scale, spectrum]
  );
};
