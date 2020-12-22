import * as React from 'react';

import { usePalette } from '@cds/theme/palette/usePalette';
import { useScale } from '@cds/theme/scale/useScale';
import { useSpectrum } from '@cds/theme/spectrum/useSpectrum';
import * as scaleCss from '@cds/theme/styles/scale';
import * as spectrumCss from '@cds/theme/styles/spectrum';
import { cx } from 'linaria';

export const ThemeManager: React.FC = React.memo(({ children }) => {
  const scale = useScale();
  const spectrum = useSpectrum();
  const palette = usePalette();
  return (
    <div className={cx(scaleCss[scale], spectrumCss[spectrum])} style={palette}>
      {children}
    </div>
  );
});

ThemeManager.displayName = 'ThemeManager';
