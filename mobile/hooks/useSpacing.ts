import { useScale } from '@cbhq/cds-common';

import * as scaleStyles from '../styles/scale';

export const useSpacingScale = () => {
  const scale = useScale();
  return scaleStyles[scale].spacing;
};
