import { useContext } from 'react';
import { isProduction } from '@cbhq/cds-utils';

import { PortalContext } from './PortalContext';

export const usePortal = () => {
  const context = useContext(PortalContext);
  if (!isProduction() && !context) {
    // eslint-disable-next-line no-console
    console.error('Cannot use `usePortal` outside of PortalProvider');
  }
  return context;
};
