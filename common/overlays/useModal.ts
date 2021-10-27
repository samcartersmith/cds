import { useCallback, useMemo, cloneElement, useRef, ReactElement } from 'react';
import { generateRandomId } from '@cbhq/cds-utils';
import { usePortal } from './usePortal';
import { ModalBaseProps } from '../types';

export const useModal = () => {
  const prevIndex = useRef(0);
  const { addNode, removeNode } = usePortal();

  const id = generateRandomId('modal_');

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
