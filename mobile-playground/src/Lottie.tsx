import React from 'react';

import * as animations from '@cbhq/cds-lottie-files';
import { ThemeProvider, Box, TextBody } from '@cbhq/cds-mobile';
import { Lottie } from '@cbhq/cds-mobile/Lottie';

import Example from './internal/Example';
import Screen from './internal/Screen';

const LottieScreen = () => {
  return (
    <Screen>
      <Example>
        <ThemeProvider>
          <Box spacing={1}>
            {Object.entries(animations).map(([name, source]) => (
              <Box key={name} width={200}>
                <TextBody>{name}</TextBody>
                <Lottie autoplay loop source={source} width={200} height={200} />
              </Box>
            ))}
          </Box>
        </ThemeProvider>
      </Example>
    </Screen>
  );
};

export default LottieScreen;
