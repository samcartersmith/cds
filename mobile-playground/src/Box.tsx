import React from 'react';
import { Box } from '@cbhq/cds-mobile/layout/Box';
import { TextBody } from '@cbhq/cds-mobile/typography/TextBody';

import Example from './internal/Example';
import ExamplesScreen from './internal/ExamplesScreen';

const BoxScreen = () => {
  return (
    <ExamplesScreen>
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

        <Box spacing={1} bordered borderRadius="standard">
          <TextBody>With rounded borders</TextBody>
        </Box>

        <Box spacing={1} borderRadius="standard" background="backgroundAlternate">
          <TextBody>With rounded corners</TextBody>
        </Box>
      </Example>

      <Example title="Elevation">
        <Box spacing={1} elevation={1}>
          <TextBody>Level 1</TextBody>
        </Box>

        <Box spacing={1} elevation={2} borderRadius="standard">
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

      <Example title="Offset">
        <Box spacing={5} background="backgroundAlternate">
          <Box offset={3} background>
            <TextBody>All sides</TextBody>
          </Box>
        </Box>

        <Box spacing={5} background="backgroundAlternate">
          <Box offsetTop={1} offsetEnd={2} offsetBottom={3} offsetStart={4} background>
            <TextBody>Custom sides</TextBody>
          </Box>
        </Box>

        <Box spacing={5} background="backgroundAlternate">
          <Box offsetVertical={3} background>
            <TextBody>Vertical only</TextBody>
          </Box>
        </Box>

        <Box spacing={5} background="backgroundAlternate">
          <Box offsetHorizontal={3} background>
            <TextBody>Horizontal only</TextBody>
          </Box>
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

      <Example title="Pinning">
        <Box width="100%" height={150} background="backgroundAlternate" position="relative">
          <Box pin="top" background="backgroundOverlay">
            <TextBody>Top from left to right</TextBody>
          </Box>
        </Box>

        <Box width="100%" height={150} background="backgroundAlternate" position="relative">
          <Box pin="right" background="backgroundOverlay">
            <TextBody>Right from top to bottom</TextBody>
          </Box>
        </Box>

        <Box width="100%" height={150} background="backgroundAlternate" position="relative">
          <Box pin="bottom" background="backgroundOverlay">
            <TextBody>Bottom from left to right</TextBody>
          </Box>
        </Box>

        <Box width="100%" height={150} background="backgroundAlternate" position="relative">
          <Box pin="left" background="backgroundOverlay">
            <TextBody>Left from top to bottom</TextBody>
          </Box>
        </Box>

        <Box width="100%" height={150} background="backgroundAlternate" position="relative">
          <Box pin="all" background="backgroundOverlay">
            <TextBody>To all corners</TextBody>
          </Box>
        </Box>
      </Example>
    </ExamplesScreen>
  );
};

export default BoxScreen;
