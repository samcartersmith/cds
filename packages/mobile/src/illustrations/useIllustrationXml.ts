import { useMemo } from 'react';
import { useSpectrumConditional } from '@cbhq/cds-common/src/hooks/useSpectrumConditional';
import type { IllustrationNames } from '@cbhq/cds-common/src/types/IllustrationProps';

import { illustrationSpectrumMap } from './illustrationSpectrumMap';

export function useIllustrationXml(name: IllustrationNames) {
  const spectrumConfig = illustrationSpectrumMap[name];
  const requireFn = useSpectrumConditional(spectrumConfig) ?? spectrumConfig.light;
  // The illustrationSpectrumMap is a map of light + dark require fns.
  // Runtime requires can lead to startup time improvements, because the code within the requireFn will only execute once it invoked for the first time.
  // Additionally, there is a difference between { light: require('someFile.js') } and { light: () => require('someFile.js) }. The latter only load the someFile.js once the function is invoked.
  return useMemo(() => requireFn(), [requireFn]);
}
