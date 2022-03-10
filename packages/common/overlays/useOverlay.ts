import { useCallback, useMemo, cloneElement, useRef } from 'react';
import { generateRandomId } from '@cbhq/cds-utils';
import { usePortal } from './usePortal';
import { PortalNode } from './usePortalState';
import type { ModalRefBaseProps, AlertRefBaseProps } from '../types';

export const useOverlay = (idPrefix?: string) => {
  const { addNode, removeNode } = usePortal();
  const elementRef = useRef<ModalRefBaseProps | AlertRefBaseProps>(null);

  const id = generateRandomId(idPrefix);

  const open = useCallback(
    (content: PortalNode['element']): string => {
      const onRequestClose = () => {
        content.props.onRequestClose?.();
        removeNode(id);
      };

      const component = cloneElement(content, {
        key: id,
        onRequestClose,
        ref: elementRef,
      });

      addNode(id, component);
      return id;
    },
    [addNode, removeNode, id],
  );

  const close = useCallback(() => {
    elementRef.current?.onRequestClose();
  }, [elementRef]);

  return useMemo(
    () => ({
      open,
      close,
    }),
    [open, close],
  );
};
