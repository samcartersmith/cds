import { memo } from 'react';

import { useScale, useSpectrum, SystemProvider, SystemProviderProps } from '@cbhq/cds-common';
import { cx } from 'linaria';

import { usePaletteToCssVars } from '../hooks/usePaletteToCssVars';
import * as scaleCss from '../styles/scale';
import * as spectrumCss from '../styles/spectrum';

export const ThemeProvider: React.FC<SystemProviderProps> = memo(({ children, ...props }) => {
  return (
    <SystemProvider {...props}>
      <ThemeManager>{children}</ThemeManager>
    </SystemProvider>
  );
});

const ThemeManager: React.FC = ({ children }) => {
  const scale = useScale();
  const spectrum = useSpectrum();
  const palette = usePaletteToCssVars();

  return (
    <div
      className={cx(scaleCss[scale], spectrumCss[spectrum])}
      style={palette as React.CSSProperties}
    >
      {children}
    </div>
  );
};

ThemeProvider.displayName = 'ThemeProvider';
