import { BoxBaseProps } from './BoxBaseProps';
import { LottieSource } from './LottieSource';

type OmittedBoxProps = 'alignContent' | 'justifyContent' | 'flexWrap' | 'flexDirection';

export type LottieBaseProps<T extends LottieSource = LottieSource> = {
  /**
   * A boolean flag indicating whether or not the animation should start automatically when
   * mounted. This only affects the imperative API.
   * @default false
   */
  autoplay?: boolean;
  /**
   * A boolean flag indicating whether or not the animation should loop.
   * @default false
   */
  loop?: boolean;
  /**
   * A callback function which will be called when animation is finished. Note that on mobile, this
   * callback will be called only when `loop` is set to false.
   */
  onAnimationFinish?: () => void;
  /**
   * Determines how to resize the animated view when the frame doesn't match the raw image
   * dimensions.
   * Refer to React Native docs [here](https://facebook.github.io/react-native/docs/image.html#resizemode)
   * @default contain
   */
  resizeMode?: 'cover' | 'contain' | 'center';
  /**
   * The source of animation. Should be pulled from @cbhq/cds-lottie-files.
   * For mobile, import the animation from the animations folder instead of from index so that unused animations are not included during build, `import { tradeStatus } from @cbhq/cds-lottie-files/tradeStatus`.
   * For web, you can import the animation from index since this webpack can handle treeshaking, `import { tradeStatus } from @cbhq/cds-lottie-files`
   */
  source: T;
} & Omit<BoxBaseProps, OmittedBoxProps>;
