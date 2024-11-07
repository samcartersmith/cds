import { SpacingScale } from '@cbhq/cds-common';
import { useScaleDensity } from '@cbhq/cds-common/scale/useScaleDensity';

export const useSpacingValue = (val: SpacingScale) => {
  const scale = useScaleDensity();
  return scale === 'dense' ? val * 4 : val * 8;
};
