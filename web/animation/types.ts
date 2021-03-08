import { MutableRefObject } from 'react';

import { NoopFn, LottieSource, LottieBaseProps } from '@cbhq/cds-common';
import { AnimationEventName, AnimationItem } from 'lottie-web';

import { LottieEventHandlersMap } from './useLottieHandlers';

export type LottieListener = {
  name: AnimationEventName;
  handler: NoopFn;
};

export interface LottieProps<T extends string, Source extends LottieSource<T>>
  extends LottieBaseProps<Source> {
  handlers?: LottieEventHandlersMap;
}

export type LottieAnimationRef = MutableRefObject<AnimationItem | undefined>;
