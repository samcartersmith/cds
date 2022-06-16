import React from 'react';
import {
  CreateHintMotionProps,
  hintMotionBuilder,
} from '@cbhq/cds-common/internal/hintMotionBuilder';

import { Button } from '../../buttons';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Box, VStack } from '../../layout';
import { TextBody } from '../../typography';
import { ColorSurge as ColorSurgeComponent } from '../ColorSurge';
import { Shake as ShakeComponent } from '../Shake';

const { ColorSurge, Shake } = hintMotionBuilder({
  VStack,
  Button,
  Box,
  TextBody,
  ColorSurge: ColorSurgeComponent,
  Shake: ShakeComponent,
} as CreateHintMotionProps);

const HintMotionScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Color Surge">
        <ColorSurge />
      </Example>
      <Example title="Shake">
        <Shake />
      </Example>
    </ExampleScreen>
  );
};

export default HintMotionScreen;
