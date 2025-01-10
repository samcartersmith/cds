import React from 'react';

import { ThemeVars } from '../core/theme';
import {
  BoxBaseProps,
  ButtonBaseProps,
  CardBaseProps,
  CardBodyBaseProps,
  CellMediaProps,
  CellSpacing,
  FeedCardBaseProps,
  IconButtonBaseProps,
  ListCellBaseProps,
  SpotSquareProps,
  StackBaseProps,
} from '../types';

import { assets } from './data/assets';

// eslint-disable-next-line no-console
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
  Box: React.ComponentType<React.PropsWithChildren<BoxBaseProps>>;
  Card: React.ComponentType<React.PropsWithChildren<CardBaseProps & BoxBaseProps>>;
  CardBody?: React.ComponentType<React.PropsWithChildren<CardBodyBaseProps>>;
  SpotSquare?: React.ComponentType<React.PropsWithChildren<SpotSquareProps & BoxBaseProps>>;
  FeedCard?: React.ComponentType<React.PropsWithChildren<FeedCardBaseProps<() => void>>>;
  IconButton: React.ComponentType<React.PropsWithChildren<IconButtonBaseProps>>;
  VStack: React.ComponentType<React.PropsWithChildren<BoxBaseProps & StackBaseProps>>;
  LoremIpsum: React.ComponentType<
    React.PropsWithChildren<{ title: string; color?: ThemeVars.Color; concise?: boolean }>
  >;
  Button: React.ComponentType<React.PropsWithChildren<ButtonBaseProps>>;
  ListCell: React.ComponentType<
    React.PropsWithChildren<
      ListCellBaseProps & {
        onPress?: () => void;
        to?: string;
      }
    >
  >;
  CellMedia: React.ComponentType<React.PropsWithChildren<CellMediaProps>>;
  ThemeProvider: React.ComponentType<React.PropsWithChildren<unknown>>;
};

const innerSpacingConfig: CellSpacing = { paddingX: 1 };

export function cardBuilder({
  Box,
  Button,
  Card,
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
                // eslint-disable-next-line react/no-array-index-key
                key={`card-cell-${i}`}
                description="Description"
                detail="$942,103"
                detailWidth={95}
                innerSpacing={innerSpacingConfig}
                intermediary={<CellMedia name="chartLine" type="icon" />}
                media={<CellMedia source={assets.eth.imageUrl} type="image" />}
                onPress={onPressConsole}
                subdetail="-2.34%"
                title="Title"
                variant="textNegative"
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
        <Card {...sharedPressProps} elevation={0}>
          <LoremIpsum title="Elevation 0" />
        </Card>
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
        <Card {...sharedPressProps} borderRadius={400} elevation={1}>
          <LoremIpsum title="With Border Radius" />
        </Card>
      </VStack>
    </ThemeProvider>
  );

  const PressableColoredCards = () => (
    <ThemeProvider>
      <VStack gap={2} {...sharedWrapperProps}>
        <Card {...sharedPressProps} background="backgroundPrimary">
          <LoremIpsum color="textForegroundInverse" title="Primary" />
        </Card>

        <Card {...sharedPressProps} background="backgroundPositive">
          <LoremIpsum color="textForegroundInverse" title="Positive" />
        </Card>

        <Card {...sharedPressProps} background="backgroundNegative">
          <LoremIpsum color="textForegroundInverse" title="Negative" />
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
        <Card {...sharedProps} background="backgroundPrimary">
          <LoremIpsum color="textForegroundInverse" title="Primary" />
        </Card>

        <Card {...sharedProps} background="backgroundPositive">
          <LoremIpsum color="textForegroundInverse" title="Positive" />
        </Card>

        <Card {...sharedProps} background="backgroundNegative">
          <LoremIpsum color="textForegroundInverse" title="Negative" />
        </Card>
      </VStack>
    </ThemeProvider>
  );

  const PinnedTopCard = () => (
    <ThemeProvider>
      <Box {...pinnedSharedWrapperProps} background="backgroundAlternate">
        <Card {...pinnedSharedProps} pin="top">
          <LoremIpsum concise title="Top" />
        </Card>
      </Box>
    </ThemeProvider>
  );

  const PinnedRightCard = () => (
    <ThemeProvider>
      <Box {...pinnedSharedWrapperProps} background="backgroundAlternate">
        <Card {...pinnedSharedProps} pin="right">
          <LoremIpsum concise title="Right" />
        </Card>
      </Box>
    </ThemeProvider>
  );

  const PinnedBottomCard = () => (
    <ThemeProvider>
      <Box {...pinnedSharedWrapperProps} background="backgroundAlternate">
        <Card {...pinnedSharedProps} pin="bottom">
          <LoremIpsum concise title="Bottom" />
        </Card>
      </Box>
    </ThemeProvider>
  );

  const PinnedLeftCard = () => (
    <ThemeProvider>
      <Box {...pinnedSharedWrapperProps} background="backgroundAlternate">
        <Card {...pinnedSharedProps} pin="left">
          <LoremIpsum concise title="Left" />
        </Card>
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
  };
}
