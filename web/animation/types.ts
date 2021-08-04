import { MutableRefObject } from 'react';

import { NoopFn, LottieSource, LottieBaseProps, SharedProps } from '@cbhq/cds-common';
import { AnimationEventName, AnimationItem } from 'lottie-web';

export type LottieEventHandlersMap = {
  [key in LottieListener['name']]?: LottieListener['handler'];
};

export type LottieListener = {
  name: AnimationEventName;
  handler: NoopFn;
};

export type LottieProps<T extends string, Source extends LottieSource<T>> = {
  handlers?: LottieEventHandlersMap;
} & LottieBaseProps<Source> &
  SharedProps;

export type LottieAnimationRef = MutableRefObject<AnimationItem | undefined>;
