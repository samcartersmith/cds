import React, { useCallback, useState } from 'react';
import random from 'lodash/random';

import { Button } from '../../buttons';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { TextBody } from '../../typography';
import { AnimatedCaret } from '../AnimatedCaret';

const AnimatedCaretScreen = () => {
  const [rotate, setRotate] = useState(0);

  const handleRotate = useCallback(() => setRotate(random(0, 360)), []);

  return (
    <ExampleScreen>
      <Example title="Press to rotate">
        <Button onPress={handleRotate}>Rotate</Button>
        <TextBody>Rotate: {rotate} &#730;</TextBody>
        <AnimatedCaret rotate={rotate} size="l" />
      </Example>
    </ExampleScreen>
  );
};

export default AnimatedCaretScreen;
