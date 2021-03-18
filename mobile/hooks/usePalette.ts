import { useMemo } from 'react';

import { useSpectrum, UsePaletteFn, usePaletteConfig } from '@cbhq/cds-common';

import { convertPalette } from '../utils/convertPalette';

export const usePalette: UsePaletteFn = () => {
  const palette = usePaletteConfig();
  const spectrumMode = useSpectrum();

  return useMemo(() => convertPalette(palette, spectrumMode), [palette, spectrumMode]);
};
