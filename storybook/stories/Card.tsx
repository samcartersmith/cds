import {
  BoxBaseProps,
  ButtonBaseProps,
  CardBaseProps,
  PaletteForeground,
  StackBaseProps,
} from '@cbhq/cds-common';

const onPressConsole = () => console.log('pressed');

const sharedWrapperProps = {
  position: 'relative',
  background: 'backgroundAlternate',
  width: '100%',
  spacing: 2,
} as const;

const sharedProps = { spacing: 2 } as const;
const sharedPressProps = { onPress: onPressConsole, ...sharedProps } as const;
const pinnedSharedProps = { ...sharedProps, elevation: 2 } as const;
const pinnedSharedWrapperProps = {
  ...sharedWrapperProps,
  height: 250,
} as const;

export type CreateCardProps = {
  Box: React.ComponentType<BoxBaseProps>;
  Card: React.ComponentType<CardBaseProps & BoxBaseProps>;
  VStack: React.ComponentType<BoxBaseProps & StackBaseProps>;
  LoremIpsum: React.ComponentType<{ title: string; color?: PaletteForeground; concise?: boolean }>;
  Button: React.ComponentType<ButtonBaseProps>;
  ThemeProvider: React.ComponentType;
};

export function createStories({
  Box,
  Button,
  Card,
  VStack,
  LoremIpsum,
  ThemeProvider,
}: CreateCardProps) {
  const PressableCards = () => (
    <ThemeProvider>
      <VStack gap={2} {...sharedWrapperProps}>
        <Card {...sharedPressProps} elevation={1}>
          <LoremIpsum title="Elevation 1" />
        </Card>

        <Card {...sharedPressProps} elevation={2}>
          <LoremIpsum title="Elevation 2" />
        </Card>
      </VStack>
    </ThemeProvider>
  );

  const PressableColoredCards = () => (
    <ThemeProvider>
      <VStack gap={2} {...sharedWrapperProps}>
        <Card {...sharedPressProps} background="primary">
          <LoremIpsum color="primaryForeground" title="Primary" />
        </Card>

        <Card {...sharedPressProps} background="positive">
          <LoremIpsum color="positiveForeground" title="Positive" />
        </Card>

        <Card {...sharedPressProps} background="negative">
          <LoremIpsum color="negativeForeground" title="Negative" />
        </Card>
      </VStack>
    </ThemeProvider>
  );

  const NonClickableCards = () => (
    <ThemeProvider>
      <VStack gap={2} {...sharedWrapperProps}>
        <Card {...sharedProps} elevation={1}>
          <LoremIpsum title="Elevation 1" />
          <Button variant="secondary">Secondary button</Button>
        </Card>

        <Card {...sharedProps} elevation={2}>
          <LoremIpsum title="Elevation 2" />
          <Button variant="secondary">Secondary button</Button>
        </Card>
      </VStack>
    </ThemeProvider>
  );

  const NonClickableColoredCards = () => (
    <ThemeProvider>
      <VStack gap={2} {...sharedWrapperProps}>
        <Card {...sharedProps} background="primary">
          <LoremIpsum color="primaryForeground" title="Primary" />
        </Card>

        <Card {...sharedProps} background="positive">
          <LoremIpsum color="positiveForeground" title="Positive" />
        </Card>

        <Card {...sharedProps} background="negative">
          <LoremIpsum color="negativeForeground" title="Negative" />
        </Card>
      </VStack>
    </ThemeProvider>
  );

  const PinnedTopCard = () => (
    <ThemeProvider>
      <Box {...pinnedSharedWrapperProps}>
        <Card {...pinnedSharedProps} pin="top">
          <LoremIpsum title="Top" concise />
        </Card>
      </Box>
    </ThemeProvider>
  );

  const PinnedRightCard = () => (
    <ThemeProvider>
      <Box {...pinnedSharedWrapperProps}>
        <Card {...pinnedSharedProps} pin="right">
          <LoremIpsum title="Right" concise />
        </Card>
      </Box>
    </ThemeProvider>
  );

  const PinnedBottomCard = () => (
    <ThemeProvider>
      <Box {...pinnedSharedWrapperProps}>
        <Card {...pinnedSharedProps} pin="bottom">
          <LoremIpsum title="Bottom" concise />
        </Card>
      </Box>
    </ThemeProvider>
  );

  const PinnedLeftCard = () => (
    <ThemeProvider>
      <Box {...pinnedSharedWrapperProps}>
        <Card {...pinnedSharedProps} pin="left">
          <LoremIpsum title="Left" concise />
        </Card>
      </Box>
    </ThemeProvider>
  );

  return {
    PressableCards,
    PressableColoredCards,
    NonClickableCards,
    NonClickableColoredCards,
    PinnedTopCard,
    PinnedRightCard,
    PinnedBottomCard,
    PinnedLeftCard,
  };
}
