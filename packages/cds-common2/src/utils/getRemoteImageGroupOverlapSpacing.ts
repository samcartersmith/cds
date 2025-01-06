import { avatarSizeMap, RemoteImageGroupBaseProps } from '../types';

const smallerOverlapSizes = ['m', 'l', 'xl'];

export const getRemoteImageGroupOverlapSpacing = (size: RemoteImageGroupBaseProps['size']) => {
  if (
    (typeof size === 'number' && size <= avatarSizeMap.xl) ||
    (typeof size === 'string' && smallerOverlapSizes.includes(size))
  ) {
    return -1;
  }

  return -2;
};
