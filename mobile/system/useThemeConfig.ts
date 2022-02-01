import { useContext, useMemo } from 'react';
import { ThemeConfigContext } from '@cbhq/cds-common/system/ThemeConfigContext';
import { useSpectrum } from '@cbhq/cds-common/spectrum/useSpectrum';
import { createFallbackThemeConfig } from './createThemeConfig';

export const useThemeConfig = () => {
  const context = useContext(ThemeConfigContext);
  const spectrum = useSpectrum();

  return useMemo(() => {
    if (!context) {
      const fallbackConfig = createFallbackThemeConfig();
      return {
        config: fallbackConfig,
        activeConfig: spectrum === 'light' ? fallbackConfig.light : fallbackConfig.dark,
      };
    }

    return {
      config: context,
      activeConfig: spectrum === 'light' ? context.light : context.dark,
    };
  }, [context, spectrum]);
};
