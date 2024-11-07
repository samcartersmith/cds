import { normalScaleMap } from '../media/useAvatarSize';
import { RemoteImageGroupBaseProps } from '../types';

const smallerOverlapSizes = ['m', 'l', 'xl'];

export const getRemoteImageGroupOverlapSpacing = (size: RemoteImageGroupBaseProps['size']) => {
  if (
    (typeof size === 'number' && size <= normalScaleMap.xl) ||
    (typeof size === 'string' && smallerOverlapSizes.includes(size))
  ) {
    return 1;
  }

  return 2;
};
