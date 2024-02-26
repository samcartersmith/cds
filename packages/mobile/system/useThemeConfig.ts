import { useContext, useMemo } from 'react';
import {
  ThemeConfigContext,
  ThemeConfigContextValue,
} from '@cbhq/cds-common/system/ThemeConfigContext';

import { useFallbackThemeConfig } from './createThemeConfig';

export const useThemeConfig = (): ThemeConfigContextValue => {
  const context = useContext(ThemeConfigContext);
  const fallbackConfig = useFallbackThemeConfig();

  return useMemo(() => {
    if (context) return context;
    return {
      config: fallbackConfig,
      activeConfig: fallbackConfig.light,
    };
  }, [context, fallbackConfig]);
};
