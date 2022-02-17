import { useMemo } from 'react';
import { SpacingScale } from '@cbhq/cds-common';
import { useSpacingScale } from './useSpacingScale';

export function useSpacingValue(value: SpacingScale) {
  const spacing = useSpacingScale();
  return useMemo(() => spacing[value], [spacing, value]);
}
