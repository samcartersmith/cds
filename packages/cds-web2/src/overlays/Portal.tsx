import React, { memo } from 'react';
import { createPortal } from 'react-dom';

import { type ThemeConfig } from '../core/theme';
import { ThemeProvider } from '../providers/ThemeProvider';
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
  children: React.ReactNode;
  theme: ThemeConfig;
};

export const Portal = memo(function Portal({
  disablePortal,
  children,
  containerId = '',
  theme,
}: PortalProps) {
  if (disablePortal || isSSR() || !document.getElementById(containerId)) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>;
  }

  return createPortal(
    <ThemeProvider theme={theme}>{children}</ThemeProvider>,
    document.getElementById(containerId) as HTMLElement,
  );
});
