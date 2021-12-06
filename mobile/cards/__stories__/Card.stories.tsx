import React from 'react';
import { cardBuilder } from '@cbhq/cds-common/internal/cardBuilder';

import { Button } from '../../buttons/Button';
import { IconButton } from '../../buttons/IconButton';
import { ListCell } from '../../cells/ListCell';
import { CellMedia } from '../../cells/CellMedia';
import { SpotSquare } from '../../illustrations/SpotSquare';
import { Box } from '../../layout/Box';
import { VStack } from '../../layout/VStack';
import { ThemeProvider } from '../../system/ThemeProvider';

import { Card } from '../Card';
import { FeedCard } from '../FeedCard';
import { CardBody } from '../CardBody';

import { Example, ExampleScreen, LoremIpsum } from '../../examples/ExampleScreen';

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
    <ExampleScreen>
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
    </ExampleScreen>
  );
};

export default CardScreen;
