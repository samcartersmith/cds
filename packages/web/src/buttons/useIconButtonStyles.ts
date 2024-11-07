import { useMemo } from 'react';
import { useInteractableHeight } from '@cbhq/cds-common/hooks/useInteractableHeight';

export const useIconButtonStyles = (compact?: boolean) => {
  const height = useInteractableHeight(compact);
  return useMemo(() => ({ '--interactable-height': `${height}px` }), [height]);
};
