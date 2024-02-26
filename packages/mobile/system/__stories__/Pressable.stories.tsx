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
        <Box spacing={1}>
          <Pressable accessibilityRole="button" background="background">
            <TextBody>Default background</TextBody>
          </Pressable>
        </Box>

        <Box background="backgroundOverlay" spacing={1}>
          <Pressable accessibilityRole="button" background="backgroundAlternate">
            <TextBody>Other background</TextBody>
          </Pressable>
        </Box>

        <Box spacing={1}>
          <Pressable
            accessibilityRole="button"
            background="background"
            borderColor="primary"
            borderRadius="roundedLarge"
            borderWidth="button"
          >
            <TextBody>With border</TextBody>
          </Pressable>
        </Box>
        <Box spacing={1}>
          <Pressable
            accessibilityRole="button"
            background="primary"
            borderRadius="roundedLarge"
            borderWidth="button"
          >
            <TextBody color="negativeForeground">Primary</TextBody>
          </Pressable>
        </Box>
        <Box spacing={1}>
          <Pressable
            loading
            accessibilityRole="button"
            background="primary"
            borderRadius="roundedLarge"
            borderWidth="button"
          >
            <TextBody color="negativeForeground">Primary + Loading</TextBody>
          </Pressable>
        </Box>
      </Example>

      <Example title="Pressable (opacity only)">
        <Box spacing={1}>
          <PressableOpacity>
            <TextBody>Default background</TextBody>
          </PressableOpacity>
        </Box>

        <Box background="backgroundOverlay" spacing={1}>
          <PressableOpacity>
            <TextBody>Other background</TextBody>
          </PressableOpacity>
        </Box>
      </Example>
      <Example title="Pressable transparentWhileInactive">
        <Box spacing={1}>
          <Pressable transparentWhileInactive accessibilityRole="button" background="primary">
            <TextBody>Default background</TextBody>
          </Pressable>
        </Box>

        <Box background="backgroundOverlay" spacing={1}>
          <Pressable transparentWhileInactive accessibilityRole="button" background="primary">
            <TextBody>Other background</TextBody>
          </Pressable>
        </Box>
      </Example>
    </ExampleScreen>
  );
};

export default PressableScreen;
