import React, { Fragment } from 'react';
import { ThemeVars } from '@cbhq/cds-common2/core/theme';

import { Text, TextBody, TextTitle4 } from '../../typography';
import { Box } from '../Box';
import { VStack } from '../VStack';

export default {
  title: 'Core Components/Box (tsx)',
  component: Box,
};

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
  <Box background="bgAlternate" padding={0.5}>
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
    <Box alignSelf="flex-end" background="bgPositive" padding={1}>
      <Lipsum color="fgInverse" />
    </Box>
    <Box background="bgAlternate" padding={1} width="30%">
      <Lipsum />
    </Box>
    <Box background="bgOverlay" flexGrow={1} padding={1}>
      <Lipsum />
    </Box>
  </Box>
);

export const AlternateBackground = () => (
  <Box background="bgAlternate" padding={2}>
    <Lipsum />
  </Box>
);

export const OverlayBackground = () => (
  <Box background="bgOverlay" padding={2}>
    <Lipsum />
  </Box>
);

export const PrimaryBackground = () => (
  <Box background="bgPrimary" padding={2}>
    <Lipsum color="fgInverse" />
  </Box>
);

export const SecondaryBackground = () => (
  <Box background="bgSecondary" padding={2}>
    <Lipsum color="fg" />
  </Box>
);

export const PositiveBackground = () => (
  <Box background="bgPositive" padding={2}>
    <Lipsum color="fgInverse" />
  </Box>
);

export const NegativeBackground = () => (
  <Box background="bgNegative" padding={2}>
    <Lipsum color="fgInverse" />
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

const borderRadii: ThemeVars.BorderRadius[] = [
  0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000,
] as const;

export const RoundedVariations = () => (
  <VStack gap={1}>
    {borderRadii.map((borderRadius) => {
      return (
        <Fragment key={borderRadius}>
          <TextTitle4 as="p">{borderRadius}</TextTitle4>
          <Box background="bgAlternate" borderRadius={borderRadius} padding={2}>
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
  <Box background="bgAlternate" padding={3}>
    <TextBody as="p">All sides</TextBody>
  </Box>
);

export const CustomSpacing = () => (
  <Box background="bgAlternate" paddingBottom={3} paddingEnd={2} paddingStart={4} paddingTop={1}>
    <TextBody as="p">Custom sides</TextBody>
  </Box>
);

export const VerticalSpacing = () => (
  <Box background="bgAlternate" paddingY={3}>
    <TextBody as="p">Vertical only</TextBody>
  </Box>
);

export const HorizontalSpacing = () => (
  <Box background="bgAlternate" paddingX={3}>
    <TextBody as="p">Horizontal only</TextBody>
  </Box>
);

export const Offset = () => (
  <Box background="bgAlternate" padding={5}>
    <Box background="bg" margin={-3}>
      <TextBody as="p">All sides</TextBody>
    </Box>
  </Box>
);

export const CustomOffset = () => (
  <Box background="bgAlternate" padding={5}>
    <Box background="bg" marginBottom={-3} marginEnd={-2} marginStart={-4} marginTop={-1}>
      <TextBody as="p">Custom sides</TextBody>
    </Box>
  </Box>
);

export const VerticalOffset = () => (
  <Box background="bgAlternate" padding={5}>
    <Box background="bg" marginY={-3}>
      <TextBody as="p">Vertical only</TextBody>
    </Box>
  </Box>
);

export const HorizontalOffset = () => (
  <Box background="bgAlternate" padding={5}>
    <Box background="bg" marginX={-3}>
      <TextBody as="p">Horizontal only</TextBody>
    </Box>
  </Box>
);

export const Positioned = () => (
  <Box background="bgAlternate" height="300px" padding={1} position="relative" width="100%">
    <Box bottom="15px" padding={1} position="absolute" right="15px" width="45%">
      <Lipsum />
    </Box>
  </Box>
);

export const TopPin = () => (
  <Box background="bgAlternate" height={250} position="relative" width="100%">
    <Box background="bgOverlay" left={0} pin="top">
      <TextBody as="p">Top from left to right</TextBody>
    </Box>
  </Box>
);

export const RightPin = () => (
  <Box background="bgAlternate" height={250} position="relative" width="100%">
    <Box background="bgOverlay" pin="right">
      <TextBody as="p"> Right from top to bottom</TextBody>
    </Box>
  </Box>
);

export const BottomPin = () => (
  <Box background="bgAlternate" height={250} position="relative" width="100%">
    <Box background="bgOverlay" pin="bottom">
      <TextBody as="p">Bottom from left to right</TextBody>
    </Box>
  </Box>
);

export const LeftPin = () => (
  <Box background="bgAlternate" height={250} position="relative" width="100%">
    <Box background="bgOverlay" pin="left">
      <TextBody as="p">Left from top to bottom</TextBody>
    </Box>
  </Box>
);

export const AllPin = () => (
  <Box background="bgAlternate" height={250} position="relative" width="100%">
    <Box background="bgOverlay" pin="all">
      <TextBody as="p">To all corners</TextBody>
    </Box>
  </Box>
);

export const BooleanStyleProps = () => {
  return (
    <Box
      bordered
      background="bgPrimary"
      borderColor="accentBoldPurple"
      borderWidth={300}
      height={200}
      width={200}
    >
      <Text inherit font="title1" fontFamily="caption" fontSize="display1">
        HELLO WORLD
      </Text>
    </Box>
  );
};
