import React, { memo } from 'react';

import { Switch } from '@cbhq/cds-web/controls';
import { Spacer } from '@cbhq/cds-web/layout';

import {useRootScale} from "@cbhq/cds-common/scale/useRootScale";
import {useRootSpectrum} from "@cbhq/cds-common/spectrum/useRootSpectrum";
import {useRootSpectrumUpdater} from "@cbhq/cds-common/spectrum/useRootSpectrumUpdater";
import {useRootScaleUpdater} from "@cbhq/cds-common/scale/useRootScaleUpdater";

export const ThemeToggles = memo(() => {
  const spectrum = useRootSpectrum();
  const scale = useRootScale();
  const spectrumUpdate = useRootSpectrumUpdater();
  const scaleUpdate = useRootScaleUpdater();

  const toggleSpectrum = () => {
    const newSpectrum = spectrum === 'dark' ? 'light' : 'dark';
    spectrumUpdate(newSpectrum);
  };

  const toggleScale = () => {
    const newScale = scale === 'large' ? 'medium' : 'large';
    scaleUpdate(newScale);
  }

  return (
    <>
      <Switch onChange={toggleSpectrum} checked={spectrum === 'dark'}>
        Dark Spectrum
      </Switch>
      <Spacer vertical={3} />
      <Switch onChange={toggleScale} checked={scale === 'medium'}>
        Dense Scale
      </Switch>
    </>
  );
});

ThemeToggles.displayName = 'ThemeToggles';
