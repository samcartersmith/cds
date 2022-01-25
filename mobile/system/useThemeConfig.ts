import { useContext, useMemo } from 'react';
import { isDevelopment } from '@cbhq/cds-utils';
import {
  ThemeConfigContext,
  ThemeConfigContextValue,
} from '@cbhq/cds-common/system/ThemeConfigContext';
import { defaultThemeConfig } from './createThemeConfig';

const fallback = {
  config: defaultThemeConfig,
  activeConfig: defaultThemeConfig.light,
};

export const useThemeConfig = (): ThemeConfigContextValue => {
  const context = useContext(ThemeConfigContext);

  return useMemo(() => {
    if (!context) {
      if (isDevelopment()) {
        // eslint-disable-next-line no-console
        console.log('useThemeConfig: Cannot use `useThemeConfig` outside ThemeConfigProvider.');
      }
    }
    return context ?? fallback;
  }, [context]);
};
