import { useRootSpectrum } from '@cbhq/cds-common/spectrum/useRootSpectrum';
import { useRootSpectrumPreferenceUpdater } from '@cbhq/cds-common/spectrum/useRootSpectrumPreferenceUpdater';
import { useCallback, useEffect, useMemo } from 'react';
import { Spectrum } from '@cbhq/cds-common';
import { updateThemeStorage } from ':cds-website/src/theme/ThemeStorage';

const useTheme = () => {
  const rootSpectrum = useRootSpectrum();

  const spectrumUpdate = useRootSpectrumPreferenceUpdater();
  const isDarkTheme = useMemo(() => rootSpectrum === 'dark', [rootSpectrum]);

  const setLightTheme = useCallback(() => {
    const spectrum: Spectrum = 'light';
    spectrumUpdate(spectrum);
    updateThemeStorage(spectrum);
  }, [spectrumUpdate]);

  const setDarkTheme = useCallback(() => {
    const spectrum: Spectrum = 'dark';
    spectrumUpdate(spectrum);
    updateThemeStorage(spectrum);
  }, [spectrumUpdate]);

  // css hooks into this data attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', rootSpectrum);
  }, [rootSpectrum]);

  return {
    isDarkTheme,
    setLightTheme,
    setDarkTheme,
  };
};

export default useTheme;
