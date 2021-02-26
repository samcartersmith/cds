import React, { useState, useMemo } from 'react';

import { LottieStatusAnimationType, join } from '@cbhq/cds-common';
import { Button, HStack, Spacer } from '@cbhq/cds-mobile';
import { LottieStatusAnimation } from '@cbhq/cds-mobile/Lottie/LottieStatusAnimation';

import Example from './internal/Example';
import Screen from './internal/Screen';

const statuses = [
  'loading',
  'success',
  'failure',
  'pending',
  'cardSuccess',
] as LottieStatusAnimationType[];

export const LottieStatusAnimationScreen = () => {
  const [status, setStatus] = useState<LottieStatusAnimationType>('loading');
  const buttons = useMemo(() => {
    return join(
      statuses.map(item => (
        <Button key={item} onPress={() => setStatus(item)}>
          {item}
        </Button>
      )),
      <Spacer />
    );
  }, []);

  return (
    <Screen>
      <Example>
        <LottieStatusAnimation key={status} height={250} status={status} />
        <HStack>{buttons}</HStack>
      </Example>
    </Screen>
  );
};

export default LottieStatusAnimationScreen;
