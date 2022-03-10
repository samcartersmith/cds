import { useSpectrumConditional } from '@cbhq/cds-common/hooks/useSpectrumConditional';

import { dark, light } from '../styles/spectrum';

/**
 * Useful to attach spectrum className onto an element or to lookup CSS class properties via getComputedStyle.
 * @returns string - The CSS className for light or dark mode depending on the active spectrum.
 */
export const useSpectrumClassName = () => {
  return useSpectrumConditional({ light, dark });
};
