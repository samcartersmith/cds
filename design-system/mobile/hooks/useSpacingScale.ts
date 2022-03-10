import { useMemo } from 'react';
import { useScale } from '@cbhq/cds-common';

import * as scaleStyles from '../styles/scale';

export const useSpacingScale = () => {
  const scale = useScale();
  return useMemo(() => scaleStyles[scale].spacing, [scale]);
};
