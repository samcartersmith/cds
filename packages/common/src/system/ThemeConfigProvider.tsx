import React, { memo, useMemo } from 'react';

import { useSpectrum } from '../spectrum/useSpectrum';
import type { ThemeConfig } from '../types';

import { ThemeConfigContext } from './ThemeConfigContext';

export type ThemeConfigProviderProps = {
  /** The theme config which was codegenerated or created via createThemeConfig.
   */
  value: ThemeConfig;
};

/** Most performant option for handling palette overrides.
 * Requies providing full config with all palette aliases defined,
 * rgbaStrings and hexValues for light and dark mode. All CDS supported
 * theme configs can be found in `@cbhq/cds-common/src/themes`.
 * */
export const ThemeConfigProvider: React.FC<ThemeConfigProviderProps> = memo(
  ({ value, children }) => {
    const spectrum = useSpectrum();
    const contextValue = useMemo(() => {
      return {
        config: value,
        activeConfig: spectrum === 'light' ? value.light : value.dark,
      };
    }, [spectrum, value]);
    return (
      <ThemeConfigContext.Provider value={contextValue}>{children}</ThemeConfigContext.Provider>
    );
  },
);

ThemeConfigProvider.displayName = 'ThemeConfigProvider';
