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
          <Pressable backgroundColor="background">
            <TextBody>Default background</TextBody>
          </Pressable>
        </Box>

        <Box spacing={1} background="backgroundOverlay">
          <Pressable backgroundColor="backgroundAlternate">
            <TextBody>Other background</TextBody>
          </Pressable>
        </Box>

        <Box spacing={1}>
          <Pressable
            backgroundColor="background"
            borderColor="primary"
            borderRadius="pill"
            borderWidth="button"
          >
            <TextBody>With border</TextBody>
          </Pressable>
        </Box>
      </Example>

      <Example title="Pressable (opacity only)">
        <Box spacing={1}>
          <PressableOpacity>
            <TextBody>Default background</TextBody>
          </PressableOpacity>
        </Box>

        <Box spacing={1} background="backgroundOverlay">
          <PressableOpacity>
            <TextBody>Other background</TextBody>
          </PressableOpacity>
        </Box>
      </Example>
    </ExampleScreen>
  );
};

export default PressableScreen;
