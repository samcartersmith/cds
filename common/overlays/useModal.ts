import { useMemo } from 'react';
import { useOverlay } from './useOverlay';

export const useModal = () => {
  const { show, hide } = useOverlay('modal_');

  return useMemo(
    () => ({
      openModal: show,
      closeModal: hide,
    }),
    [show, hide],
  );
};
