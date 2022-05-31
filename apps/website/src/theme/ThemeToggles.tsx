import { memo, useCallback } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import { useRootScale } from '@cbhq/cds-common/scale/useRootScale';
import { useRootScalePreferenceUpdater } from '@cbhq/cds-common/scale/useRootScalePreferenceUpdater';
import { useFeatureFlag } from '@cbhq/cds-common/system/useFeatureFlag';
import { useFeatureFlagUpdater } from '@cbhq/cds-common/system/useFeatureFlagUpdater';
import { Switch } from '@cbhq/cds-web/controls';

export type ThemeTogglesProps = {
  showFrontier?: boolean;
  hideDense?: boolean;
};

const ThemeToggles: React.FC<ThemeTogglesProps> = memo(({ showFrontier, hideDense }) => {
  const scale = useRootScale();
  const { colorMode, setColorMode } = useColorMode();
  const scaleUpdate = useRootScalePreferenceUpdater();
  const featureFlagUpdate = useFeatureFlagUpdater();
  const hasFrontier = useFeatureFlag('frontier');

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

  const toggleFrontier = useCallback(() => {
    featureFlagUpdate({ frontier: !hasFrontier });
  }, [hasFrontier, featureFlagUpdate]);

  return (
    <>
      <Switch onChange={toggleSpectrum} checked={colorMode === 'dark'}>
        Dark Spectrum
      </Switch>
      {!hideDense && (
        <Switch onChange={toggleScale} checked={scale === 'medium'}>
          Dense Scale
        </Switch>
      )}
      {showFrontier && (
        <Switch onChange={toggleFrontier} checked={hasFrontier}>
          Frontier
        </Switch>
      )}
    </>
  );
});

ThemeToggles.displayName = 'ThemeToggles';

export default ThemeToggles;
