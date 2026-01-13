import { Button } from '@cbhq/cds-web/v7/actions/Button';

import { CustomModalComponent as RetailRedesignModal } from './RetailRedesignModal';

export function Example({ open }) {
  if (!open) return null;

  return (
    <RetailRedesignModal>
      <Button />
    </RetailRedesignModal>
  );
}
