import type { DividerBaseProps } from '../types';
import { useSpectrumConditional } from './useSpectrumConditional';

export const useAccordionDividerColor = () => {
  return useSpectrumConditional<DividerBaseProps['color'], DividerBaseProps['color']>({
    light: 'line',
    dark: 'lineHeavy',
  });
};
