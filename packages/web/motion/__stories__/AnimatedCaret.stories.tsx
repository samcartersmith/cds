import { useCallback, useState } from 'react';
import random from 'lodash/random';

import { Button } from '../../buttons';
import { VStack } from '../../layout';
import { TextBody } from '../../typography';
import { AnimatedCaret } from '../AnimatedCaret';

export default {
  component: AnimatedCaret,
  title: 'Core Components/Motion/AnimatedCaret',
};

export const BasicAnimatedCaret = () => {
  const [rotate, setRotate] = useState(180);

  const handleRotate = useCallback(() => setRotate(random(0, 360)), []);

  return (
    <VStack>
      <Button onPress={handleRotate}>Rotate</Button>
      <TextBody as="p">Rotate: {rotate} &#730;</TextBody>
      <AnimatedCaret rotate={rotate} size="l" />
    </VStack>
  );
};
