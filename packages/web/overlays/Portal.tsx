import { memo, ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { isSSR } from '../utils/browser';

export type PortalProps = {
  /**
   * Disable React portal integration
   */
  disablePortal?: boolean;
  /**
   * Portal container element id
   */
  containerId?: string;
  children: ReactNode;
};

export const Portal = memo(function Portal({
  disablePortal,
  children,
  containerId = '',
}: PortalProps) {
  if (disablePortal || isSSR() || !document.getElementById(containerId)) {
    return <>{children}</>;
  }

  return createPortal(children, document.getElementById(containerId) as HTMLElement);
});
