import { useContext, useMemo } from 'react';
import {
  ThemeConfigContext,
  ThemeConfigContextValue,
} from '@cbhq/cds-common/system/ThemeConfigContext';

import { createFallbackThemeConfig } from './createThemeConfig';

export const useThemeConfig = (): ThemeConfigContextValue => {
  const context = useContext(ThemeConfigContext);

  return useMemo(() => {
    if (context) return context;
    const fallbackConfig = createFallbackThemeConfig();
    return {
      config: fallbackConfig,
      activeConfig: fallbackConfig.light,
    };
  }, [context]);
};
