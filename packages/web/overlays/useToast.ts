import { useToast as useToastCommon } from '@cbhq/cds-common/overlays/useToast';

import { Toast, ToastProps } from './Toast';

export const useToast = () => {
  return useToastCommon<Pick<ToastProps, 'hideCloseButton' | 'disablePortal'>>(Toast);
};
