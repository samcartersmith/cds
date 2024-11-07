import React from 'react';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { TextBody } from '../../typography/TextBody';
import { Box } from '../Box';

const BoxScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Backgrounds">
        <Box spacing={1}>
          <TextBody>Default background</TextBody>
        </Box>

        <Box background="backgroundAlternate" spacing={1}>
          <TextBody>Alternate background</TextBody>
        </Box>

        <Box background="backgroundOverlay" spacing={1}>
          <TextBody>Overlay background</TextBody>
        </Box>

        <Box background="primary" spacing={1}>
          <TextBody>Primary background</TextBody>
        </Box>

        <Box background="secondary" spacing={1}>
          <TextBody>Secondary background</TextBody>
        </Box>

        <Box background="positive" spacing={1}>
          <TextBody>Positive background</TextBody>
        </Box>

        <Box background="negative" spacing={1}>
          <TextBody>Negative background</TextBody>
        </Box>
      </Example>

      <Example title="Borders">
        <Box bordered spacing={1}>
          <TextBody>With borders</TextBody>
        </Box>

        <Box bordered borderRadius="rounded" spacing={1}>
          <TextBody>With rounded borders</TextBody>
        </Box>

        <Box background="backgroundAlternate" borderRadius="rounded" spacing={1}>
          <TextBody>With rounded corners</TextBody>
        </Box>
      </Example>

      <Example title="Elevation">
        <Box elevation={1} spacing={1}>
          <TextBody>Level 1</TextBody>
        </Box>

        <Box borderRadius="rounded" elevation={2} spacing={1}>
          <TextBody>Level 2</TextBody>
        </Box>
      </Example>

      <Example title="Dimensions">
        <Box background="backgroundAlternate" spacing={1} width="50%">
          <TextBody>Custom width</TextBody>
        </Box>

        <Box background="backgroundAlternate" height={100} spacing={1}>
          <TextBody>Custom height</TextBody>
        </Box>
      </Example>

      <Example title="Overflow Gradient">
        <Box alignItems="flex-end" background="backgroundAlternate" overflow="gradient" spacing={1}>
          <TextBody>
            Some large text that should fill the screen so we can see the gradient
          </TextBody>
        </Box>
      </Example>

      <Example title="Opacity">
        <Box background="backgroundAlternate" opacity={0.1} spacing={1}>
          <TextBody>Custom Opacity</TextBody>
        </Box>

        <Box background="backgroundAlternate" opacity={0.5} spacing={1}>
          <TextBody>Custom Opacity</TextBody>
        </Box>
      </Example>

      <Example title="Spacing">
        <Box background="backgroundAlternate" spacing={3}>
          <TextBody>All sides</TextBody>
        </Box>

        <Box
          background="backgroundAlternate"
          spacingBottom={3}
          spacingEnd={2}
          spacingStart={4}
          spacingTop={1}
        >
          <TextBody>Custom sides</TextBody>
        </Box>

        <Box background="backgroundAlternate" spacingVertical={3}>
          <TextBody>Vertical only</TextBody>
        </Box>

        <Box background="backgroundAlternate" spacingHorizontal={3}>
          <TextBody>Horizontal only</TextBody>
        </Box>
      </Example>

      <Example title="Offset">
        <Box background="backgroundAlternate" spacing={5}>
          <Box background offset={3}>
            <TextBody>All sides</TextBody>
          </Box>
        </Box>

        <Box background="backgroundAlternate" spacing={5}>
          <Box background offsetBottom={3} offsetEnd={2} offsetStart={4} offsetTop={1}>
            <TextBody>Custom sides</TextBody>
          </Box>
        </Box>

        <Box background="backgroundAlternate" spacing={5}>
          <Box background offsetVertical={3}>
            <TextBody>Vertical only</TextBody>
          </Box>
        </Box>

        <Box background="backgroundAlternate" spacing={5}>
          <Box background offsetHorizontal={3}>
            <TextBody>Horizontal only</TextBody>
          </Box>
        </Box>
      </Example>

      <Example title="Positioning">
        <Box background="backgroundAlternate" height={100} spacing={1}>
          <TextBody>Relative parent</TextBody>

          <Box bottom={16} position="absolute" right={8}>
            <TextBody>Absolute child</TextBody>
          </Box>
        </Box>
      </Example>

      <Example title="Pinning">
        <Box background="backgroundAlternate" height={150} position="relative" width="100%">
          <Box background="backgroundOverlay" pin="top">
            <TextBody>Top from left to right</TextBody>
          </Box>
        </Box>

        <Box background="backgroundAlternate" height={150} position="relative" width="100%">
          <Box background="backgroundOverlay" pin="right">
            <TextBody>Right from top to bottom</TextBody>
          </Box>
        </Box>

        <Box background="backgroundAlternate" height={150} position="relative" width="100%">
          <Box background="backgroundOverlay" pin="bottom">
            <TextBody>Bottom from left to right</TextBody>
          </Box>
        </Box>

        <Box background="backgroundAlternate" height={150} position="relative" width="100%">
          <Box background="backgroundOverlay" pin="left">
            <TextBody>Left from top to bottom</TextBody>
          </Box>
        </Box>

        <Box background="backgroundAlternate" height={150} position="relative" width="100%">
          <Box background="backgroundOverlay" pin="all">
            <TextBody>To all corners</TextBody>
          </Box>
        </Box>
      </Example>
    </ExampleScreen>
  );
};

export default BoxScreen;
