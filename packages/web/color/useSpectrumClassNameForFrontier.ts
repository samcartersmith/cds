import { useSpectrumConditional } from '@cbhq/cds-common/hooks/useSpectrumConditional';

import { frontierDark, frontierLight } from '../styles/spectrum';
import { useFeatureFlag } from '../system/useFeatureFlag';

const frontierConfig = { light: frontierLight, dark: frontierDark };

export function useSpectrumClassNameForFrontier() {
  const hasFrontier = useFeatureFlag('frontierColor');
  const frontierClassName = useSpectrumConditional(frontierConfig);
  return hasFrontier ? frontierClassName : undefined;
}
