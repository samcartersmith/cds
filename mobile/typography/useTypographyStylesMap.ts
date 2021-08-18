import { useMemo } from 'react';

import { useScale } from '@cbhq/cds-common';
import { useBeta } from '@cbhq/cds-common/beta';

import * as scales from '../styles/scale';
import * as scalesBeta from '../styles/scaleBeta';

export const useTypographyStylesMap = () => {
  const { fontMigration } = useBeta();
  const scale = useScale();
  return useMemo(
    () => (fontMigration ? scalesBeta[scale].typography : scales[scale].typography),
    [scale, fontMigration],
  );
};
