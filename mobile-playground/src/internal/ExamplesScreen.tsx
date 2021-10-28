import React, { useCallback } from 'react';

import { Switch } from '@cbhq/cds-mobile/controls/Switch';
import { Divider, VStack } from '@cbhq/cds-mobile/layout';
import { ThemeProvider } from '@cbhq/cds-mobile/system';
import { useFeatureFlagUpdater } from '@cbhq/cds-mobile/system/useFeatureFlagUpdater';
import { useFeatureFlags } from '@cbhq/cds-mobile/system/useFeatureFlags';

import { useRootSpectrumPreferenceUpdater } from '@cbhq/cds-common/spectrum/useRootSpectrumPreferenceUpdater';
import { useRootScale } from '@cbhq/cds-common/scale/useRootScale';
import { useRootSpectrum } from '@cbhq/cds-common/spectrum/useRootSpectrum';
import { useRootScalePreferenceUpdater } from '@cbhq/cds-common/scale/useRootScalePreferenceUpdater';
import Screen from './Screen';

const ExamplesScreen: React.FC = ({ children }) => {
  const rootScale = useRootScale();
  const rootSpectrum = useRootSpectrum();
  const updateFeatureFlags = useFeatureFlagUpdater();
  const { frontier } = useFeatureFlags();

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

  const toggleFrontier = useCallback(() => {
    updateFeatureFlags((prev) => ({ frontier: !prev.frontier }));
  }, [updateFeatureFlags]);

  return (
    <ThemeProvider
      spectrum={isDarkEnabled ? 'dark' : rootSpectrum}
      scale={isDenseEnabled ? 'xSmall' : rootScale}
    >
      <Screen>
        <ThemeProvider scale="xSmall">
          <VStack>
            <VStack gap={1} spacingVertical={3} spacingHorizontal={2} background>
              <Switch onChange={toggleDark} checked={isDarkEnabled}>
                Dark Spectrum
              </Switch>
              <Switch onChange={toggleDense} checked={isDenseEnabled}>
                Dense Scale
              </Switch>
              <Switch onChange={toggleFrontier} checked={frontier}>
                Frontier
              </Switch>
            </VStack>
            <Divider />
          </VStack>
        </ThemeProvider>
        {children}
      </Screen>
    </ThemeProvider>
  );
};

export default ExamplesScreen;
