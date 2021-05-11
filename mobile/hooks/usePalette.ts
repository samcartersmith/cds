import { useMemo } from 'react';

import { useSpectrum, UsePaletteFn, usePaletteConfig } from '@cbhq/cds-common';

import { paletteConfigToRgbaStrings } from '../utils/palette';

export const usePalette: UsePaletteFn = () => {
  const palette = usePaletteConfig();
  const spectrumMode = useSpectrum();

  return useMemo(() => paletteConfigToRgbaStrings(palette, spectrumMode), [palette, spectrumMode]);
};
