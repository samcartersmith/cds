import { AvatarPixelSize, AvatarSize, FixedValue } from '../types';

type GetRemoteImageWidthAndHeightType = {
  size?: AvatarSize;
  width?: FixedValue;
  height?: FixedValue;
  avatarSize?: AvatarPixelSize;
};

/**
 * Calculate the final Width and Height of RemoteImage
 * @param
 * @returns { width, height }
 */
export const getRemoteImageWidthAndHeight = ({
  size,
  width,
  height,
  avatarSize,
}: GetRemoteImageWidthAndHeightType) => {
  // If height and width and size are not provided, default to avatarSize={m}
  // If size is not provided, use width and height
  const widthAndHeightUndefined = width === undefined && height === undefined;

  // If nothing is defined, we default to avatarSize
  const nothingIsDefined = size === undefined && widthAndHeightUndefined;

  const defaultToAvatarSize = (size !== undefined && widthAndHeightUndefined) || nothingIsDefined;

  const finalWidth = defaultToAvatarSize ? avatarSize : width;
  const finalHeight = defaultToAvatarSize ? avatarSize : height;

  return {
    width: finalWidth,
    height: finalHeight,
  };
};
