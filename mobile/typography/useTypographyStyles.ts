import { Typography, useScale } from '@cbhq/cds-common';

import * as scales from '../styles/scale';

export const useTypographyStyles = (name: Typography) => {
  const scale = useScale();
  return scales[scale].typography[name];
};
