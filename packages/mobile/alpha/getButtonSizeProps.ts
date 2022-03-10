import { interactableHeight } from '@cbhq/cds-common/tokens/interactableHeight';
import type { Scale } from '@cbhq/cds-common/types';
import { memoize } from '@cbhq/cds-common/utils/memoize';

type GetButtonSizeStyles = { compact?: boolean; scale: Scale };

function getCacheKey({ compact, scale }: GetButtonSizeStyles) {
  return `${scale}-${compact}`;
}

export const getButtonSizeProps = memoize(function getButtonSizeProps({
  scale,
  compact,
}: GetButtonSizeStyles) {
  const sizeVariant = compact ? 'compact' : 'regular';
  const minHeight = interactableHeight[scale][sizeVariant];
  const borderRadius = minHeight;
  const iconSize = compact ? 's' : 'm';
  return { minHeight, borderRadius, iconSize } as const;
},
getCacheKey);
