import { InternalPaletteConfig, Spectrum } from '@cds/common';
import { mapValues } from '@cds/utils';

import * as spectrumColors from '../styles/spectrum';

export const convertPalette = (palette: InternalPaletteConfig, spectrum: Spectrum) => {
  return mapValues(palette, spectrumAlias => {
    const [alias, opacity = 1] =
      typeof spectrumAlias === 'string' ? [spectrumAlias] : spectrumAlias;
    const spectrumValue = spectrumColors[spectrum][alias];
    return `rgba(${[...spectrumValue, opacity].join(',')})`;
  });
};
