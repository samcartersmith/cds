import * as React from 'react';

import { useSpectrum, UsePaletteFn, usePaletteConfig } from '@cds/common';

import { convertPalette } from '../utils/convertPalette';

export const usePalette: UsePaletteFn = () => {
  const palette = usePaletteConfig();
  const spectrumMode = useSpectrum();

  return React.useMemo(() => convertPalette(palette, spectrumMode), [palette, spectrumMode]);
};
