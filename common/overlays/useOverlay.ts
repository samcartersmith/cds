import { useCallback, useMemo, cloneElement, useRef, ReactElement } from 'react';
import { generateRandomId } from '@cbhq/cds-utils';
import { usePortal } from './usePortal';
import { AlertBaseProps, ModalBaseProps } from '../types';

type OverlayElementProps = ModalBaseProps | AlertBaseProps;

export const useOverlay = (idPrefix?: string) => {
  const prevIndex = useRef(0);
  const { addNode, removeNode } = usePortal();

  const id = generateRandomId(idPrefix);

  const show = useCallback(
    (content: ReactElement<OverlayElementProps>, customId?: string): string => {
      prevIndex.current += 1;
      const computedId = customId ?? id;
      const nextIndex = prevIndex.current;
      const onRequestClose = () => {
        content.props.onRequestClose?.();

        removeNode(computedId);
      };

      const component = cloneElement(content, {
        key: computedId,
        zIndex: nextIndex,
        onRequestClose,
      });

      addNode(computedId, component);
      return computedId;
    },
    [addNode, removeNode, id],
  );

  const hide = useCallback(
    (customId?: string) => {
      removeNode(customId ?? id);
    },
    [id, removeNode],
  );

  return useMemo(
    () => ({
      show,
      hide,
    }),
    [show, hide],
  );
};
