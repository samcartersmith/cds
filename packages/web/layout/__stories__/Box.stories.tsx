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
  <Box alignContent="center" alignItems="center" flexDirection="row" justifyContent="space-between">
    <Box alignSelf="flex-end" background="positive" spacing={1}>
      <Lipsum color="positiveForeground" />
    </Box>
    <Box background="backgroundAlternate" spacing={1} width="30%">
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
  <Box background="backgroundAlternate" spacing={3}>
    <TextBody as="p">All sides</TextBody>
  </Box>
);

export const CustomSpacing = () => (
  <Box
    background="backgroundAlternate"
    spacingBottom={3}
    spacingEnd={2}
    spacingStart={4}
    spacingTop={1}
  >
    <TextBody as="p">Custom sides</TextBody>
  </Box>
);

export const VerticalSpacing = () => (
  <Box background="backgroundAlternate" spacingVertical={3}>
    <TextBody as="p">Vertical only</TextBody>
  </Box>
);

export const HorizontalSpacing = () => (
  <Box background="backgroundAlternate" spacingHorizontal={3}>
    <TextBody as="p">Horizontal only</TextBody>
  </Box>
);

export const Offset = () => (
  <Box background="backgroundAlternate" spacing={5}>
    <Box background offset={3}>
      <TextBody as="p">All sides</TextBody>
    </Box>
  </Box>
);

export const CustomOffset = () => (
  <Box background="backgroundAlternate" spacing={5}>
    <Box background offsetBottom={3} offsetEnd={2} offsetStart={4} offsetTop={1}>
      <TextBody as="p">Custom sides</TextBody>
    </Box>
  </Box>
);

export const VerticalOffset = () => (
  <Box background="backgroundAlternate" spacing={5}>
    <Box background offsetVertical={3}>
      <TextBody as="p">Vertical only</TextBody>
    </Box>
  </Box>
);

export const HorizontalOffset = () => (
  <Box background="backgroundAlternate" spacing={5}>
    <Box background offsetHorizontal={3}>
      <TextBody as="p">Horizontal only</TextBody>
    </Box>
  </Box>
);

export const Positioned = () => (
  <Box background="backgroundAlternate" height="300px" position="relative" spacing={1} width="100%">
    <Box bottom="15px" position="absolute" right="15px" spacing={1} width="45%">
      <Lipsum />
    </Box>
  </Box>
);

export const TopPin = () => (
  <Box background="backgroundAlternate" height={250} position="relative" width="100%">
    <Box background="backgroundOverlay" pin="top">
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
