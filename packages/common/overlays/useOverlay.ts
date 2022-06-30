import { cloneElement, useCallback, useMemo, useRef } from 'react';
import { generateRandomId } from '@cbhq/cds-utils';

import { usePortal } from './usePortal';
import { PortalNode } from './usePortalState';

export const useOverlay = (idPrefix?: string) => {
  const { addNode, removeNode } = usePortal();

  const id = useRef(generateRandomId(idPrefix)).current;

  const open = useCallback(
    (content: PortalNode['element']): string => {
      const element = cloneElement(content, {
        key: id,
        visible: true,
      });

      addNode(id, element);
      return id;
    },
    [addNode, id],
  );

  const close = useCallback(() => {
    removeNode(id);
  }, [removeNode, id]);

  return useMemo(
    () => ({
      open,
      close,
    }),
    [open, close],
  );
};
