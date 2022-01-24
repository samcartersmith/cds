import React from 'react';
import * as animations from '@cbhq/cds-lottie-files';

import { Box } from '../../layout/Box';
import { TextBody } from '../../typography/TextBody';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';

import { Lottie } from '../Lottie';

const LottieScreen = () => {
  return (
    <ExampleScreen>
      <Example>
        <Box spacing={1}>
          {Object.entries(animations).map(([name, source]) => (
            <Box key={name} width={200}>
              <TextBody>{name}</TextBody>
              <Lottie autoplay loop source={source} width={200} height={200} />
            </Box>
          ))}
        </Box>
      </Example>
    </ExampleScreen>
  );
};

export default LottieScreen;
