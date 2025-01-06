import { interactableHeight } from '../tokens/interactableHeight';
import type { IconSize } from '../types';

import { memoize } from './memoize';

type GetButtonSizeStyles = { compact?: boolean; compactSize?: string };

function getCacheKey({ compact }: GetButtonSizeStyles) {
  return `${compact}`;
}

export const getButtonSizeProps = memoize(function getButtonSizeProps({
  compact,
  compactSize,
}: GetButtonSizeStyles) {
  const sizeVariant = compact ? 'compact' : 'regular';
  const minHeight = interactableHeight[sizeVariant];
  const borderRadius = minHeight;
  const defaultCompactSize = 's';

  const iconSize = (compact ? compactSize ?? defaultCompactSize : 'm') as IconSize;

  return { minHeight, borderRadius, iconSize } as const;
},
getCacheKey);
