import React, { memo, createContext, useMemo } from 'react';

import { Spectrum, ThemeConfig } from '../types';
import { useSpectrum } from '../spectrum/useSpectrum';

export type ThemeConfigContextValue = { config: ThemeConfig; activeConfig: ThemeConfig[Spectrum] };
export type ThemeConfigProviderProps = { value: ThemeConfig };
export const ThemeConfigContext = createContext<ThemeConfigContextValue | undefined>(undefined);

/** Official CDS palettes with config + corresponding rgba values for light and dark mode */
export const ThemeConfigProvider: React.FC<ThemeConfigProviderProps> = memo(
  ({ value, children }) => {
    const spectrum = useSpectrum();
    const contextValue = useMemo(
      () => ({
        config: value,
        activeConfig: spectrum === 'light' ? value.light : value.dark,
      }),
      [value, spectrum],
    );
    return (
      <ThemeConfigContext.Provider value={contextValue}>{children}</ThemeConfigContext.Provider>
    );
  },
);

ThemeConfigProvider.displayName = 'ThemeConfigProvider';
