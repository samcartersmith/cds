import React from 'react';
import { fallbackBuilder } from '@cbhq/cds-common/internal/fallbackBuilder';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { TextBody } from '../../typography';
import { Fallback } from '../Fallback';
import { VStack } from '../VStack';

export const { Basic, RectangleWidthVariants, DangerouslySetIterations } = fallbackBuilder({
  VStack,
  Fallback,
  TextBody,
});

const FallbackScreen = () => {
  return (
    <ExampleScreen>
      <Example title="basic">
        <Basic />
      </Example>
      <Example title="Rectangle Width Variants">
        <RectangleWidthVariants />
      </Example>
      <Example title="DangerouslySetIterations">
        <DangerouslySetIterations />
      </Example>
    </ExampleScreen>
  );
};

export default FallbackScreen;
