import React from 'react';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Box } from '../../layout/Box';
import { TextBody } from '../../typography/TextBody';
import { Pressable } from '../Pressable';
import { PressableOpacity } from '../PressableOpacity';

const PressableScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Pressable">
        <Box padding={1}>
          <Pressable accessibilityRole="button" background="background">
            <TextBody>Default background</TextBody>
          </Pressable>
        </Box>

        <Box background="backgroundOverlay" padding={1}>
          <Pressable accessibilityRole="button" background="backgroundAlternate">
            <TextBody>Other background</TextBody>
          </Pressable>
        </Box>

        <Box padding={1}>
          <Pressable
            accessibilityRole="button"
            background="background"
            borderColor="backgroundPrimary"
            borderRadius={400}
            borderWidth={100}
          >
            <TextBody>With border</TextBody>
          </Pressable>
        </Box>
        <Box padding={1}>
          <Pressable
            accessibilityRole="button"
            background="backgroundPrimary"
            borderRadius={400}
            borderWidth={100}
          >
            <TextBody color="textForegroundInverse">Primary</TextBody>
          </Pressable>
        </Box>
        <Box padding={1}>
          <Pressable
            loading
            accessibilityRole="button"
            background="backgroundPrimary"
            borderRadius={400}
            borderWidth={100}
          >
            <TextBody color="textForegroundInverse">Primary + Loading</TextBody>
          </Pressable>
        </Box>
      </Example>

      <Example title="Pressable (opacity only)">
        <Box padding={1}>
          <PressableOpacity>
            <TextBody>Default background</TextBody>
          </PressableOpacity>
        </Box>

        <Box background="backgroundOverlay" padding={1}>
          <PressableOpacity>
            <TextBody>Other background</TextBody>
          </PressableOpacity>
        </Box>
      </Example>
      <Example title="Pressable transparentWhileInactive">
        <Box padding={1}>
          <Pressable
            transparentWhileInactive
            accessibilityRole="button"
            background="backgroundPrimary"
          >
            <TextBody>Default background</TextBody>
          </Pressable>
        </Box>

        <Box background="backgroundOverlay" padding={1}>
          <Pressable
            transparentWhileInactive
            accessibilityRole="button"
            background="backgroundPrimary"
          >
            <TextBody>Other background</TextBody>
          </Pressable>
        </Box>
      </Example>
    </ExampleScreen>
  );
};

export default PressableScreen;
