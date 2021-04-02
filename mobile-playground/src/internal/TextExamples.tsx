import { Box } from '@cbhq/cds-mobile/layout/Box';
import { TextLabel1 } from '@cbhq/cds-mobile/typography';
import { TextProps } from '@cbhq/cds-mobile/typography/createText';

import Example from './Example';
import Screen from './Screen';

const TextExamplesScreen = ({ component: Text }: { component: React.ComponentType<TextProps> }) => {
  return (
    <Screen>
      <Example title="Colors">
        <Box>
          <Text>Default foreground</Text>
        </Box>

        <Box>
          <Text color="foregroundMuted">Muted foreground</Text>
        </Box>

        <Box>
          <Text color="primary">Primary foreground</Text>
        </Box>

        <Box spacing={1} background="primary">
          <Text color="primaryForeground">Foreground ON primary</Text>
        </Box>

        <Box spacing={1} background="secondary">
          <Text color="secondaryForeground">Foreground ON secondary</Text>
        </Box>

        <Box>
          <Text color="positive">Positive foreground</Text>
        </Box>

        <Box spacing={1} background="positive">
          <Text color="positiveForeground">Foreground ON positive</Text>
        </Box>

        <Box>
          <Text color="negative">Negative foreground</Text>
        </Box>

        <Box spacing={1} background="negative">
          <Text color="negativeForeground">Foreground ON negative</Text>
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
          <Text transform="uppercase">Uppercased text</Text>
        </Box>

        <Box>
          <Text transform="lowercase">Lowercased text</Text>
        </Box>

        <Box>
          <Text transform="capitalize">Capitalized text</Text>
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
          <Text slashedZero>$1,305.00</Text>
        </Box>
      </Example>

      <Example title="Tabular numbers">
        <Box>
          <Text tabularNumbers>91.23450</Text>
          <Text tabularNumbers>11.98762</Text>
        </Box>
      </Example>
    </Screen>
  );
};

export default TextExamplesScreen;
