import React from 'react';
import {
  BoxBaseProps,
  ButtonBaseProps,
  CardBaseProps,
  PaletteForeground,
  StackBaseProps,
  ListCellBaseProps,
  CellMediaProps,
  IconButtonBaseProps,
} from '@cbhq/cds-common';

import { FeedCardBaseProps } from '@cbhq/cds-common/types/CardBaseProps';

import { mockAsset } from './constants';

const onPressConsole = () => console.log('pressed');

const sharedWrapperProps = {
  position: 'relative',
  width: '100%',
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
  FeedCard: React.ComponentType<FeedCardBaseProps>;
  IconButton: React.ComponentType<IconButtonBaseProps>;
  VStack: React.ComponentType<BoxBaseProps & StackBaseProps>;
  LoremIpsum: React.ComponentType<{ title: string; color?: PaletteForeground; concise?: boolean }>;
  Button: React.ComponentType<ButtonBaseProps>;
  ListCell: React.ComponentType<
    ListCellBaseProps & {
      onPress?: () => void;
      to?: string;
    }
  >;
  CellMedia: React.ComponentType<CellMediaProps>;
  ThemeProvider: React.ComponentType;
};

export function createStories({
  Box,
  Button,
  Card,
  FeedCard,
  IconButton,
  VStack,
  ListCell,
  CellMedia,
  LoremIpsum,
  ThemeProvider,
}: CreateCardProps) {
  const ListCellCard = () => (
    <ThemeProvider>
      <VStack gap={2} {...sharedWrapperProps}>
        <Card elevation={1}>
          {Array.from({ length: 4 }).map((_, i) => {
            return (
              <ListCell
                key={`card-cell-${i}`}
                onPress={onPressConsole}
                title="Title"
                description="Description"
                detail="$942,103"
                subdetail="-2.34%"
                variant="negative"
                detailWidth={95}
                intermediary={<CellMedia type="icon" name="chartLine" />}
                media={<CellMedia type="image" source={mockAsset} title="Title" />}
                reduceHorizontalSpacing
              />
            );
          })}
        </Card>
      </VStack>
    </ThemeProvider>
  );

  const PressableCards = () => (
    <ThemeProvider>
      <VStack gap={2} {...sharedWrapperProps}>
        <Card {...sharedPressProps} elevation={1}>
          <LoremIpsum title="Elevation 1" />
        </Card>

        <Card {...sharedPressProps} elevation={2}>
          <LoremIpsum title="Elevation 2" />
        </Card>

        <Card {...sharedPressProps} elevation={2} width="50%">
          <LoremIpsum title="Half width" />
        </Card>

        <Card {...sharedPressProps} elevation={2} size="medium">
          <LoremIpsum title="Medium size" />
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
      <Box {...pinnedSharedWrapperProps} background="backgroundAlternate">
        <Card {...pinnedSharedProps} pin="top">
          <LoremIpsum title="Top" concise />
        </Card>
      </Box>
    </ThemeProvider>
  );

  const PinnedRightCard = () => (
    <ThemeProvider>
      <Box {...pinnedSharedWrapperProps} background="backgroundAlternate">
        <Card {...pinnedSharedProps} pin="right">
          <LoremIpsum title="Right" concise />
        </Card>
      </Box>
    </ThemeProvider>
  );

  const PinnedBottomCard = () => (
    <ThemeProvider>
      <Box {...pinnedSharedWrapperProps} background="backgroundAlternate">
        <Card {...pinnedSharedProps} pin="bottom">
          <LoremIpsum title="Bottom" concise />
        </Card>
      </Box>
    </ThemeProvider>
  );

  const PinnedLeftCard = () => (
    <ThemeProvider>
      <Box {...pinnedSharedWrapperProps} background="backgroundAlternate">
        <Card {...pinnedSharedProps} pin="left">
          <LoremIpsum title="Left" concise />
        </Card>
      </Box>
    </ThemeProvider>
  );

  const FeedCardExample = () => (
    <ThemeProvider>
      <Box {...sharedPressProps} background="backgroundAlternate">
        <FeedCard
          avatarUrl="https://dynamic-assets.coinbase.com/dbb4b4983bde81309ddab83eb598358eb44375b930b94687ebe38bc22e52c3b2125258ffb8477a5ef22e33d6bd72e32a506c391caa13af64c00e46613c3e5806/asset_icons/4113b082d21cc5fab17fc8f2d19fb996165bcce635e6900f7fc2d57c4ef33ae9.png"
          headerDescription="Earn crypto"
          headerActionNode={<IconButton name="more" variant="foregroundMuted" transparent />}
          bodyTitle="LEARN AMP. EARN $3 IN AMP."
          bodyDescription="Amp is an Ethereum token that can be used as collateral to provide instant settlement assurance any time value is transferred."
          bodyMediaUrl="https://via.placeholder.com/350x220"
          bodyOrientation="vertical"
          footerActions={
            <Button compact variant="secondary">
              Actions
            </Button>
          }
        />
      </Box>
    </ThemeProvider>
  );

  return {
    ListCellCard,
    PressableCards,
    PressableColoredCards,
    NonClickableCards,
    NonClickableColoredCards,
    PinnedTopCard,
    PinnedRightCard,
    PinnedBottomCard,
    PinnedLeftCard,
    FeedCardExample,
  };
}
