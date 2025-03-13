import React from 'react';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Text } from '../../typography/Text';
import { Box } from '../Box';
import { OverflowGradient } from '../OverflowGradient';

const BoxScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Backgrounds">
        <Box padding={1}>
          <Text>Default background</Text>
        </Box>

        <Box background="bgAlternate" padding={1}>
          <Text>Alternate background</Text>
        </Box>

        <Box background="bgOverlay" padding={1}>
          <Text>Overlay background</Text>
        </Box>

        <Box background="bgPrimary" padding={1}>
          <Text>Primary background</Text>
        </Box>

        <Box background="bgSecondary" padding={1}>
          <Text>Secondary background</Text>
        </Box>

        <Box background="bgPositive" padding={1}>
          <Text>Positive background</Text>
        </Box>

        <Box background="bgNegative" padding={1}>
          <Text>Negative background</Text>
        </Box>
      </Example>

      <Example title="Borders">
        <Box bordered padding={1}>
          <Text>With borders</Text>
        </Box>

        <Box bordered borderRadius={200} padding={1}>
          <Text>With rounded borders</Text>
        </Box>

        <Box background="bgAlternate" borderRadius={200} padding={1}>
          <Text>With rounded corners</Text>
        </Box>
      </Example>

      <Example title="Elevation">
        <Box elevation={1} padding={1}>
          <Text>Level 1</Text>
        </Box>

        <Box borderRadius={200} elevation={2} padding={1}>
          <Text>Level 2</Text>
        </Box>
      </Example>

      <Example title="Dimensions">
        <Box background="bgAlternate" padding={1} width="50%">
          <Text>Custom width</Text>
        </Box>

        <Box background="bgAlternate" height={100} padding={1}>
          <Text>Custom height</Text>
        </Box>
      </Example>

      <Example title="Overflow Gradient">
        <Box alignItems="flex-end" background="bgAlternate" padding={1}>
          <Text>Some large text that should fill the screen so we can see the gradient</Text>
          <OverflowGradient />
        </Box>
      </Example>

      <Example title="Opacity">
        <Box background="bgAlternate" opacity={0.1} padding={1}>
          <Text>Custom Opacity</Text>
        </Box>

        <Box background="bgAlternate" opacity={0.5} padding={1}>
          <Text>Custom Opacity</Text>
        </Box>
      </Example>

      <Example title="Spacing">
        <Box background="bgAlternate" padding={3}>
          <Text>All sides</Text>
        </Box>

        <Box
          background="bgAlternate"
          paddingBottom={3}
          paddingEnd={2}
          paddingStart={4}
          paddingTop={1}
        >
          <Text>Custom sides</Text>
        </Box>

        <Box background="bgAlternate" paddingY={3}>
          <Text>Vertical only</Text>
        </Box>

        <Box background="bgAlternate" paddingX={3}>
          <Text>Horizontal only</Text>
        </Box>
      </Example>

      <Example title="Offset">
        <Box background="bgAlternate" padding={5}>
          <Box background="bg" margin={-3}>
            <Text>All sides</Text>
          </Box>
        </Box>

        <Box background="bgAlternate" padding={5}>
          <Box background="bg" marginBottom={-3} marginEnd={-2} marginStart={-4} marginTop={-1}>
            <Text>Custom sides</Text>
          </Box>
        </Box>

        <Box background="bgAlternate" padding={5}>
          <Box background="bg" marginY={-3}>
            <Text>Vertical only</Text>
          </Box>
        </Box>

        <Box background="bgAlternate" padding={5}>
          <Box background="bg" marginX={-3}>
            <Text>Horizontal only</Text>
          </Box>
        </Box>
      </Example>

      <Example title="Positioning">
        <Box background="bgAlternate" height={100} padding={1}>
          <Text>Relative parent</Text>

          <Box bottom={16} position="absolute" right={8}>
            <Text>Absolute child</Text>
          </Box>
        </Box>
      </Example>

      <Example title="Pinning">
        <Box background="bgAlternate" height={150} position="relative" width="100%">
          <Box background="bgOverlay" pin="top">
            <Text>Top from left to right</Text>
          </Box>
        </Box>

        <Box background="bgAlternate" height={150} position="relative" width="100%">
          <Box background="bgOverlay" pin="right">
            <Text>Right from top to bottom</Text>
          </Box>
        </Box>

        <Box background="bgAlternate" height={150} position="relative" width="100%">
          <Box background="bgOverlay" pin="bottom">
            <Text>Bottom from left to right</Text>
          </Box>
        </Box>

        <Box background="bgAlternate" height={150} position="relative" width="100%">
          <Box background="bgOverlay" pin="left">
            <Text>Left from top to bottom</Text>
          </Box>
        </Box>

        <Box background="bgAlternate" height={150} position="relative" width="100%">
          <Box background="bgOverlay" pin="all">
            <Text>To all corners</Text>
          </Box>
        </Box>
      </Example>
    </ExampleScreen>
  );
};

export default BoxScreen;
