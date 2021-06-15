import React, { memo } from 'react';

import { Switch } from '@cbhq/cds-web/controls';
import { Spacer } from '@cbhq/cds-web/layout';

import { useRootTheme } from './RootThemeProvider';

export const ThemeToggles = memo(() => {
  const { spectrum, scaleDensity, toggleSpectrum, toggleScale } = useRootTheme();
  return (
    <>
      <Switch onChange={toggleSpectrum} checked={spectrum === 'dark'}>
        Dark Spectrum
      </Switch>
      <Spacer vertical={3} />
      <Switch onChange={toggleScale} checked={scaleDensity === 'dense'}>
        Dense Scale
      </Switch>
    </>
  );
});

ThemeToggles.displayName = 'ThemeToggles';
