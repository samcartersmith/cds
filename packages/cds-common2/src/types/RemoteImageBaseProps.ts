import { ThemeVars } from '../core/theme';

import { AvatarSize } from './AvatarSize';
import { FixedValue } from './DimensionStyles';
import { AspectRatio, Shape } from './Shape';

export type RemoteImageBaseProps = {
  /** Scale image based on this aspect-ratio */
  aspectRatio?: AspectRatio;
  /** Height of RemoteImage. Height takes precedence over size */
  height?: FixedValue;
  /**
   * Shape of RemoteImage
   * @default square
   * */
  shape?: Shape;
  /** Width of RemoteImage. Width takes precedence over size */
  width?: FixedValue;
  /**
   * Size for a given RemoteImage. If width or height is not defined,
   * it will set size = m as default
   *
   * @default m
   * */
  size?: AvatarSize;
  /** Adds a custom border color */
  borderColor?: ThemeVars.Color;
};
