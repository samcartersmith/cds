import { Modal as CustomModalComponent } from '@cbhq/cds-web/overlays/Modal/Modal';

import { LayerOne } from './LayerOne';

export function Example({ open }) {
  if (!open) return null;

  return (
    <CustomModalComponent visible accessibilityLabel="custom modal component">
      <LayerOne />
    </CustomModalComponent>
  );
}
