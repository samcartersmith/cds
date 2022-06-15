import React from 'react';
import {
  colorSurgeBuilder,
  CreateColorSurgeProps,
} from '@cbhq/cds-common/internal/hintMotionBuilder';

import { Button } from '../../buttons';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Box, VStack } from '../../layout';
import { TextBody } from '../../typography';
import { ColorSurge as ColorSurgeComponent } from '../ColorSurge';

const { ColorSurge } = colorSurgeBuilder({
  VStack,
  Button,
  Box,
  ColorSurge: ColorSurgeComponent,
  TextBody,
} as CreateColorSurgeProps);

const HintMotionScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Color Surge">
        <ColorSurge />
      </Example>
    </ExampleScreen>
  );
};

export default HintMotionScreen;
