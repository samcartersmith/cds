import { useToggler } from '@cbhq/cds-common/hooks/useToggler';
import { Switch } from '@cbhq/cds-mobile/controls/Switch';
import { Box, Spacer } from '@cbhq/cds-mobile/layout';
import { ThemeProvider } from '@cbhq/cds-mobile/system';

import Example from './internal/Example';
import Screen from './internal/Screen';

const SwitchScreen = () => {
  return (
    <Screen>
      <Example title="Default" inline>
        {() => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const [isCheckedLight, { toggle: toggleLight }] = useToggler();
          const [isCheckedDark, { toggle: toggleDark }] = useToggler();

          return (
            <>
              <Switch checked={isCheckedLight} onChange={toggleLight}>
                Default
              </Switch>
              <Spacer vertical={2} />
              <ThemeProvider spectrum="dark">
                <Box background="background" spacing={2} offsetHorizontal={2}>
                  <Switch checked={isCheckedDark} onChange={toggleDark}>
                    Default
                  </Switch>
                </Box>
              </ThemeProvider>
            </>
          );
        }}
      </Example>

      <Example title="States" inline>
        <Switch checked>On</Switch>
        <Switch checked readOnly>
          On Readonly
        </Switch>
        <Switch disabled>Off Disabled</Switch>
        <Switch readOnly>Off Read Only</Switch>
        <Switch accessibilityLabel="switch with no label" />
        <Switch>
          This switch has a multi-line label. The switch and label should align at the top.
        </Switch>
      </Example>

      <Example title="Dark Mode" inline>
        {() => {
          const [isChecked, { toggle }] = useToggler();
          return (
            <ThemeProvider spectrum={isChecked ? 'dark' : 'light'}>
              <Switch checked={isChecked} onChange={toggle} accessibilityLabel="turn on dark mode">
                Dark Mode
              </Switch>
            </ThemeProvider>
          );
        }}

        <Switch checked readOnly>
          On Readonly
        </Switch>
        <Switch disabled>Off Disabled</Switch>
        <Switch readOnly>Off Read Only</Switch>
        <Switch accessibilityLabel="switch with no label" />
      </Example>
    </Screen>
  );
};

export default SwitchScreen;
