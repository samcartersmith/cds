import React, { memo, useMemo } from 'react';

import {DevicePreferencesProvider, ThemeProvider} from '@cbhq/cds-web/system';
import useTheme from '@theme/hooks/useTheme';
import ThemeContext from '@theme/ThemeContext';
import {getThemeStorage} from "@cbhq/cds-website/src/theme/ThemeStorage";
import {Spectrum} from "@cbhq/cds-common";

const DocusaurusThemeProvider = (props: { children: any; }) => {
  const { isDarkTheme, setLightTheme, setDarkTheme } = useTheme();
  return useMemo(() => (
      <ThemeContext.Provider value={{ isDarkTheme, setLightTheme, setDarkTheme }}>
        {props.children}
      </ThemeContext.Provider>
    ), [isDarkTheme]
  )
}

export const RootThemeProvider: React.FC = memo((props) => {
  const storedSpectrum: Spectrum = getThemeStorage() ?? undefined; // make sure null isn't used in the prop
  return (
    <DevicePreferencesProvider spectrum={storedSpectrum}>
      <ThemeProvider>
        <DocusaurusThemeProvider>
          {props.children}
        </DocusaurusThemeProvider>
      </ThemeProvider>
    </DevicePreferencesProvider>
  );
})

RootThemeProvider.displayName = 'RootThemeProvider';
