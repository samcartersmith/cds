import React from 'react';
import * as animations from '@cbhq/cds-lottie-files';
import { Lottie } from '@cbhq/cds-mobile/animation/Lottie';
import { Box } from '@cbhq/cds-mobile/layout/Box';
import { ThemeProvider } from '@cbhq/cds-mobile/system/ThemeProvider';
import { TextBody } from '@cbhq/cds-mobile/typography/TextBody';

import Example from '../internal/Example';
import ExamplesScreen from '../internal/ExamplesScreen';

const LottieScreen = () => {
  return (
    <ExamplesScreen>
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
    </ExamplesScreen>
  );
};

export default LottieScreen;
