import { useScale } from '@cbhq/cds-common';
import { useSpectrumConditional } from '@cbhq/cds-common/hooks/useSpectrumConditional';
import React from 'react';
import { createPortal } from 'react-dom';
import { tooltipContainerId } from '../PortalProvider';
import { isSSR } from '../../utils/browser';
import { ThemeProvider } from '../../system/ThemeProvider';
import { PortalProps } from './TooltipProps';

const inverseConfig = { light: 'dark', dark: 'light' } as const;

export const TooltipPortal: React.FC<PortalProps> = ({ disablePortal = false, children }) => {
  const scale = useScale();
  const invertedSpectrum = useSpectrumConditional(inverseConfig);

  const tooltipNode = (
    <ThemeProvider scale={scale} spectrum={invertedSpectrum}>
      {children}
    </ThemeProvider>
  );

  if (disablePortal || isSSR() || !document?.getElementById(tooltipContainerId)) {
    return <>{tooltipNode}</>;
  }

  return createPortal(
    tooltipNode,
    // TODO: Update to Mike's once styling bug is resolved.
    document.body,
  );
};
