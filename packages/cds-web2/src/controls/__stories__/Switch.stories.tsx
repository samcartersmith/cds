import React, { useState } from 'react';
import { css } from '@linaria/core';

import { ThemeConfig } from '../../core/theme';
import { useTheme } from '../../hooks/useTheme';
import { Box } from '../../layout/Box';
import { ThemeProvider } from '../../system/ThemeProvider';
import { defaultTheme } from '../../themes/defaultTheme';
import { Switch } from '../Switch';

const DarkModeWrapper = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  return (
    <ThemeProvider activeColorScheme="dark" theme={theme}>
      <div
        className={css`
          padding: 20px;
          /* All stories have the light story container. This offsets the light story container's padding. */
          margin: -20px;
          background-color: var(--color-bg);
        `}
      >
        {children}
      </div>
    </ThemeProvider>
  );
};

export const Normal = () => {
  const [checked, setChecked] = useState(false);
  return (
    <Switch checked={checked} onChange={() => setChecked((prevChecked) => !prevChecked)}>
      Normal
    </Switch>
  );
};

export const DarkNormal = () => {
  const [checked, setChecked] = useState(false);
  return (
    <DarkModeWrapper>
      <Switch checked={checked} onChange={() => setChecked((prevChecked) => !prevChecked)}>
        Normal
      </Switch>
    </DarkModeWrapper>
  );
};

export const NoLabel = () => {
  const [checked, setChecked] = useState(false);
  return <Switch checked={checked} onChange={() => setChecked((prevChecked) => !prevChecked)} />;
};
// This is intention to check the view of Switch without any text
NoLabel.parameters = {
  a11y: { config: { rules: [{ id: 'label', enabled: false }] } },
};

export const On = () => <Switch checked>On</Switch>;

export const DisabledOff = () => <Switch disabled>Disabled off</Switch>;

export const DisabledOn = () => (
  <Switch checked disabled>
    Disabled on
  </Switch>
);

export const DarkNormalOn = () => (
  <DarkModeWrapper>
    <Switch checked>On</Switch>
  </DarkModeWrapper>
);

export const DarkNormalDisabledOff = () => (
  <DarkModeWrapper>
    <Switch disabled>Disabled off</Switch>
  </DarkModeWrapper>
);

export const DarkNormalDisabledOn = () => (
  <DarkModeWrapper>
    <Box>
      <Switch checked disabled>
        Disabled on
      </Switch>
    </Box>
  </DarkModeWrapper>
);

export const MultiLineLabel = () => (
  <Box width="250px">
    <Switch>
      This switch has a multi-line label. The switch and label should align at the top.
    </Switch>
  </Box>
);

const customTheme: ThemeConfig = {
  ...defaultTheme,
  light: {
    ...defaultTheme.light,
    bgPrimary: 'rgb(var(--pink50))',
  },
};

export const CustomPalette = () => {
  const [checked, setChecked] = useState(true);
  return (
    <ThemeProvider activeColorScheme="light" theme={customTheme}>
      <Switch checked={checked} onChange={() => setChecked((prevChecked) => !prevChecked)}>
        Custom Palette
      </Switch>
    </ThemeProvider>
  );
};

export default {
  title: 'Core Components/Switch',
  component: Switch,
};
