import { useMemo } from 'react';

import { Typography } from '@cbhq/cds-common';

import { useTypographyStylesMap } from './useTypographyStylesMap';

export const useTypographyStyles = (name: Typography) => {
  const typographyStyles = useTypographyStylesMap();
  return useMemo(() => typographyStyles[name], [typographyStyles, name]);
};
