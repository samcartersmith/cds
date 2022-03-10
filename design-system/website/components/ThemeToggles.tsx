import { memo, useCallback } from 'react';

import { Switch } from '@cbhq/cds-web/controls';
import { Spacer } from '@cbhq/cds-web/layout';

import { useFeatureFlagUpdater } from '@cbhq/cds-common/system/useFeatureFlagUpdater';
import { useRootScale } from '@cbhq/cds-common/scale/useRootScale';
import { useRootScalePreferenceUpdater } from '@cbhq/cds-common/scale/useRootScalePreferenceUpdater';
import { useFeatureFlag } from '@cbhq/cds-common/system/useFeatureFlag';
import useThemeContext from '@theme/hooks/useThemeContext';

export type ThemeTogglesProps = {
  showFrontier?: boolean;
  hideDense?: boolean;
};

export const ThemeToggles: React.FC<ThemeTogglesProps> = memo(({ showFrontier, hideDense }) => {
  const scale = useRootScale();
  const { isDarkTheme, setLightTheme, setDarkTheme } = useThemeContext();
  const scaleUpdate = useRootScalePreferenceUpdater();
  const featureFlagUpdate = useFeatureFlagUpdater();
  const hasFrontier = useFeatureFlag('frontier');

  const toggleSpectrum = useCallback(() => {
    const updateFn = isDarkTheme ? setLightTheme : setDarkTheme;
    updateFn();
  }, [setDarkTheme, setLightTheme, isDarkTheme]);

  const toggleScale = useCallback(() => {
    const newScale = scale === 'large' ? 'medium' : 'large';
    scaleUpdate(newScale);
  }, [scale, scaleUpdate]);

  const toggleFrontier = useCallback(() => {
    featureFlagUpdate({ frontier: !hasFrontier });
  }, [hasFrontier, featureFlagUpdate]);

  return (
    <>
      <Switch onChange={toggleSpectrum} checked={isDarkTheme}>
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
