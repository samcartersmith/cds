import { useState } from 'react';
import { gutter } from '@cbhq/cds-common/tokens/sizing';
import { TabIndicator } from '../TabIndicator';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { VStack } from '../../layout';
import { Button } from '../../buttons';

const getRandomNumber = () => Math.random() * 100 + 100;
const TabIndicatorScreen = () => {
  const [width, setWidth] = useState(120);
  const [xPosition, setXPosition] = useState(120);

  // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
  const handlePress = () => {
    setWidth(getRandomNumber());
    setXPosition(getRandomNumber());
  };

  return (
    <ExampleScreen>
      <Example title="Tab Indicator" spacing={gutter} overflow="visible">
        <VStack gap={2}>
          <Button onPress={handlePress}>Randomize</Button>
          <TabIndicator width={width} xPosition={xPosition} />
        </VStack>
      </Example>
    </ExampleScreen>
  );
};

export default TabIndicatorScreen;
