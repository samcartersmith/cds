import React from 'react';
import { illustrationBuilder } from '@cbhq/cds-common/internal/illustrationBuilder';

import { Box } from '../../layout/Box';
import { HStack } from '../../layout/HStack';
import { VStack } from '../../layout/VStack';
import { TextLabel1 } from '../../typography/TextLabel1';

import { HeroSquare } from '../HeroSquare';
import { Pictogram } from '../Pictogram';
import { SpotRectangle } from '../SpotRectangle';
import { SpotSquare } from '../SpotSquare';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';

const { ListSpotSquares } = illustrationBuilder(
  Pictogram,
  SpotSquare,
  SpotRectangle,
  HeroSquare,
  HStack,
  VStack,
  Box,
  TextLabel1,
);

const SpotSquaresStory = () => {
  return (
    <ExampleScreen>
      <Example title="Illustration - HeroSquare">
        <ListSpotSquares />
      </Example>
    </ExampleScreen>
  );
};

export default SpotSquaresStory;
