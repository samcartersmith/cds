import React from 'react';
import {
  BoxBaseProps,
  ButtonBaseProps,
  CardBaseProps,
  CardBodyBaseProps,
  PaletteForeground,
  StackBaseProps,
  ListCellBaseProps,
  CellMediaProps,
  IconButtonBaseProps,
  SpotSquareProps,
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
  CardBody: React.ComponentType<CardBodyBaseProps>;
  SpotSquare: React.ComponentType<SpotSquareProps & BoxBaseProps>;
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
  CardBody,
  SpotSquare,
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
      <FeedCard
        avatarUrl="https://via.placeholder.com/350x220"
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
    </ThemeProvider>
  );

  const SpotSquareExample = () => (
    <ThemeProvider>
      <Card>
        <CardBody
          title="Title/Headline"
          description="You can fit up to fifty two chararcters on 2 lines"
          media={<SpotSquare name="addMultipleCrypto" />}
          orientation="horizontal"
        />
      </Card>
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
    SpotSquareExample,
  };
}
