import { Modal } from '@cbhq/cds-web/overlays/Modal/Modal';

import { ImportedContent } from './ImportedContent';

export function App() {
  return (
    <Modal visible accessibilityLabel="imported modal">
      <ImportedContent />
    </Modal>
  );
}
