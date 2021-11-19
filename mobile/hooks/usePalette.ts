import { useMemo } from 'react';

import { useSpectrum, UsePaletteFn, usePaletteConfig } from '@cbhq/cds-common';

import { paletteConfigToRgbaStrings } from '../utils/palette';
import { useFeatureFlag } from '../system/useFeatureFlag';

export const usePalette: UsePaletteFn = () => {
  const palette = usePaletteConfig();
  const spectrumMode = useSpectrum();
  const hasFrontier = useFeatureFlag('frontierColor');

  return useMemo(
    () => paletteConfigToRgbaStrings(palette, spectrumMode, hasFrontier),
    [palette, spectrumMode, hasFrontier],
  );
};
