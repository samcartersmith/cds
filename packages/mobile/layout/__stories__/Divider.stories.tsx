import React from 'react';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Box } from '../Box';
import { Divider } from '../Divider';
import { HStack } from '../HStack';

const DividerScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Horizontal & light">
        <Divider color="line" direction="horizontal" />
      </Example>

      <Example title="Vertical & heavy">
        <HStack>
          <Box height={100} width={100} background="backgroundAlternate" />
          <Divider color="lineHeavy" direction="vertical" />
          <Box height={100} width={100} background="backgroundAlternate" />
        </HStack>
      </Example>
    </ExampleScreen>
  );
};

export default DividerScreen;
