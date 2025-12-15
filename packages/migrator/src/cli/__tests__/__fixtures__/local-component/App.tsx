import { Modal } from '@cbhq/cds-web/overlays/Modal/Modal';
import { ModalBody } from '@cbhq/cds-web/v7/overlays/Modal/ModalBody';

function LegacyContent() {
  return <ModalBody>Legacy local content</ModalBody>;
}

export function App() {
  return (
    <Modal visible accessibilityLabel="local modal">
      <LegacyContent />
    </Modal>
  );
}
