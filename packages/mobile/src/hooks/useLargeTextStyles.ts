import { useMemo } from 'react';
import { TextStyle } from 'react-native';
import { useScale } from '@cbhq/cds-common/scale/useScale';

const LARGE_TEXT_LINE_HEIGHT = 32;

export const useLargeTextStyles = (): TextStyle | undefined => {
  const scale = useScale();
  return useMemo(
    () => (scale === 'xxxLarge' ? { lineHeight: LARGE_TEXT_LINE_HEIGHT } : undefined),
    [scale],
  );
};
