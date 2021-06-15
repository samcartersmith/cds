import { createContext, memo, useCallback, useContext } from 'react';

import { NoopFn, Scale, ScaleDensity, Spectrum } from '@cbhq/cds-common';
import { useToggler } from '@cbhq/cds-common/hooks/useToggler';
import { noop } from '@cbhq/cds-utils';
import { ThemeProvider as CdsThemeProvider } from '@cbhq/cds-web/system/ThemeProvider';
import useTheme from '@theme/hooks/useTheme';
import ThemeContext from '@theme/ThemeContext';

const RootThemeContext = createContext<{
  scale: Scale;
  scaleDensity: ScaleDensity;
  spectrum: Spectrum;
  toggleSpectrum: NoopFn;
  toggleScale: NoopFn;
}>({
  scale: 'large',
  scaleDensity: 'normal',
  spectrum: 'light',
  toggleSpectrum: noop,
  toggleScale: noop,
});

export const RootThemeProvider: React.FC = memo(props => {
  const { isDarkTheme, setLightTheme, setDarkTheme } = useTheme();
  const [isDenseEnabled, { toggle: toggleScale }] = useToggler();
  const spectrum = isDarkTheme ? 'dark' : 'light';
  const scaleDensity = isDenseEnabled ? 'dense' : 'normal';
  const scale = isDenseEnabled ? 'xSmall' : 'large';
  const toggleSpectrum = useCallback(() => {
    if (isDarkTheme) {
      setLightTheme();
    } else {
      setDarkTheme();
    }
  }, [isDarkTheme, setDarkTheme, setLightTheme]);

  return (
    <RootThemeContext.Provider
      value={{ scale, scaleDensity, spectrum, toggleSpectrum, toggleScale }}
    >
      <CdsThemeProvider spectrum={spectrum} scale={scale}>
        <ThemeContext.Provider value={{ isDarkTheme, setLightTheme, setDarkTheme }}>
          {props.children}
        </ThemeContext.Provider>
      </CdsThemeProvider>
    </RootThemeContext.Provider>
  );
});

export const useRootTheme = () => useContext(RootThemeContext);
RootThemeProvider.displayName = 'RootThemeProvider';
