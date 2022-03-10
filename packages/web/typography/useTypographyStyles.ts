import { Typography } from '@cbhq/cds-common';
import * as typographyStyles from './textStyles';

import { useFeatureFlag } from '../system/useFeatureFlag';

export const useTypographyStyles = (name: Typography) => {
  const isFrontier = useFeatureFlag('frontierTypography');
  const finalName = name === 'display2' && isFrontier ? 'display2Frontier' : name;
  return typographyStyles[finalName];
};
