import { useContext } from 'react';
import { PortalContext } from './PortalContext';

export const usePortal = () => {
  const context = useContext(PortalContext);
  if (process.env.NODE_ENV !== 'production' && !context) {
    // eslint-disable-next-line no-console
    console.error('Cannot use `usePortal` outside of PortalProvider');
  }
  return context;
};
