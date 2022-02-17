import React, { useCallback, useState } from 'react';
import { gutter } from '@cbhq/cds-common/tokens/sizing';
import { TabIndicator } from '../TabIndicator';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { VStack } from '../../layout';
import { Button } from '../../buttons';

const getRandomNumber = () => Math.random() * 100 + 100;
const TabIndicatorScreen = () => {
  const [width, setWidth] = useState(120);
  const [x, setX] = useState(120);

  const handlePress = useCallback(() => {
    setWidth(getRandomNumber());
    setX(getRandomNumber());
  }, []);

  return (
    <ExampleScreen>
      <Example title="Tab Indicator" spacing={gutter} overflow="visible">
        <VStack gap={2}>
          <Button onPress={handlePress}>Randomize</Button>
          <TabIndicator width={width} x={x} />
        </VStack>
      </Example>
    </ExampleScreen>
  );
};

export default TabIndicatorScreen;
