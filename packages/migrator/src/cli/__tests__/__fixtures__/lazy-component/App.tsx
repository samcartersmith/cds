/* eslint-disable simple-import-sort/imports */
import React, { Suspense } from 'react';

import { Modal } from '@cbhq/cds-web/overlays/Modal/Modal';

const LazyLegacy = React.lazy(() => import('./LegacyContent'));

export function App() {
  return (
    <Modal visible accessibilityLabel="lazy modal">
      <Suspense fallback={null}>
        <LazyLegacy />
      </Suspense>
    </Modal>
  );
}
