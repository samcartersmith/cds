import React, { useState, useMemo, useCallback } from 'react';
import { LottieStatusAnimationType, join } from '@cbhq/cds-common';

import { Button } from '../../buttons/Button';
import { HStack } from '../../layout/HStack';
import { Spacer } from '../../layout/Spacer';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';

import { LottieStatusAnimation } from '../LottieStatusAnimation';

const statuses = [
  'loading',
  'success',
  'failure',
  'pending',
  'cardSuccess',
] as LottieStatusAnimationType[];

const LottieStatusAnimationScreen = () => {
  const [status, setStatus] = useState<LottieStatusAnimationType>('loading');
  const buttons = useMemo(() => {
    return join(
      statuses.map((item) => (
        // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
        <Button key={item} onPress={() => setStatus(item)}>
          {item}
        </Button>
      )),
      <Spacer />,
    );
  }, []);

  const [key, setKey] = useState(0);
  const handleReset = useCallback(() => {
    setKey(key + 1);
    setStatus('loading');
  }, [key]);

  return (
    <ExampleScreen>
      <Example>
        <LottieStatusAnimation key={key} height={250} status={status} />
        <HStack flexWrap="wrap">{buttons}</HStack>
        <Button variant="secondary" onPress={handleReset}>
          Reset animation
        </Button>
      </Example>
    </ExampleScreen>
  );
};

export default LottieStatusAnimationScreen;
