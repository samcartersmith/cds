import React, { memo } from 'react';
import type {
  SpectrumAwarePartialPaletteConfig,
  SpectrumAwareThemeProviderProps,
} from '@theme/createCustomTheme';
import { useSpectrumConditional } from '@cbhq/cds-common/hooks/useSpectrumConditional';
import type { PartialPaletteConfig } from '@cbhq/cds-web';
import {
  ThemeProvider as OriginalThemeProvider,
  ThemeProviderProps,
} from '@cbhq/cds-web/system/ThemeProvider';

function createCustomTheme(palette: PartialPaletteConfig | SpectrumAwarePartialPaletteConfig) {
  if ('light' in palette) {
    const SpectrumAwareThemeProvider = memo(function ThemeProvider(
      props: SpectrumAwareThemeProviderProps,
    ) {
      return (
        <OriginalThemeProvider
          {...props}
          display="contents"
          palette={useSpectrumConditional(props?.palette ?? palette)}
        />
      );
    });
    return SpectrumAwareThemeProvider;
  }

  const RegularThemeProvider = memo(function RegularThemeProvider(props: ThemeProviderProps) {
    return <OriginalThemeProvider palette={palette} {...props} />;
  });

  return RegularThemeProvider;
}

export default createCustomTheme;
