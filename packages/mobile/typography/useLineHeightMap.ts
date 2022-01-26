import { useMemo } from 'react';
import { mapValues } from '@cbhq/cds-utils';

import { useTypographyStylesMap } from './useTypographyStylesMap';

export const useLineHeightMap = () => {
  const styles = useTypographyStylesMap();
  return useMemo(() => mapValues(styles, (val) => val.lineHeight), [styles]);
};
