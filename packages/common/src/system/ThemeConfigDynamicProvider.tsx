import React, { memo, useMemo, useContext } from 'react';

import { PartialThemeConfig } from '../types';
import { useSpectrum } from '../spectrum/useSpectrum';
import { themeBase } from '../themes/themeBase';
import { ThemeConfigContext } from './ThemeConfigContext';
import { mergeThemeConfigs } from './mergeThemeConfigs';

export type ThemeConfigDynamicProviderProps = {
  /** A partial theme config. */
  value: PartialThemeConfig;
};

/**
 * Merges the parent config from context with a new partial theme config.
 * ThemeConfigProvider is preferred since it is more performant and
 * does not require merging the configs on component mount.
 * */
export const ThemeConfigDynamicProvider: React.FC<ThemeConfigDynamicProviderProps> = memo(
  ({ value, children }) => {
    const spectrum = useSpectrum();
    const parentConfig = useContext(ThemeConfigContext)?.config ?? themeBase;
    const contextValue = useMemo(() => {
      const newConfig = mergeThemeConfigs(parentConfig, value);
      return {
        config: newConfig,
        activeConfig: spectrum === 'light' ? newConfig.light : newConfig.dark,
      };
    }, [parentConfig, spectrum, value]);

    return (
      <ThemeConfigContext.Provider value={contextValue}>{children}</ThemeConfigContext.Provider>
    );
  },
);

ThemeConfigDynamicProvider.displayName = 'ThemeConfigDynamicProvider';
