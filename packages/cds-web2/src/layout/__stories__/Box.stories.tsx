import React, { Fragment } from 'react';
import { ThemeVars } from '@cbhq/cds-common2/core/theme';

import { borderRadius } from '../../styles/styles';
import { TextBody, TextTitle4 } from '../../typography';
import { Box } from '../Box';
import { VStack } from '../VStack';

const Lipsum = ({ color }: { color?: ThemeVars.Color }) => (
  <TextBody as="p" color={color}>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris molestie tellus quis sem
    suscipit molestie. In tincidunt hendrerit lectus fermentum euismod. Fusce interdum mollis
    sodales. Aenean ac nibh eu velit condimentum laoreet quis in enim. Sed ut massa at purus auctor
    convallis. Donec imperdiet posuere felis non luctus. Duis molestie at leo ac commodo. Fusce
    facilisis lacus ac urna tempus, a dictum nibh ornare. In facilisis ipsum tempus velit consequat
    lobortis.
  </TextBody>
);

export const Default = () => (
  <Box background="backgroundAlternate" padding={0.5}>
    <Lipsum />
  </Box>
);

export const Elevation = () => (
  <Box elevation={0}>
    <Lipsum />
  </Box>
);

export const Elevation1 = () => (
  <Box elevation={1}>
    <Lipsum />
  </Box>
);

export const Elevation2 = () => (
  <Box elevation={2}>
    <Lipsum />
  </Box>
);

export const Opacity = () => (
  <Box opacity={0.1}>
    <Lipsum />
  </Box>
);
//  This is just testing opacity so color contrast failure is expected
Opacity.parameters = { a11y: { config: { rules: [{ id: 'color-contrast', enabled: false }] } } };

export const FlexControls = () => (
  <Box alignContent="center" alignItems="center" flexDirection="row" justifyContent="space-between">
    <Box alignSelf="flex-end" background="backgroundPositive" padding={1}>
      <Lipsum color="textForegroundInverse" />
    </Box>
    <Box background="backgroundAlternate" padding={1} width="30%">
      <Lipsum />
    </Box>
    <Box background="backgroundOverlay" flexGrow={1} padding={1}>
      <Lipsum />
    </Box>
  </Box>
);

export const AlternateBackground = () => (
  <Box background="backgroundAlternate" padding={2}>
    <Lipsum />
  </Box>
);

export const OverlayBackground = () => (
  <Box background="backgroundOverlay" padding={2}>
    <Lipsum />
  </Box>
);

export const PrimaryBackground = () => (
  <Box background="backgroundPrimary" padding={2}>
    <Lipsum color="textForegroundInverse" />
  </Box>
);

export const SecondaryBackground = () => (
  <Box background="backgroundSecondary" padding={2}>
    <Lipsum color="textForeground" />
  </Box>
);

export const PositiveBackground = () => (
  <Box background="backgroundPositive" padding={2}>
    <Lipsum color="textForegroundInverse" />
  </Box>
);

export const NegativeBackground = () => (
  <Box background="backgroundNegative" padding={2}>
    <Lipsum color="textForegroundInverse" />
  </Box>
);

export const Bordered = () => (
  <Box bordered padding={2}>
    <Lipsum />
  </Box>
);

export const BorderedAndRounded = () => (
  <Box bordered borderRadius={200} padding={2}>
    <Lipsum />
  </Box>
);

export const RoundedVariations = () => (
  <VStack gap={1}>
    {Object.entries(borderRadius).map(([key]) => {
      return (
        <Fragment key={key}>
          <TextTitle4 as="p">{key}</TextTitle4>
          <Box
            background="backgroundAlternate"
            borderRadius={Number(key) as ThemeVars.BorderRadius}
            padding={2}
          >
            <VStack gap={1}>
              <Lipsum />
            </VStack>
          </Box>
        </Fragment>
      );
    })}
  </VStack>
);

export const Spacing = () => (
  <Box background="backgroundAlternate" padding={3}>
    <TextBody as="p">All sides</TextBody>
  </Box>
);

export const CustomSpacing = () => (
  <Box
    background="backgroundAlternate"
    paddingBottom={3}
    paddingLeft={4}
    paddingRight={2}
    paddingTop={1}
  >
    <TextBody as="p">Custom sides</TextBody>
  </Box>
);

export const VerticalSpacing = () => (
  <Box background="backgroundAlternate" paddingY={3}>
    <TextBody as="p">Vertical only</TextBody>
  </Box>
);

export const HorizontalSpacing = () => (
  <Box background="backgroundAlternate" paddingX={3}>
    <TextBody as="p">Horizontal only</TextBody>
  </Box>
);

export const Offset = () => (
  <Box background="backgroundAlternate" padding={5}>
    <Box margin={-3}>
      <TextBody as="p">All sides</TextBody>
    </Box>
  </Box>
);

export const CustomOffset = () => (
  <Box background="backgroundAlternate" padding={5}>
    <Box background="background" marginBottom={-3} marginLeft={-4} marginRight={-2} marginTop={-1}>
      <TextBody as="p">Custom sides</TextBody>
    </Box>
  </Box>
);

export const VerticalOffset = () => (
  <Box background="backgroundAlternate" padding={5}>
    <Box background="background" marginY={-3}>
      <TextBody as="p">Vertical only</TextBody>
    </Box>
  </Box>
);

export const HorizontalOffset = () => (
  <Box background="backgroundAlternate" padding={5}>
    <Box background="background" marginX={-3}>
      <TextBody as="p">Horizontal only</TextBody>
    </Box>
  </Box>
);

export const Positioned = () => (
  <Box background="backgroundAlternate" height="300px" padding={1} position="relative" width="100%">
    <Box bottom="15px" padding={1} position="absolute" right="15px" width="45%">
      <Lipsum />
    </Box>
  </Box>
);

export const TopPin = () => (
  <Box background="backgroundAlternate" height={250} position="relative" width="100%">
    <Box background="backgroundOverlay" left={0} pin="top">
      <TextBody as="p">Top from left to right</TextBody>
    </Box>
  </Box>
);

export const RightPin = () => (
  <Box background="backgroundAlternate" height={250} position="relative" width="100%">
    <Box background="backgroundOverlay" pin="right">
      <TextBody as="p"> Right from top to bottom</TextBody>
    </Box>
  </Box>
);

export const BottomPin = () => (
  <Box background="backgroundAlternate" height={250} position="relative" width="100%">
    <Box background="backgroundOverlay" pin="bottom">
      <TextBody as="p">Bottom from left to right</TextBody>
    </Box>
  </Box>
);

export const LeftPin = () => (
  <Box background="backgroundAlternate" height={250} position="relative" width="100%">
    <Box background="backgroundOverlay" pin="left">
      <TextBody as="p">Left from top to bottom</TextBody>
    </Box>
  </Box>
);

export const AllPin = () => (
  <Box background="backgroundAlternate" height={250} position="relative" width="100%">
    <Box background="backgroundOverlay" pin="all">
      <TextBody as="p">To all corners</TextBody>
    </Box>
  </Box>
);

export default {
  title: 'Core Components/Box (tsx)',
  component: Box,
};
