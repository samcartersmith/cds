import { ScaleDensity } from '../types/Scale';

import { useScale } from './useScale';

export function useScaleDensity(): ScaleDensity {
  const scale = useScale();

  return scale === 'xSmall' || scale === 'small' || scale === 'medium' ? 'dense' : 'normal';
}
