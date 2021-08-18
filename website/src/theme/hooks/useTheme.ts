import {useRootSpectrum} from "@cbhq/cds-common/spectrum/useRootSpectrum";
import {useRootSpectrumUpdater} from "@cbhq/cds-common/spectrum/useRootSpectrumUpdater";
import {useCallback, useEffect, useMemo, useState} from "react";
import {Spectrum} from "@cbhq/cds-common";
import {updateThemeStorage} from "@cbhq/cds-website/src/theme/ThemeStorage";

const useTheme = () => {

  const spectrum = useRootSpectrum();

  const spectrumUpdate = useRootSpectrumUpdater();
  const isDarkTheme = useMemo(() => spectrum === 'dark', [spectrum]);

  const setLightTheme = useCallback(() => {
    const spectrum: Spectrum = 'light';
    spectrumUpdate(spectrum);
    updateThemeStorage(spectrum);
  }, []);

  const setDarkTheme = useCallback(() => {
    const spectrum: Spectrum = 'dark';
    spectrumUpdate(spectrum);
    updateThemeStorage(spectrum);
  }, []);

  // css hooks into this data attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', spectrum);
  }, [spectrum]);

  return {
    isDarkTheme,
    setLightTheme,
    setDarkTheme,
  }

}

export default useTheme;