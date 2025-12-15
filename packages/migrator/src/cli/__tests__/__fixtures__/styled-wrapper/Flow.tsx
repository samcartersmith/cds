import { ModalBody } from '@cbhq/cds-web/v7/overlays/Modal/ModalBody';

import { CustomModal } from './CustomModal';

export function Flow() {
  return (
    <CustomModal visible accessibilityLabel="futures onboarding">
      <ModalBody>Legacy body</ModalBody>
    </CustomModal>
  );
}
