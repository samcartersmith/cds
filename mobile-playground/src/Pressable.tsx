import { Box } from '@cbhq/cds-mobile/layout';
import { Pressable } from '@cbhq/cds-mobile/system/Pressable';
import { PressableOpacity } from '@cbhq/cds-mobile/system/PressableOpacity';
import { TextBody } from '@cbhq/cds-mobile/typography/TextBody';

import Example from './internal/Example';
import Screen from './internal/Screen';

const PressableScreen = () => {
  return (
    <Screen>
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
    </Screen>
  );
};

export default PressableScreen;
