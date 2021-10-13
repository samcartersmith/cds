import { useMemo } from 'react';
import { useScaleConditional } from '../scale/useScaleConditional';
import { compactSize, defaultSize } from '../tokens/avatar';

export function useDimension(
  isCompact?: boolean,
  size?: number,
): { width: number; height: number } {
  const defaultAvatarSize = useScaleConditional(isCompact ? compactSize : defaultSize);

  return useMemo(() => {
    if (size && Number.isFinite(size)) {
      return {
        width: size,
        height: size,
      };
    }

    return {
      width: defaultAvatarSize,
      height: defaultAvatarSize,
    };
  }, [size, defaultAvatarSize]);
}
