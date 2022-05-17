import { AvatarSize } from './AvatarSize';
import { FixedValue } from './DimensionStyles';
import { AspectRatio, Shape } from './Shape';

export type RemoteImageBaseProps = {
  aspectRatio?: AspectRatio;
  height?: FixedValue;
  shape?: Shape;
  width?: FixedValue;
  size?: AvatarSize;
};
