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
        <Text mono font="body">
          Mono font
        </Text>
      </Example>
      <Example title="Inherited Font">
        <Box>
          {}
          <Text font="title1">
            This Text element uses one font family and the inner Text element - Hello World inherits
            it but overrides the font size
            <Text font="inherit" fontSize="legal">
              {' '}
              Hello World
            </Text>
          </Text>
        </Box>
      </Example>
      <Example title="Colors">
        <Box>
          <Text font="body">Default foreground</Text>
        </Box>

        <Box>
          <Text color="fgMuted" font="body">
            Muted foreground
          </Text>
        </Box>

        <Box>
          <Text color="fgPrimary" font="body">
            Primary foreground
          </Text>
        </Box>

        <Box background="bgPrimary" padding={1}>
          <Text color="fgInverse" font="body">
            Foreground ON primary
          </Text>
        </Box>

        <Box background="bgSecondary" padding={1}>
          <Text color="fg" font="body">
            Foreground ON secondary
          </Text>
        </Box>

        <Box>
          <Text color="fgPositive" font="body">
            Positive foreground
          </Text>
        </Box>

        <Box background="bgPositive" padding={1}>
          <Text color="fgInverse" font="body">
            Foreground ON positive
          </Text>
        </Box>

        <Box>
          <Text color="fgNegative" font="body">
            Negative foreground
          </Text>
        </Box>

        <Box background="bgNegative" padding={1}>
          <Text color="fgInverse" font="body">
            Foreground ON negative
          </Text>
        </Box>
      </Example>

      <Example title="Alignment">
        <Box>
          <Text align="start" font="body">
            Align start
          </Text>
        </Box>

        <Box>
          <Text align="center" font="body">
            Align center
          </Text>
        </Box>

        <Box>
          <Text align="end" font="body">
            Align end
          </Text>
        </Box>

        <Box>
          <Text align="justify" font="body">
            Align justify (iOS only, will start align on Android)
          </Text>
        </Box>
      </Example>

      <Example title="Casing">
        <Box>
          <Text font="body" textTransform="uppercase">
            Uppercased text
          </Text>
        </Box>

        <Box>
          <Text font="body" textTransform="lowercase">
            Lowercased text
          </Text>
        </Box>

        <Box>
          <Text font="body" textTransform="capitalize">
            Capitalized text
          </Text>
        </Box>
      </Example>

      <Example title="Ellipsize">
        <Box>
          <Text ellipsize="head" font="body">
            Truncate. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eu justo
            nulla. Nam eu blandit dui, a dignissim mi.
          </Text>
        </Box>

        <Box>
          <Text ellipsize="middle" font="body">
            Truncate. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eu justo
            nulla. Nam eu blandit dui, a dignissim mi.
          </Text>
        </Box>

        <Box>
          <Text ellipsize="tail" font="body">
            Truncate. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eu justo
            nulla. Nam eu blandit dui, a dignissim mi.
          </Text>
        </Box>

        <Box>
          <Text ellipsize="clip" font="body">
            Clip. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eu justo nulla.
            Nam eu blandit dui, a dignissim mi.
          </Text>
        </Box>
      </Example>

      <Example title="Slashed zeros">
        <Box>
          <Text font="body">$1,305.00</Text>
        </Box>
      </Example>

      <Example title="Tabular numbers">
        <Box>
          <Text tabularNumbers font="body">
            91.23450
          </Text>
          <Text tabularNumbers font="body">
            11.98762
          </Text>
        </Box>
      </Example>

      <Example title="Disabled">
        <Box>
          <Text disabled font="body">
            Hello
          </Text>
        </Box>
      </Example>
      {extraExample}
    </ExampleScreen>
  );
};

export default TextExamplesScreen;
