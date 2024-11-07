import { useToast as useToastCommon } from '@cbhq/cds-common/overlays/useToast';

import { Toast } from './Toast';

export const useToast = () => {
  return useToastCommon(Toast);
};
