import { useMemo } from 'react';

import { Typography } from '@cbhq/cds-common';

import { useLineHeightMap } from './useLineHeightMap';

export const useLineHeight = (name: Typography) => {
  const lineHeight = useLineHeightMap();
  return useMemo(() => lineHeight[name], [lineHeight, name]);
};
