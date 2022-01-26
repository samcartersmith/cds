import { useMemo } from 'react';
import { useScale } from '@cbhq/cds-common';

import * as scales from '../styles/scale';

export const useTypographyStylesMap = () => {
  const scale = useScale();
  return useMemo(() => scales[scale].typography, [scale]);
};
