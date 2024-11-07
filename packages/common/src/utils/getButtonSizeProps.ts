import { interactableHeight } from '../tokens/interactableHeight';
import type { IconSize, Scale } from '../types';

import { memoize } from './memoize';

type GetButtonSizeStyles = { compact?: boolean; scale: Scale; compactSize?: string };

function getCacheKey({ compact, scale }: GetButtonSizeStyles) {
  return `${scale}-${compact}`;
}

export const getButtonSizeProps = memoize(function getButtonSizeProps({
  scale,
  compact,
  compactSize,
}: GetButtonSizeStyles) {
  const sizeVariant = compact ? 'compact' : 'regular';
  const minHeight = interactableHeight[scale][sizeVariant];
  const borderRadius = minHeight;
  const defaultCompactSize = 's';

  const iconSize = (compact ? compactSize ?? defaultCompactSize : 'm') as IconSize;

  return { minHeight, borderRadius, iconSize } as const;
},
getCacheKey);
