import React from 'react';

import { Box, TextBody } from '@cds/mobile';

import Example from './internal/Example';
import Screen from './internal/Screen';

const BoxScreen = () => {
  return (
    <Screen>
      <Example title="Backgrounds">
        <Box spacing={1}>
          <TextBody>Default background</TextBody>
        </Box>

        <Box spacing={1} background="backgroundAlternate">
          <TextBody>Alternate background</TextBody>
        </Box>

        <Box spacing={1} background="backgroundOverlay">
          <TextBody>Overlay background</TextBody>
        </Box>

        <Box spacing={1} background="primary">
          <TextBody>Primary background</TextBody>
        </Box>

        <Box spacing={1} background="secondary">
          <TextBody>Secondary background</TextBody>
        </Box>

        <Box spacing={1} background="positive">
          <TextBody>Positive background</TextBody>
        </Box>

        <Box spacing={1} background="negative">
          <TextBody>Negative background</TextBody>
        </Box>
      </Example>

      <Example title="Borders">
        <Box spacing={1} bordered>
          <TextBody>With borders</TextBody>
        </Box>

        <Box spacing={1} bordered rounded>
          <TextBody>With rounded borders</TextBody>
        </Box>

        <Box spacing={1} rounded background="backgroundAlternate">
          <TextBody>With rounded corners</TextBody>
        </Box>
      </Example>

      <Example title="Elevation">
        <Box spacing={1} elevation={1}>
          <TextBody>Level 1</TextBody>
        </Box>

        <Box spacing={1} elevation={2}>
          <TextBody>Level 2</TextBody>
        </Box>
      </Example>

      <Example title="Dimensions">
        <Box spacing={1} width="50%" background="backgroundAlternate">
          <TextBody>Custom width</TextBody>
        </Box>

        <Box spacing={1} height={100} background="backgroundAlternate">
          <TextBody>Custom height</TextBody>
        </Box>
      </Example>

      <Example title="Spacing">
        <Box spacing={3} background="backgroundAlternate">
          <TextBody>All sides</TextBody>
        </Box>

        <Box
          spacingTop={1}
          spacingEnd={2}
          spacingBottom={3}
          spacingStart={4}
          background="backgroundAlternate"
        >
          <TextBody>Custom sides</TextBody>
        </Box>

        <Box spacingVertical={3} background="backgroundAlternate">
          <TextBody>Vertical only</TextBody>
        </Box>

        <Box spacingHorizontal={3} background="backgroundAlternate">
          <TextBody>Horizontal only</TextBody>
        </Box>
      </Example>

      <Example title="Positioning">
        <Box spacing={1} height={100} background="backgroundAlternate">
          <TextBody>Relative parent</TextBody>

          <Box position="absolute" right={8} bottom={16}>
            <TextBody>Absolute child</TextBody>
          </Box>
        </Box>
      </Example>
    </Screen>
  );
};

export default BoxScreen;
