import React, { useCallback } from 'react';

import { Switch } from '@cbhq/cds-mobile/controls/Switch';
import { Divider, Spacer, VStack } from '@cbhq/cds-mobile/layout';
import { ThemeProvider } from '@cbhq/cds-mobile/system';

import { useRootSpectrumPreferenceUpdater } from '@cbhq/cds-common/spectrum/useRootSpectrumPreferenceUpdater';
import { useRootScale } from '@cbhq/cds-common/scale/useRootScale';
import { useRootSpectrum } from '@cbhq/cds-common/spectrum/useRootSpectrum';
import { useRootScalePreferenceUpdater } from '@cbhq/cds-common/scale/useRootScalePreferenceUpdater';
import Screen from './Screen';

const ExamplesScreen: React.FC = ({ children }) => {
  const rootScale = useRootScale();
  const rootSpectrum = useRootSpectrum();

  const isDarkEnabled = rootSpectrum === 'dark';
  const isDenseEnabled = rootScale === 'xSmall';

  const rootSpectrumPreferenceUpdater = useRootSpectrumPreferenceUpdater();
  const toggleDark = useCallback(() => {
    const newSpectrum = rootSpectrum === 'light' ? 'dark' : 'light';
    rootSpectrumPreferenceUpdater(newSpectrum);
  }, [rootSpectrumPreferenceUpdater, rootSpectrum]);

  const rootScalePreferenceUpdater = useRootScalePreferenceUpdater();
  const toggleDense = useCallback(() => {
    const newScale = rootScale === 'xSmall' ? 'large' : 'xSmall';
    rootScalePreferenceUpdater(newScale);
  }, [rootScalePreferenceUpdater, rootScale]);

  return (
    <ThemeProvider
      spectrum={isDarkEnabled ? 'dark' : rootSpectrum}
      scale={isDenseEnabled ? 'xSmall' : rootScale}
    >
      <Screen>
        <ThemeProvider scale="xSmall">
          <VStack>
            <VStack spacingTop={3} spacingHorizontal={2} background>
              <Switch onChange={toggleDark} checked={isDarkEnabled}>
                Dark Spectrum
              </Switch>
              <Spacer vertical={3} />
              <Switch onChange={toggleDense} checked={isDenseEnabled}>
                Dense Scale
              </Switch>
            </VStack>
            <Spacer vertical={3} />
            <Divider />
          </VStack>
        </ThemeProvider>
        {children}
      </Screen>
    </ThemeProvider>
  );
};

export default ExamplesScreen;
