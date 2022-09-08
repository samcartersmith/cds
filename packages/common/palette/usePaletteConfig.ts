import { useContext, useMemo } from 'react';
import { emptyObject, merge } from '@cbhq/cds-utils';

import { useSpectrumConditional } from '../hooks/useSpectrumConditional';
import { useFeatureFlag } from '../system/useFeatureFlag';
import { PaletteConfig } from '../types/Palette';

import { frontierSpectrumPalette } from './constants';
import { PaletteConfigContext } from './context';

export const usePaletteConfig = (): PaletteConfig => {
  const context = useContext(PaletteConfigContext);
  const hasFrontier = useFeatureFlag('frontierColor');
  const frontierPalette = useSpectrumConditional(frontierSpectrumPalette);
  const paletteToMerge = hasFrontier ? frontierPalette : emptyObject;

  return useMemo(() => {
    return merge(context, paletteToMerge);
  }, [context, paletteToMerge]);
};
