import React from 'react';
import { css } from '@linaria/core';
import { useToggler } from '@cbhq/cds-common2/hooks/useToggler';

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
          background-color: var(--color-background);
        `}
      >
        {children}
      </div>
    </ThemeProvider>
  );
};

export const Normal = () => {
  const [checked, { toggle }] = useToggler();
  return (
    <Switch checked={checked} onChange={toggle}>
      Normal
    </Switch>
  );
};

export const DarkNormal = () => {
  const [checked, { toggle }] = useToggler();
  return (
    <DarkModeWrapper>
      <Switch checked={checked} onChange={toggle}>
        Normal
      </Switch>
    </DarkModeWrapper>
  );
};

export const NoLabel = () => {
  const [checked, { toggle }] = useToggler();
  return <Switch checked={checked} onChange={toggle} />;
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
    backgroundPrimary: 'rgb(var(--pink50))',
  },
};

export const CustomPalette = () => {
  const [checked, { toggle }] = useToggler(true);
  return (
    <ThemeProvider activeColorScheme="light" theme={customTheme}>
      <Switch checked={checked} onChange={toggle}>
        Custom Palette
      </Switch>
    </ThemeProvider>
  );
};

export default {
  title: 'Core Components/Switch',
  component: Switch,
};
