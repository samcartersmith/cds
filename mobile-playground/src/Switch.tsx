/* eslint-disable react-native-a11y/has-accessibility-hint */

import React from 'react';
import { useToggler } from '@cbhq/cds-common/hooks/useToggler';
import { Switch } from '@cbhq/cds-mobile/controls/Switch';

import Example from './internal/Example';
import ExamplesScreen from './internal/ExamplesScreen';

const SwitchScreen = () => {
  return (
    <ExamplesScreen>
      <Example title="Default" inline>
        {() => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const [isChecked, { toggle }] = useToggler();

          return (
            <>
              <Switch checked={isChecked} onChange={toggle}>
                Default
              </Switch>
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
          This switch has a multi-line label. The switch and label should align at the top. The
          label is super duper long and it keeps going on forever. This switch has a multi-line
          label.
        </Switch>
      </Example>
    </ExamplesScreen>
  );
};

export default SwitchScreen;
