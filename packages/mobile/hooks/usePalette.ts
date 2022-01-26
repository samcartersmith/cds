import { useMemo } from 'react';
import { usePaletteConfig, UsePaletteFn, useSpectrum } from '@cbhq/cds-common';

import { useFeatureFlag } from '../system/useFeatureFlag';
import { paletteConfigToRgbaStrings } from '../utils/palette';

export const usePalette: UsePaletteFn = () => {
  const palette = usePaletteConfig();
  const spectrumMode = useSpectrum();
  const hasFrontier = useFeatureFlag('frontierColor');

  return useMemo(
    () => paletteConfigToRgbaStrings(palette, spectrumMode, hasFrontier),
    [palette, spectrumMode, hasFrontier],
  );
};
