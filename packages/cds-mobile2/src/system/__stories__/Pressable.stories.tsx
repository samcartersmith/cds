import React from 'react';
import { type ThemeVars } from '@cbhq/cds-common2/core/theme';
import { getAccessibleColor } from '@cbhq/cds-common2/utils/getAccessibleColor';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { useTheme } from '../../hooks/useTheme';
import { VStack } from '../../layout';
import { Box } from '../../layout/Box';
import { TextBody } from '../../typography/TextBody';
import { Pressable } from '../Pressable';
import { PressableOpacity } from '../PressableOpacity';

const PressableScreen = () => {
  const theme = useTheme();
  return (
    <ExampleScreen>
      <Example title="Pressable">
        <Box padding={1}>
          <Pressable accessibilityRole="button" background="bg">
            <TextBody>Default background</TextBody>
          </Pressable>
        </Box>

        <Box background="bgOverlay" padding={1}>
          <Pressable accessibilityRole="button" background="bgAlternate">
            <TextBody>Other background</TextBody>
          </Pressable>
        </Box>

        <Box padding={1}>
          <Pressable
            accessibilityRole="button"
            background="bg"
            borderColor="bgPrimary"
            borderRadius={400}
            borderWidth={100}
          >
            <TextBody>With border</TextBody>
          </Pressable>
        </Box>
        <Box padding={1}>
          <Pressable
            accessibilityRole="button"
            background="bgPrimary"
            borderRadius={400}
            borderWidth={100}
          >
            <TextBody color="fgInverse">Primary</TextBody>
          </Pressable>
        </Box>
        <Box padding={1}>
          <Pressable
            loading
            accessibilityRole="button"
            background="bgPrimary"
            borderRadius={400}
            borderWidth={100}
          >
            <TextBody color="fgInverse">Primary + Loading</TextBody>
          </Pressable>
        </Box>
      </Example>

      <Example title="Pressable (opacity only)">
        <Box padding={1}>
          <Pressable accessibilityRole="button" background="transparent">
            <TextBody>Default background</TextBody>
          </Pressable>
        </Box>

        <Box background="bgOverlay" padding={1}>
          <Pressable accessibilityRole="button" background="transparent">
            <TextBody>Other background</TextBody>
          </Pressable>
        </Box>
      </Example>
      <Example title="Pressable transparentWhileInactive">
        <Box padding={1}>
          <Pressable transparentWhileInactive accessibilityRole="button" background="bgPrimary">
            <TextBody>Default background</TextBody>
          </Pressable>
        </Box>

        <Box background="bgOverlay" padding={1}>
          <Pressable transparentWhileInactive accessibilityRole="button" background="bgPrimary">
            <TextBody>Other background</TextBody>
          </Pressable>
        </Box>
      </Example>
      <Example title="Pressable variants">
        <VStack gap={2}>
          {Object.entries(theme.color).map(([color, value]) => {
            let textColor = getAccessibleColor({ background: value });
            if (color === 'currentColor')
              textColor = theme.colorScheme === 'dark' ? '#ffffff' : '#000000';
            return (
              <Pressable
                key={color}
                accessibilityRole="button"
                background={color as ThemeVars.Color}
              >
                <TextBody dangerouslySetColor={textColor} padding={1}>
                  {color}
                </TextBody>
              </Pressable>
            );
          })}
        </VStack>
      </Example>
      <Example title="Pressable variants with disabled">
        <VStack gap={2}>
          {Object.entries(theme.color).map(([color, value]) => {
            let textColor = getAccessibleColor({ background: value });
            if (color === 'currentColor')
              textColor = theme.colorScheme === 'dark' ? '#ffffff' : '#000000';
            return (
              <Pressable
                key={color}
                disabled
                accessibilityRole="button"
                background={color as ThemeVars.Color}
              >
                <TextBody dangerouslySetColor={textColor} padding={1}>
                  {color}
                </TextBody>
              </Pressable>
            );
          })}
        </VStack>
      </Example>
    </ExampleScreen>
  );
};

export default PressableScreen;
