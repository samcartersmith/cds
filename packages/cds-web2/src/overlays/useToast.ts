import { useToast as useToastCommon } from '@cbhq/cds-common2/overlays/useToast';

import { type ToastProps, Toast } from './Toast';

export const useToast = () => {
  return useToastCommon<
    Pick<ToastProps, 'hideCloseButton' | 'disablePortal' | 'closeButtonAccessibilityProps'>
  >(Toast);
};
