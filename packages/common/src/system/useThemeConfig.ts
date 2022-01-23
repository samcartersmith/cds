import { useContext, useMemo } from 'react';
import { isDevelopment } from '@cbhq/cds-utils';
import { ThemeConfigContext, ThemeConfigContextValue } from './ThemeConfigContext';
import { themeBase } from '../themes/themeBase';

const fallback = {
  config: themeBase,
  activeConfig: themeBase.light,
};

export const useThemeConfig = (): ThemeConfigContextValue => {
  const context = useContext(ThemeConfigContext);

  return useMemo(() => {
    if (!context) {
      if (isDevelopment()) {
        // eslint-disable-next-line no-console
        console.error('useThemeConfig: Cannot use `useThemeConfig` outside ThemeConfigProvider.');
      }
    }
    return context ?? fallback;
  }, [context]);
};
