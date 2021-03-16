import React from 'react';

import { Divider } from '@cbhq/cds-mobile/layout/Divider';

import Example from './internal/Example';
import Screen from './internal/Screen';

const DividerScreen = () => {
  return (
    <Screen>
      <Example title="Horizontal & light">
        <Divider color="line" direction="horizontal" />
      </Example>

      <Example title="Vertical & heavy">
        <Divider color="lineHeavy" direction="vertical" />
      </Example>
    </Screen>
  );
};

export default DividerScreen;
