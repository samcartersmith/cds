import { useToast as useToastCommon } from '@cbhq/cds-common/src/overlays/useToast';

import { Toast } from './Toast';

export const useToast = () => {
  return useToastCommon(Toast);
};
