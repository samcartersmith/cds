import React from 'react';
import { useToggler } from '@cbhq/cds-common2/hooks/useToggler';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { ThemeProvider } from '../../system';
import { Switch } from '../Switch';

const SwitchScreen = () => {
  return (
    <ExampleScreen>
      <Example inline title="Default">
        {() => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const [isChecked, { toggle }] = useToggler();

          return (
            <Switch checked={isChecked} onChange={toggle}>
              Default
            </Switch>
          );
        }}
      </Example>
      <Example inline title="States">
        <Switch checked>On</Switch>
        <Switch checked readOnly>
          On Readonly
        </Switch>
        <Switch disabled>Off Disabled</Switch>
        <Switch readOnly>Off Read Only</Switch>
        <Switch accessibilityLabel="switch with no label" />
        <Switch>
          This switch has a multi-line label. The switch and label should align at the top. The
          label is super duper long and it keeps going on forever. This switch has a multi-line
          label.
        </Switch>
      </Example>
      <Example inline title="Custom Palette">
        {() => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const [isChecked, { toggle }] = useToggler(true);
          return (
            <ThemeProvider name="switch-provider" palette={{ primary: 'pink50' }}>
              <Switch checked={isChecked} onChange={toggle}>
                Default
              </Switch>
            </ThemeProvider>
          );
        }}
      </Example>
    </ExampleScreen>
  );
};

export default SwitchScreen;
