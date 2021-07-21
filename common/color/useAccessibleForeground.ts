import { useMemo } from 'react';

import { SpectrumAlias, A11yColorUsage } from '../types';
import { colorToSpectrumAlias } from './colorToSpectrumAlias';
import { isAccessibleColor } from './isAccessibleColor';

/**
 * People with low vision often have difficulty reading text that does not contrast with its background.
 * This can be exacerbated if the person has a color vision deficiency that lowers the contrast even further.
 * Providing a minimum luminance contrast ratio between the text and its background can make the text more
 * readable even if the person does not see the full range of colors. It also works for the rare individuals who see no color.
 *
 * 1. Check if color meets contrast criteria.
 * 2. If pass, return color passed in.
 * 3. If fail, check saturation.
 * 4. If gray color return `gray100`.
 * 5. If non gray color return closest CDS spectrum alias (i.e. `orange60`).
 */
export const useAccessibleForeground = (
  /* Valid color value (hex, rgb, rgba, etc) */
  background: string,
  /* Valid color value (hex, rgb, rgba, etc) */
  foreground: string,
  /** Where the foreground color is being applied. */
  usage: A11yColorUsage,
  /** Function to transform a paletteValue (blue60 or [blue60, 1]) into a valid color value. */
  transformFn: (value: SpectrumAlias) => string,
) => {
  return useMemo(() => {
    if (isAccessibleColor(background, foreground, usage)) {
      return foreground;
    }
    const spectrumAlias = colorToSpectrumAlias(foreground, usage);
    return transformFn(spectrumAlias);
  }, [background, foreground, transformFn, usage]);
};
