import { useRootSpectrum } from '@cbhq/cds-common/spectrum/useRootSpectrum';
import { useRootSpectrumPreferenceUpdater } from '@cbhq/cds-common/spectrum/useRootSpectrumPreferenceUpdater';
import { useCallback, useEffect, useMemo } from 'react';
import { Spectrum } from '@cbhq/cds-common';
import { updateThemeStorage } from ':cds-website/src/theme/ThemeStorage';

const useTheme = () => {
  const spectrum = useRootSpectrum();

  const spectrumUpdate = useRootSpectrumPreferenceUpdater();
  const isDarkTheme = useMemo(() => spectrum === 'dark', [spectrum]);

  const setLightTheme = useCallback(() => {
    const spectrum: Spectrum = 'light';
    spectrumUpdate(spectrum);
    updateThemeStorage(spectrum);
  }, [spectrum]);

  const setDarkTheme = useCallback(() => {
    const spectrum: Spectrum = 'dark';
    spectrumUpdate(spectrum);
    updateThemeStorage(spectrum);
  }, [spectrum]);

  // css hooks into this data attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', spectrum);
  }, [spectrum]);

  return {
    isDarkTheme,
    setLightTheme,
    setDarkTheme,
  };
};

export default useTheme;
