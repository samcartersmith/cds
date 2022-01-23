import { useMemo } from 'react';
import { useOverlay } from './useOverlay';

// TODO: change the API to open/close instead of openModal/closeModal
export const useModal = () => {
  const { open, close } = useOverlay('modal_');

  return useMemo(
    () => ({
      openModal: open,
      closeModal: close,
    }),
    [open, close],
  );
};
