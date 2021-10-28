import { useMemo } from 'react';

import { useScale } from '@cbhq/cds-common';
import { useFeatureFlag } from '../system/useFeatureFlag';

import * as scales from '../styles/scale';
import * as scalesBeta from '../styles/scaleBeta';

export const useTypographyStylesMap = () => {
  const hasNewFont = useFeatureFlag('fontMigration');
  const scale = useScale();
  return useMemo(
    () => (hasNewFont ? scalesBeta[scale].typography : scales[scale].typography),
    [scale, hasNewFont],
  );
};
