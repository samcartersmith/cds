import React, { useState } from 'react';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { ThemeProvider } from '../../system';
import { defaultTheme } from '../../themes/defaultTheme';
import { Switch } from '../Switch';

const SwitchScreen = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isChecked2, setIsChecked2] = useState(true);

  return (
    <ExampleScreen>
      <Example inline title="Default">
        {() => {
          const toggleChecked = () => setIsChecked((prevChecked) => !prevChecked);
          return (
            <Switch checked={isChecked} onChange={toggleChecked}>
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
          const toggleChecked = () => setIsChecked2((prevChecked) => !prevChecked);
          return (
            <ThemeProvider
              activeColorScheme="light"
              theme={{
                ...defaultTheme,
                lightColor: { ...defaultTheme.lightColor, bgPrimary: 'pink' },
              }}
            >
              <Switch checked={isChecked2} onChange={toggleChecked}>
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
