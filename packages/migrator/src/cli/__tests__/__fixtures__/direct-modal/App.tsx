import { Modal } from '@cbhq/cds-web/overlays/Modal/Modal';
import { ModalBody } from '@cbhq/cds-web/v7/overlays/Modal/ModalBody';

export function Example({ open }: { open: boolean }) {
  if (!open) return null;

  return (
    <Modal visible accessibilityLabel="legacy modal">
      <ModalBody>Legacy content</ModalBody>
    </Modal>
  );
}
