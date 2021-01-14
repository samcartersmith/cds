import * as React from 'react';

import { cx } from 'linaria';

import { usePaletteToCssVars } from './palette/usePaletteToCssVars';
import { useScale } from './scale/useScale';
import { useSpectrum } from './spectrum/useSpectrum';
import * as scaleCss from './styles/scale';
import * as spectrumCss from './styles/spectrum';

export const ThemeManager: React.FC = React.memo(({ children }) => {
  const scale = useScale();
  const spectrum = useSpectrum();
  const palette = usePaletteToCssVars();
  return (
    <div className={cx(scaleCss[scale], spectrumCss[spectrum])} style={palette}>
      {children}
    </div>
  );
});

ThemeManager.displayName = 'ThemeManager';
