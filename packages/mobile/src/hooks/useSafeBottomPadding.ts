import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useScale } from '@cbhq/cds-common/scale/useScale';

import * as scales from '../styles/scale';

export const useSafeBottomPadding = (): number => {
  const { bottom } = useSafeAreaInsets();
  const scale = useScale();
  const { spacing } = scales[scale];
  // For gesture based navigation on Android the bottom safe area is
  // basically nonexistent. This ensures we have minimal padding.
  return Math.max(bottom, spacing[1]);
};
