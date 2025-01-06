import React from 'react';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { TextBody } from '../../typography/TextBody';
import { Box } from '../Box';
import { OverflowGradient } from '../OverflowGradient';

const BoxScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Backgrounds">
        <Box padding={1}>
          <TextBody>Default background</TextBody>
        </Box>

        <Box background="backgroundAlternate" padding={1}>
          <TextBody>Alternate background</TextBody>
        </Box>

        <Box background="backgroundOverlay" padding={1}>
          <TextBody>Overlay background</TextBody>
        </Box>

        <Box background="backgroundPrimary" padding={1}>
          <TextBody>Primary background</TextBody>
        </Box>

        <Box background="backgroundSecondary" padding={1}>
          <TextBody>Secondary background</TextBody>
        </Box>

        <Box background="backgroundPositive" padding={1}>
          <TextBody>Positive background</TextBody>
        </Box>

        <Box background="backgroundNegative" padding={1}>
          <TextBody>Negative background</TextBody>
        </Box>
      </Example>

      <Example title="Borders">
        <Box bordered padding={1}>
          <TextBody>With borders</TextBody>
        </Box>

        <Box bordered borderRadius={200} padding={1}>
          <TextBody>With rounded borders</TextBody>
        </Box>

        <Box background="backgroundAlternate" borderRadius={200} padding={1}>
          <TextBody>With rounded corners</TextBody>
        </Box>
      </Example>

      <Example title="Elevation">
        <Box elevation={1} padding={1}>
          <TextBody>Level 1</TextBody>
        </Box>

        <Box borderRadius={200} elevation={2} padding={1}>
          <TextBody>Level 2</TextBody>
        </Box>
      </Example>

      <Example title="Dimensions">
        <Box background="backgroundAlternate" padding={1} width="50%">
          <TextBody>Custom width</TextBody>
        </Box>

        <Box background="backgroundAlternate" height={100} padding={1}>
          <TextBody>Custom height</TextBody>
        </Box>
      </Example>

      <Example title="Overflow Gradient">
        <Box alignItems="flex-end" background="backgroundAlternate" padding={1}>
          <TextBody>
            Some large text that should fill the screen so we can see the gradient
          </TextBody>
          <OverflowGradient />
        </Box>
      </Example>

      <Example title="Opacity">
        <Box background="backgroundAlternate" opacity={0.1} padding={1}>
          <TextBody>Custom Opacity</TextBody>
        </Box>

        <Box background="backgroundAlternate" opacity={0.5} padding={1}>
          <TextBody>Custom Opacity</TextBody>
        </Box>
      </Example>

      <Example title="Spacing">
        <Box background="backgroundAlternate" padding={3}>
          <TextBody>All sides</TextBody>
        </Box>

        <Box
          background="backgroundAlternate"
          paddingBottom={3}
          paddingLeft={4}
          paddingRight={2}
          paddingTop={1}
        >
          <TextBody>Custom sides</TextBody>
        </Box>

        <Box background="backgroundAlternate" paddingY={3}>
          <TextBody>Vertical only</TextBody>
        </Box>

        <Box background="backgroundAlternate" paddingX={3}>
          <TextBody>Horizontal only</TextBody>
        </Box>
      </Example>

      <Example title="Offset">
        <Box background="backgroundAlternate" padding={5}>
          <Box background="background" margin={-3}>
            <TextBody>All sides</TextBody>
          </Box>
        </Box>

        <Box background="backgroundAlternate" padding={5}>
          <Box
            background="background"
            marginBottom={-3}
            marginLeft={-4}
            marginRight={-2}
            marginTop={-1}
          >
            <TextBody>Custom sides</TextBody>
          </Box>
        </Box>

        <Box background="backgroundAlternate" padding={5}>
          <Box background="background" marginY={-3}>
            <TextBody>Vertical only</TextBody>
          </Box>
        </Box>

        <Box background="backgroundAlternate" padding={5}>
          <Box background="background" marginX={-3}>
            <TextBody>Horizontal only</TextBody>
          </Box>
        </Box>
      </Example>

      <Example title="Positioning">
        <Box background="backgroundAlternate" height={100} padding={1}>
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
