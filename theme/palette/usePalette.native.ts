import * as React from 'react';

import { usePaletteConfig } from '@cds/theme/palette/usePaletteConfig';
import { SpectrumAlias } from '@cds/theme/spectrum/types';
import { useSpectrum } from '@cds/theme/spectrum/useSpectrum';
import * as spectrum from '@cds/theme/styles/spectrum';
import { mapValues } from '@cds/utils';

type SpectrumObject = Record<SpectrumAlias, [number, number, number]>;

export const usePalette = () => {
  const context = usePaletteConfig();
  const spectrumMode = useSpectrum();
  const spectrumColors = (spectrum[spectrumMode] as unknown) as SpectrumObject;

  return React.useMemo(() => {
    return mapValues(context, spectrumAlias => {
      const [alias, opacity = 1] =
        typeof spectrumAlias === 'string' ? [spectrumAlias] : spectrumAlias;
      const spectrumValue = spectrumColors[alias];
      if (spectrumValue) {
        return `rgba(${[...spectrumColors[alias], opacity].join(',')})`;
      }
      return spectrumValue;
    });
  }, [context, spectrumColors]);
};
