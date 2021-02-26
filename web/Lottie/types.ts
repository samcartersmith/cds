import { NoopFn, LottieSource, LottieBaseProps } from '@cbhq/cds-common';
import { AnimationEventName } from 'lottie-web';

import { BoxProps } from '../Box/Box';
import { LottieEventHandlersMap } from './useLottieHandlers';

export type LottieListener = {
  name: AnimationEventName;
  handler: NoopFn;
};

export interface LottieProps<T extends string, Source extends LottieSource<T>>
  extends BoxProps,
    LottieBaseProps<Source> {
  handlers?: LottieEventHandlersMap;
}
