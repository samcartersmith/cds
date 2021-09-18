import React from 'react';
import { Button } from '@cbhq/cds-mobile/buttons/Button';
import { ListCell, CellMedia } from '@cbhq/cds-mobile/cells';
import { Box, VStack, Card } from '@cbhq/cds-mobile/layout';
import { ThemeProvider } from '@cbhq/cds-mobile/system';
import { createStories } from ':cds-storybook/stories/Card';

import Example from './internal/Example';
import ExamplesScreen from './internal/ExamplesScreen';
import { LoremIpsum } from './internal/LoremIpsum';

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
} = createStories({
  Box,
  Button,
  Card,
  VStack,
  ListCell,
  CellMedia,
  LoremIpsum,
  ThemeProvider,
});

const CardScreen = () => {
  return (
    <ExamplesScreen>
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
