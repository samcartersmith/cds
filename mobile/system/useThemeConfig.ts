import { useContext, useMemo } from 'react';
import { isDevelopment } from '@cbhq/cds-utils';
import {
  ThemeConfigContext,
  ThemeConfigContextValue,
} from '@cbhq/cds-common/system/ThemeConfigContext';
import { createFallbackThemeConfig } from './createThemeConfig';

export const useThemeConfig = (): ThemeConfigContextValue => {
  const context = useContext(ThemeConfigContext);

  return useMemo(() => {
    if (!context) {
      if (isDevelopment()) {
        // eslint-disable-next-line no-console
        console.log('useThemeConfig: Cannot use `useThemeConfig` outside ThemeConfigProvider.');
      }
    }
    if (context) return context;
    const fallbackConfig = createFallbackThemeConfig();
    return {
      config: fallbackConfig,
      activeConfig: fallbackConfig.light,
    };
  }, [context]);
};
