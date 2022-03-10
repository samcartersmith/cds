import { useSpectrumConditional } from '@cbhq/cds-common/hooks/useSpectrumConditional';
import { useFeatureFlag } from '../system/useFeatureFlag';

import { frontierLight, frontierDark } from '../styles/spectrum';

const frontierConfig = { light: frontierLight, dark: frontierDark };

export function useSpectrumClassNameForFrontier() {
  const hasFrontier = useFeatureFlag('frontierColor');
  const frontierClassName = useSpectrumConditional(frontierConfig);
  return hasFrontier ? frontierClassName : undefined;
}
