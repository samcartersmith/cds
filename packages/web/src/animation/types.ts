import { AnimationEventName, AnimationItem, SVGRendererConfig } from 'lottie-web';
import type { LottieBaseProps, LottieSource, SharedProps } from '@cbhq/cds-common';

export type LottieEventHandlersMap = {
  [key in LottieListener['name']]?: LottieListener['handler'];
};

export type LottieListener = {
  name: AnimationEventName;
  handler: () => void;
};

export type LottieProps<T extends string, Source extends LottieSource<T>> = {
  handlers?: LottieEventHandlersMap;
  /**
   * In order to render drop shadows, the filter size needs to be set to increase the render surface of the element.
   * You can set the x, y, width and height of filters manually.
   */
  filterSize?: SVGRendererConfig['filterSize'];
} & LottieBaseProps<Source> &
  SharedProps;

export type LottieAnimationRef = React.MutableRefObject<AnimationItem | undefined>;
