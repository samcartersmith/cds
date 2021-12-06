import React from 'react';
import { SpotSquare } from '@cbhq/cds-mobile/illustrations';
import { Button } from '@cbhq/cds-mobile/buttons/Button';
import { IconButton } from '@cbhq/cds-mobile/buttons/IconButton';
import { ListCell, CellMedia } from '@cbhq/cds-mobile/cells';
import { Box, VStack } from '@cbhq/cds-mobile/layout';
import { Card, FeedCard, CardBody } from '@cbhq/cds-mobile/cards';
import { ThemeProvider } from '@cbhq/cds-mobile/system';
import { cardBuilder } from '@cbhq/cds-common/internal/cardBuilder';

import Example from '../internal/Example';
import ExamplesScreen from '../internal/ExamplesScreen';
import { LoremIpsum } from '../internal/LoremIpsum';

const {
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
} = cardBuilder({
  Box,
  Button,
  Card,
  FeedCard,
  CardBody,
  SpotSquare,
  IconButton,
  VStack,
  ListCell,
  CellMedia,
  LoremIpsum,
  ThemeProvider,
});

const CardScreen = () => {
  return (
    <ExamplesScreen>
      <Example title="FeedCard">
        <FeedCardExample />
      </Example>
      <Example title="Card with SpotSquare">
        <SpotSquareExample />
      </Example>
      <Example title="Card with ListCells">
        <ListCellCard />
      </Example>
      <Example title="Clickable Cards">
        <PressableCards />
      </Example>
      <Example title="Clickable colored Cards">
        <PressableColoredCards />
      </Example>
      <Example title="Non-clickable Cards">
        <NonClickableCards />
      </Example>
      <Example title="Non-clickable colored Cards">
        <NonClickableColoredCards />
      </Example>
      <Example title="Pinned - top">
        <PinnedTopCard />
      </Example>
      <Example title="Pinned - right">
        <PinnedRightCard />
      </Example>
      <Example title="Pinned - bottom">
        <PinnedBottomCard />
      </Example>
      <Example title="Pinned - left">
        <PinnedLeftCard />
      </Example>
    </ExamplesScreen>
  );
};

export default CardScreen;
