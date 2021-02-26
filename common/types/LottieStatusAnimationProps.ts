import { DimensionValue } from './DimensionStyles';

export type LottieStatusAnimationType =
  | 'loading'
  | 'success'
  | 'cardSuccess'
  | 'failure'
  | 'pending';

interface BaseStatusAnimationProps {
  status?: LottieStatusAnimationType;
  onFinish?: VoidFunction;
}

interface StatusAnimationWithWidth extends BaseStatusAnimationProps {
  /**
   * We use aspect ratio to calculate the unset dimension based on the set dimension and a given aspect ratio.
   * Only width or height is allowed, but not both.
   */
  width: DimensionValue;
}

interface StatusAnimationWithHeight extends BaseStatusAnimationProps {
  /**
   * We use aspect ratio to calculate the unset dimension based on the set dimension and a given aspect ratio.
   * Only width or height is allowed, but not both.
   */
  height: DimensionValue;
}

export type LottieStatusAnimationProps = StatusAnimationWithWidth | StatusAnimationWithHeight;
