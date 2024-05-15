import React from 'react';
import { NewPartialPaletteConfig } from '@cbhq/cds-common';
import { useToggler } from '@cbhq/cds-common/hooks/useToggler';
import { switchControlPalette } from '@cbhq/cds-common/palette/constants';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Switch } from '../Switch';

const customPalette: NewPartialPaletteConfig = {
  light: { ...switchControlPalette.light, primary: 'pink60' },
  dark: { ...switchControlPalette.dark, primary: 'pink60' },
};

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
          const [isChecked, { toggle }] = useToggler();
          return (
            <Switch checked={isChecked} onChange={toggle} switchPaletteOverrides={customPalette}>
              Default
            </Switch>
          );
        }}
      </Example>
    </ExampleScreen>
  );
};

export default SwitchScreen;
