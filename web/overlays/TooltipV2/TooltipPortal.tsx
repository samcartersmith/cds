import { useScale } from '@cbhq/cds-common';
import { useSpectrumConditional } from '@cbhq/cds-common/hooks/useSpectrumConditional';
import React from 'react';
import { createPortal } from 'react-dom';
import { ThemeProvider } from '../../system/ThemeProvider';

export type PortalProps = {
  /**
   * The `children` will be inside the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal?: boolean;
};

const inverseConfig = { light: 'dark', dark: 'light' } as const;

export const TooltipPortal: React.FC<PortalProps> = ({ disablePortal = false, children }) => {
  const scale = useScale();
  const invertedSpectrum = useSpectrumConditional(inverseConfig);

  if (disablePortal) {
    return <>{children}</>;
  }

  return createPortal(
    <ThemeProvider scale={scale} spectrum={invertedSpectrum}>
      {children}
    </ThemeProvider>,
    document.body,
  );
};
