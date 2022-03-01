import { useScale } from '@cbhq/cds-common';
import { useSpectrumConditional } from '@cbhq/cds-common/hooks/useSpectrumConditional';
import React from 'react';
import { createPortal } from 'react-dom';
import { isSSR } from '../../utils/browser';
import { ThemeProvider } from '../../system/ThemeProvider';

type PopoverBasePortalProps = {
  disablePortal?: boolean;
  invertSpectrum?: boolean;
};

const inverseConfig = { light: 'dark', dark: 'light' } as const;

export const PopoverBasePortal: React.FC<PopoverBasePortalProps> = ({
  disablePortal = false,
  invertSpectrum = false,
  children,
}) => {
  const scale = useScale();
  const invertedSpectrum = useSpectrumConditional(inverseConfig);

  const contentNode = (
    <ThemeProvider scale={scale} spectrum={invertSpectrum ? invertedSpectrum : null}>
      {children}
    </ThemeProvider>
  );

  if (disablePortal || isSSR()) {
    return contentNode;
  }

  // TODO: Leverage Mike's portal. Currently is overlay when being used.
  return createPortal(contentNode, document.body);
};
