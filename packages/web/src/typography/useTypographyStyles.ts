import { Typography } from '@cbhq/cds-common';

import * as typographyStyles from './textStyles';

export const useTypographyStyles = (name: Typography) => {
  return typographyStyles[name];
};
