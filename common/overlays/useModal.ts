import { useCallback, useMemo, cloneElement, useRef, ReactElement } from 'react';
import { usePortal } from './usePortal';
import { ModalBaseProps } from '../types';

export const useModal = () => {
  const prevIndex = useRef(0);
  const { addNode, removeNode } = usePortal();

  const openModal = useCallback(
    (content: ReactElement<ModalBaseProps>, customId?: string) => {
      prevIndex.current += 1;
      const nextIndex = prevIndex.current;
      const id = ['modal', customId, nextIndex].filter(Boolean).join('-');
      const onRequestClose = () => {
        content?.props?.onRequestClose();
        removeNode(id);
      };

      const modal = cloneElement(content, { key: id, zIndex: nextIndex, onRequestClose });
      addNode(id, modal);
    },
    [addNode, removeNode],
  );

  return useMemo(
    () => ({
      openModal,
      closeModal: removeNode,
    }),
    [openModal, removeNode],
  );
};
