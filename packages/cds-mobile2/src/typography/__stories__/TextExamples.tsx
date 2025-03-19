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
        <Text font="body" mono>
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
          <Text font="body" color="fgMuted">
            Muted foreground
          </Text>
        </Box>

        <Box>
          <Text font="body" color="fgPrimary">
            Primary foreground
          </Text>
        </Box>

        <Box background="bgPrimary" padding={1}>
          <Text font="body" color="fgInverse">
            Foreground ON primary
          </Text>
        </Box>

        <Box background="bgSecondary" padding={1}>
          <Text font="body" color="fg">
            Foreground ON secondary
          </Text>
        </Box>

        <Box>
          <Text font="body" color="fgPositive">
            Positive foreground
          </Text>
        </Box>

        <Box background="bgPositive" padding={1}>
          <Text font="body" color="fgInverse">
            Foreground ON positive
          </Text>
        </Box>

        <Box>
          <Text font="body" color="fgNegative">
            Negative foreground
          </Text>
        </Box>

        <Box background="bgNegative" padding={1}>
          <Text font="body" color="fgInverse">
            Foreground ON negative
          </Text>
        </Box>
      </Example>

      <Example title="Alignment">
        <Box>
          <Text font="body" align="start">
            Align start
          </Text>
        </Box>

        <Box>
          <Text font="body" align="center">
            Align center
          </Text>
        </Box>

        <Box>
          <Text font="body" align="end">
            Align end
          </Text>
        </Box>

        <Box>
          <Text font="body" align="justify">
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
          <Text font="body" ellipsize="head">
            Truncate. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eu justo
            nulla. Nam eu blandit dui, a dignissim mi.
          </Text>
        </Box>

        <Box>
          <Text font="body" ellipsize="middle">
            Truncate. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eu justo
            nulla. Nam eu blandit dui, a dignissim mi.
          </Text>
        </Box>

        <Box>
          <Text font="body" ellipsize="tail">
            Truncate. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eu justo
            nulla. Nam eu blandit dui, a dignissim mi.
          </Text>
        </Box>

        <Box>
          <Text font="body" ellipsize="clip">
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
          <Text font="body" tabularNumbers>
            91.23450
          </Text>
          <Text font="body" tabularNumbers>
            11.98762
          </Text>
        </Box>
      </Example>

      <Example title="Disabled">
        <Box>
          <Text font="body" disabled>
            Hello
          </Text>
        </Box>
      </Example>
      {extraExample}
    </ExampleScreen>
  );
};

export default TextExamplesScreen;
