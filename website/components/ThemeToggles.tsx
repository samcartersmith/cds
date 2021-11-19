import { memo, useCallback } from 'react';

import { Switch } from '@cbhq/cds-web/controls';
import { Spacer } from '@cbhq/cds-web/layout';

import { useFeatureFlagUpdater } from '@cbhq/cds-common/system/useFeatureFlagUpdater';
import { useRootSpectrumPreferenceUpdater } from '@cbhq/cds-common/spectrum/useRootSpectrumPreferenceUpdater';
import { useRootSpectrum } from '@cbhq/cds-common/spectrum/useRootSpectrum';
import { useRootScale } from '@cbhq/cds-common/scale/useRootScale';
import { useRootScalePreferenceUpdater } from '@cbhq/cds-common/scale/useRootScalePreferenceUpdater';
import { useFeatureFlag } from '@cbhq/cds-common/system/useFeatureFlag';

export type ThemeTogglesProps = {
  showFrontier?: boolean;
  hideDense?: boolean;
};

export const ThemeToggles: React.FC<ThemeTogglesProps> = memo(({ showFrontier, hideDense }) => {
  const spectrum = useRootSpectrum();
  const scale = useRootScale();
  const spectrumUpdate = useRootSpectrumPreferenceUpdater();
  const scaleUpdate = useRootScalePreferenceUpdater();
  const featureFlagUpdate = useFeatureFlagUpdater();
  const hasFrontier = useFeatureFlag('frontier');

  const toggleSpectrum = useCallback(() => {
    const newSpectrum = spectrum === 'dark' ? 'light' : 'dark';
    spectrumUpdate(newSpectrum);
  }, [spectrum, spectrumUpdate]);

  const toggleScale = useCallback(() => {
    const newScale = scale === 'large' ? 'medium' : 'large';
    scaleUpdate(newScale);
  }, [scale, scaleUpdate]);

  const toggleFrontier = useCallback(() => {
    featureFlagUpdate({ frontier: !hasFrontier });
  }, [hasFrontier, featureFlagUpdate]);

  return (
    <>
      <Switch onChange={toggleSpectrum} checked={spectrum === 'dark'}>
        Dark Spectrum
      </Switch>
      {!hideDense && (
        <>
          <Spacer vertical={3} />
          <Switch onChange={toggleScale} checked={scale === 'medium'}>
            Dense Scale
          </Switch>
        </>
      )}
      {showFrontier && (
        <>
          <Spacer vertical={3} />
          <Switch onChange={toggleFrontier} checked={hasFrontier}>
            Frontier
          </Switch>
        </>
      )}
    </>
  );
});

ThemeToggles.displayName = 'ThemeToggles';
