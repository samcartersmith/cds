import React, { memo, useMemo } from 'react';

import {
  DevicePreferencesProvider,
  FeatureFlagProvider,
  ThemeProvider,
} from '@cbhq/cds-web/system';
import useTheme from '@theme/hooks/useTheme';
import ThemeContext from '@theme/ThemeContext';
import { Spectrum } from '@cbhq/cds-common';
import { css } from 'linaria';
import { getThemeStorage } from ':cds-website/src/theme/ThemeStorage';

const overrides = css`
  display: contents;
  --ifm-avatar-photo-size-md: 80px;
  --ifm-background-color: var(--background);
  --ifm-pre-background: var(--background);
  --ifm-color-primary: var(--primary);
  --ifm-link-color: var(--primary);
  .markdown h1:first-child {
    margin: 0;
  }
`;

const DocusaurusThemeProvider: React.FC = ({ children }) => {
  const { isDarkTheme, setLightTheme, setDarkTheme } = useTheme();
  const value = useMemo(
    () => ({ isDarkTheme, setLightTheme, setDarkTheme }),
    [isDarkTheme, setDarkTheme, setLightTheme],
  );
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const RootThemeProvider: React.FC = memo(({ children }) => {
  const storedSpectrum: Spectrum = getThemeStorage() ?? 'system';
  return (
    <FeatureFlagProvider>
      <DevicePreferencesProvider spectrum={storedSpectrum}>
        <ThemeProvider>
          <DocusaurusThemeProvider>
            <div className={overrides}>{children}</div>
          </DocusaurusThemeProvider>
        </ThemeProvider>
      </DevicePreferencesProvider>
    </FeatureFlagProvider>
  );
});

RootThemeProvider.displayName = 'RootThemeProvider';
