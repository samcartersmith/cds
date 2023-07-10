import { css } from 'linaria';
import { useToggler } from '@cbhq/cds-common/hooks/useToggler';
import { DEFAULT_SCALE } from '@cbhq/cds-common/scale/context';

import { Box } from '../../layout/Box';
import { ThemeProvider } from '../../system/ThemeProvider';
import { palette } from '../../tokens';
import { Switch } from '../Switch';

const DarkModeWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider scale={DEFAULT_SCALE} spectrum="dark">
    <div
      className={css`
        padding: 20px;
        /* All stories have the light story container. This offsets the light story container's padding. */
        margin: -20px;
        background-color: ${palette.background};
      `}
    >
      {children}
    </div>
  </ThemeProvider>
);

export const Normal = () => {
  const [checked, { toggle }] = useToggler();
  return (
    <Switch checked={checked} onChange={toggle}>
      Normal
    </Switch>
  );
};

export const Dense = () => {
  const [checked, { toggle }] = useToggler();
  return (
    <ThemeProvider scale="xSmall">
      <Switch checked={checked} onChange={toggle}>
        Dense
      </Switch>
    </ThemeProvider>
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

export default {
  title: 'Core Components/Switch',
  component: Switch,
};
