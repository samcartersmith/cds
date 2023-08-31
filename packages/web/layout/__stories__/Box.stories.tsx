import { Fragment } from 'react';
import { BorderRadius, PaletteForeground } from '@cbhq/cds-common';

import { borderRadius } from '../../tokens';
import { TextBody, TextTitle4 } from '../../typography';
import { Box } from '../Box';
import { VStack } from '../VStack';

const Lipsum = ({ color }: { color?: PaletteForeground }) => (
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
  <Box background="backgroundAlternate" spacing={0.5}>
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
  <Box flexDirection="row" justifyContent="space-between" alignItems="center" alignContent="center">
    <Box background="positive" alignSelf="flex-end" spacing={1}>
      <Lipsum color="positiveForeground" />
    </Box>
    <Box background="backgroundAlternate" width="30%" spacing={1}>
      <Lipsum />
    </Box>
    <Box background="backgroundOverlay" flexGrow={1} spacing={1}>
      <Lipsum />
    </Box>
  </Box>
);

export const AlternateBackground = () => (
  <Box background="backgroundAlternate" spacing={2}>
    <Lipsum />
  </Box>
);

export const OverlayBackground = () => (
  <Box background="backgroundOverlay" spacing={2}>
    <Lipsum />
  </Box>
);

export const PrimaryBackground = () => (
  <Box background="primary" spacing={2}>
    <Lipsum color="primaryForeground" />
  </Box>
);

export const SecondaryBackground = () => (
  <Box background="secondary" spacing={2}>
    <Lipsum color="secondaryForeground" />
  </Box>
);

export const PositiveBackground = () => (
  <Box background="positive" spacing={2}>
    <Lipsum color="positiveForeground" />
  </Box>
);

export const NegativeBackground = () => (
  <Box background="negative" spacing={2}>
    <Lipsum color="negativeForeground" />
  </Box>
);

export const Bordered = () => (
  <Box bordered spacing={2}>
    <Lipsum />
  </Box>
);

export const BorderedAndRounded = () => (
  <Box bordered borderRadius="rounded" spacing={2}>
    <Lipsum />
  </Box>
);

export const RoundedVariations = () => (
  <VStack gap={1}>
    {Object.entries(borderRadius).map(([key]) => {
      return (
        <Fragment key={key}>
          <TextTitle4 as="p">{key}</TextTitle4>
          <Box background="backgroundAlternate" borderRadius={key as BorderRadius} spacing={2}>
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
  <Box spacing={3} background="backgroundAlternate">
    <TextBody as="p">All sides</TextBody>
  </Box>
);

export const CustomSpacing = () => (
  <Box
    spacingTop={1}
    spacingEnd={2}
    spacingBottom={3}
    spacingStart={4}
    background="backgroundAlternate"
  >
    <TextBody as="p">Custom sides</TextBody>
  </Box>
);

export const VerticalSpacing = () => (
  <Box spacingVertical={3} background="backgroundAlternate">
    <TextBody as="p">Vertical only</TextBody>
  </Box>
);

export const HorizontalSpacing = () => (
  <Box spacingHorizontal={3} background="backgroundAlternate">
    <TextBody as="p">Horizontal only</TextBody>
  </Box>
);

export const Offset = () => (
  <Box spacing={5} background="backgroundAlternate">
    <Box offset={3} background>
      <TextBody as="p">All sides</TextBody>
    </Box>
  </Box>
);

export const CustomOffset = () => (
  <Box spacing={5} background="backgroundAlternate">
    <Box offsetTop={1} offsetEnd={2} offsetBottom={3} offsetStart={4} background>
      <TextBody as="p">Custom sides</TextBody>
    </Box>
  </Box>
);

export const VerticalOffset = () => (
  <Box spacing={5} background="backgroundAlternate">
    <Box offsetVertical={3} background>
      <TextBody as="p">Vertical only</TextBody>
    </Box>
  </Box>
);

export const HorizontalOffset = () => (
  <Box spacing={5} background="backgroundAlternate">
    <Box offsetHorizontal={3} background>
      <TextBody as="p">Horizontal only</TextBody>
    </Box>
  </Box>
);

export const Positioned = () => (
  <Box background="backgroundAlternate" position="relative" height="300px" width="100%" spacing={1}>
    <Box position="absolute" right="15px" bottom="15px" width="45%" spacing={1}>
      <Lipsum />
    </Box>
  </Box>
);

export const TopPin = () => (
  <Box width="100%" height={250} background="backgroundAlternate" position="relative">
    <Box pin="top" background="backgroundOverlay">
      <TextBody as="p">Top from left to right</TextBody>
    </Box>
  </Box>
);

export const RightPin = () => (
  <Box width="100%" height={250} background="backgroundAlternate" position="relative">
    <Box pin="right" background="backgroundOverlay">
      <TextBody as="p"> Right from top to bottom</TextBody>
    </Box>
  </Box>
);

export const BottomPin = () => (
  <Box width="100%" height={250} background="backgroundAlternate" position="relative">
    <Box pin="bottom" background="backgroundOverlay">
      <TextBody as="p">Bottom from left to right</TextBody>
    </Box>
  </Box>
);

export const LeftPin = () => (
  <Box width="100%" height={250} background="backgroundAlternate" position="relative">
    <Box pin="left" background="backgroundOverlay">
      <TextBody as="p">Left from top to bottom</TextBody>
    </Box>
  </Box>
);

export const AllPin = () => (
  <Box width="100%" height={250} background="backgroundAlternate" position="relative">
    <Box pin="all" background="backgroundOverlay">
      <TextBody as="p">To all corners</TextBody>
    </Box>
  </Box>
);

export default {
  title: 'Core Components/Box (tsx)',
  component: Box,
};
