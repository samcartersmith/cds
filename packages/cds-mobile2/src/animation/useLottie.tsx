import { useMemo, useRef } from 'react';
import { Animated } from 'react-native';
import { LottieSource } from '@cbhq/cds-common2';

import { createLottie } from './createLottie';

export function useLottie<T extends LottieSource>(source: T, startProgressValue = 0) {
  const progressOverride = useRef(new Animated.Value(startProgressValue));
  return useMemo(() => createLottie(source, progressOverride.current), [source]);
}
