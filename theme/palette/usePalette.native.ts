import * as React from 'react';

import { mapValues } from '@cds/utils';

import { useSpectrum } from '../spectrum/useSpectrum';
// eslint-disable-next-line import/extensions
import * as spectrum from '../styles/spectrum.native';
import { UsePaletteFn } from './types';
import { usePaletteConfig } from './usePaletteConfig';

export const usePalette: UsePaletteFn = () => {
  const context = usePaletteConfig();
  const spectrumMode = useSpectrum();
  const spectrumColors = spectrum[spectrumMode];

  return React.useMemo(() => {
    return mapValues(context, spectrumAlias => {
      const [alias, opacity = 1] =
        typeof spectrumAlias === 'string' ? [spectrumAlias] : spectrumAlias;
      const spectrumValue = spectrumColors[alias];
      return `rgba(${[...spectrumValue, opacity].join(',')})`;
    });
  }, [context, spectrumColors]);
};
