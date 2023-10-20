import React, { memo, useCallback } from 'react';
import useColorMode from '@theme/useColorMode';
import { useRootScale } from '@cbhq/cds-common/scale/useRootScale';
import { useRootScalePreferenceUpdater } from '@cbhq/cds-common/scale/useRootScalePreferenceUpdater';
import { Switch } from '@cbhq/cds-web/controls';
import { VStack } from '@cbhq/cds-web/layout';

const ThemeToggles = memo(function ThemeToggles() {
  const scale = useRootScale();
  const { colorMode, setColorMode } = useColorMode();
  const scaleUpdate = useRootScalePreferenceUpdater();

  const toggleSpectrum = useCallback(() => {
    if (colorMode === 'dark') {
      setColorMode('light');
    } else {
      setColorMode('dark');
    }
  }, [colorMode, setColorMode]);

  const toggleScale = useCallback(() => {
    const newScale = scale === 'large' ? 'medium' : 'large';
    scaleUpdate(newScale);
  }, [scale, scaleUpdate]);

  return (
    <VStack gap={3} offsetHorizontal={4} offsetTop={2}>
      <Switch checked={colorMode === 'dark'} onChange={toggleSpectrum}>
        Dark Spectrum
      </Switch>
      <Switch checked={scale === 'medium'} onChange={toggleScale}>
        Dense Scale
      </Switch>
    </VStack>
  );
});

ThemeToggles.displayName = 'ThemeToggles';
export default ThemeToggles;
