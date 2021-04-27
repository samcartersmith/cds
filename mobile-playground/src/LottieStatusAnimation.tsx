import { useState, useMemo } from 'react';

import { LottieStatusAnimationType, join } from '@cbhq/cds-common';
import { LottieStatusAnimation } from '@cbhq/cds-mobile/animation/LottieStatusAnimation';
import { Button } from '@cbhq/cds-mobile/buttons/Button';
import { HStack } from '@cbhq/cds-mobile/layout/HStack';
import { Spacer } from '@cbhq/cds-mobile/layout/Spacer';

import Example from './internal/Example';
import ExamplesScreen from './internal/ExamplesScreen';

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
    <ExamplesScreen>
      <Example>
        <LottieStatusAnimation key={status} height={250} status={status} />
        <HStack>{buttons}</HStack>
      </Example>
    </ExamplesScreen>
  );
};

export default LottieStatusAnimationScreen;
