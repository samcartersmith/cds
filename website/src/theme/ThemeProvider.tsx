import React from 'react';

import { ThemeProvider as CdsThemeProvider } from '@cds/web';
import useTheme from '@theme/hooks/useTheme';
import ThemeContext from '@theme/ThemeContext';

const ThemeProvider: React.FC = props => {
  const { isDarkTheme, setLightTheme, setDarkTheme } = useTheme();
  return (
    <CdsThemeProvider spectrum={isDarkTheme ? 'dark' : 'light'}>
      <ThemeContext.Provider value={{ isDarkTheme, setLightTheme, setDarkTheme }}>
        {props.children}
      </ThemeContext.Provider>
    </CdsThemeProvider>
  );
};

export default ThemeProvider;
