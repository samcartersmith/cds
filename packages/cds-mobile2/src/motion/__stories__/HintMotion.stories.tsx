import React from 'react';
import {
  CreateHintMotionProps,
  hintMotionBuilder,
} from '@cbhq/cds-common2/internal/hintMotionBuilder';

import { Button } from '../../buttons';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Box, VStack } from '../../layout';
import { TextBody } from '../../typography';
import { ColorSurge as ColorSurgeComponent } from '../ColorSurge';
import { Pulse as PulseComponent } from '../Pulse';
import { Shake as ShakeComponent } from '../Shake';

const { ColorSurge, Shake, Pulse } = hintMotionBuilder({
  VStack,
  Button,
  Box,
  TextBody,
  ColorSurge: ColorSurgeComponent,
  Shake: ShakeComponent,
  Pulse: PulseComponent,
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
      <Example title="Pulse">
        <Pulse />
      </Example>
    </ExampleScreen>
  );
};

export default HintMotionScreen;
