import { useCallback, useMemo, cloneElement, useRef, ReactElement } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { usePortal } from './usePortal';
import { ModalBaseProps } from '../types';

export const useModal = () => {
  const prevIndex = useRef(0);
  const { addNode, removeNode } = usePortal();

  const id = uuidv4();

  const openModal = useCallback(
    (content: ReactElement<ModalBaseProps>, customId?: string): string => {
      prevIndex.current += 1;
      const computedId = customId ?? id;
      const nextIndex = prevIndex.current;
      const onRequestClose = () => {
        content?.props?.onRequestClose?.();
        removeNode(computedId);
      };

      const modal = cloneElement(content, {
        key: computedId,
        zIndex: nextIndex,
        onRequestClose,
      });

      addNode(computedId, modal);
      return computedId;
    },
    [addNode, removeNode, id],
  );

  const closeModal = useCallback(
    (customId?: string) => {
      removeNode(customId ?? id);
    },
    [id, removeNode],
  );

  return useMemo(
    () => ({
      openModal,
      closeModal,
    }),
    [openModal, closeModal],
  );
};
