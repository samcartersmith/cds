import React, { memo, useMemo } from 'react';

import { DevicePreferencesProvider, ThemeProvider } from '@cbhq/cds-web/system';
import useTheme from '@theme/hooks/useTheme';
import ThemeContext from '@theme/ThemeContext';
import { getThemeStorage } from '@cbhq/cds-website/src/theme/ThemeStorage';
import { Spectrum } from '@cbhq/cds-common';

const DocusaurusThemeProvider: React.FC = ({ children }) => {
  const { isDarkTheme, setLightTheme, setDarkTheme } = useTheme();
  const value = useMemo(
    () => ({ isDarkTheme, setLightTheme, setDarkTheme }),
    [isDarkTheme, setDarkTheme, setLightTheme],
  );
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const RootThemeProvider: React.FC = memo(({ children }) => {
  const storedSpectrum: Spectrum = getThemeStorage() ?? undefined; // make sure null isn't used in the prop
  return (
    <DevicePreferencesProvider spectrum={storedSpectrum}>
      <ThemeProvider>
        <DocusaurusThemeProvider>{children}</DocusaurusThemeProvider>
      </ThemeProvider>
    </DevicePreferencesProvider>
  );
});

RootThemeProvider.displayName = 'RootThemeProvider';
