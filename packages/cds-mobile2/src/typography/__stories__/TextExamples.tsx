import React from 'react';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Box } from '../../layout/Box';
import { TextProps } from '../Text';

const TextExamplesScreen = ({
  component: Text,
  extraExample,
}: {
  component: React.ComponentType<React.PropsWithChildren<TextProps>>;
  extraExample?: React.ReactNode;
}) => {
  return (
    <ExampleScreen>
      <Example accessibilityRole="header" title="Mono">
        <Text mono>Mono font</Text>
      </Example>
      <Example title="Colors">
        <Box>
          <Text>Default foreground</Text>
        </Box>

        <Box>
          <Text color="fgMuted">Muted foreground</Text>
        </Box>

        <Box>
          <Text color="fgPrimary">Primary foreground</Text>
        </Box>

        <Box background="bgPrimary" padding={1}>
          <Text color="fgInverse">Foreground ON primary</Text>
        </Box>

        <Box background="bgSecondary" padding={1}>
          <Text color="fg">Foreground ON secondary</Text>
        </Box>

        <Box>
          <Text color="fgPositive">Positive foreground</Text>
        </Box>

        <Box background="bgPositive" padding={1}>
          <Text color="fgInverse">Foreground ON positive</Text>
        </Box>

        <Box>
          <Text color="fgNegative">Negative foreground</Text>
        </Box>

        <Box background="bgNegative" padding={1}>
          <Text color="fgInverse">Foreground ON negative</Text>
        </Box>
      </Example>

      <Example title="Alignment">
        <Box>
          <Text align="start">Align start</Text>
        </Box>

        <Box>
          <Text align="center">Align center</Text>
        </Box>

        <Box>
          <Text align="end">Align end</Text>
        </Box>

        <Box>
          <Text align="justify">Align justify (iOS only, will start align on Android)</Text>
        </Box>
      </Example>

      <Example title="Casing">
        <Box>
          <Text textTransform="uppercase">Uppercased text</Text>
        </Box>

        <Box>
          <Text textTransform="lowercase">Lowercased text</Text>
        </Box>

        <Box>
          <Text textTransform="capitalize">Capitalized text</Text>
        </Box>
      </Example>

      <Example title="Ellipsize">
        <Box>
          <Text ellipsize="head">
            Truncate. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eu justo
            nulla. Nam eu blandit dui, a dignissim mi.
          </Text>
        </Box>

        <Box>
          <Text ellipsize="middle">
            Truncate. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eu justo
            nulla. Nam eu blandit dui, a dignissim mi.
          </Text>
        </Box>

        <Box>
          <Text ellipsize="tail">
            Truncate. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eu justo
            nulla. Nam eu blandit dui, a dignissim mi.
          </Text>
        </Box>

        <Box>
          <Text ellipsize="clip">
            Clip. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eu justo nulla.
            Nam eu blandit dui, a dignissim mi.
          </Text>
        </Box>
      </Example>

      <Example title="Slashed zeros">
        <Box>
          <Text>$1,305.00</Text>
        </Box>
      </Example>

      <Example title="Tabular numbers">
        <Box>
          <Text tabularNumbers>91.23450</Text>
          <Text tabularNumbers>11.98762</Text>
        </Box>
      </Example>

      <Example title="Disabled">
        <Box>
          <Text disabled>Hello</Text>
        </Box>
      </Example>
      {extraExample}
    </ExampleScreen>
  );
};

export default TextExamplesScreen;
