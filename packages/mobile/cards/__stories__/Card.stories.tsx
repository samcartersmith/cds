import React from 'react';
import { cardBuilder } from '@cbhq/cds-common/internal/cardBuilder';
import { createConfigs as createAnnouncementCardProps } from '@cbhq/cds-common/internal/cards/announcementCardBuilder';
import { createConfigs as createFeatureEntryProps } from '@cbhq/cds-common/internal/cards/featureEntryCardBuilder';
import { createConfigs as createFeedCardProps } from '@cbhq/cds-common/internal/cards/feedCardBuilder';
import { gutter } from '@cbhq/cds-common/tokens/sizing';

import { Button } from '../../buttons/Button';
import { IconButton } from '../../buttons/IconButton';
import { CellMedia } from '../../cells/CellMedia';
import { ListCell } from '../../cells/ListCell';
import { Example, ExampleScreen, LoremIpsum } from '../../examples/ExampleScreen';
import { SpotSquare } from '../../illustrations/SpotSquare';
import { Box } from '../../layout/Box';
import { VStack } from '../../layout/VStack';
import { ThemeProvider } from '../../system/ThemeProvider';
import { AnnouncementCard } from '../AnnouncementCard';
import { Card } from '../Card';
import { CardBody } from '../CardBody';
import { CardGroup, CardGroupRenderItem } from '../CardGroup';
import { FeatureEntryCard } from '../FeatureEntryCard';
import { FeedCard } from '../FeedCard';

const renderHorizontalItem: CardGroupRenderItem = ({ item, Wrapper }) => (
  <Wrapper width={250}>{item}</Wrapper>
);

const { exampleProps: announcementCardProps } = createAnnouncementCardProps({
  CardGroup,
  renderHorizontalItem,
});
const { exampleProps: featureEntryProps } = createFeatureEntryProps({
  CardGroup,
  renderHorizontalItem,
});
const { exampleProps: feedCardProps } = createFeedCardProps({
  Button,
  CardGroup,
  IconButton,
  renderHorizontalItem,
});

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
      <Example title="FeedCard" spacing={gutter} overflow="visible">
        <CardGroup>
          <FeedCard {...feedCardProps} />
          <FeedCard {...feedCardProps} />
        </CardGroup>
      </Example>
      <Example title="AnnouncementCard" spacing={gutter} overflow="visible">
        <CardGroup>
          <AnnouncementCard {...announcementCardProps} />
          <AnnouncementCard {...announcementCardProps} />
        </CardGroup>
      </Example>
      <Example title="FeatureEntryCard" spacing={gutter} overflow="visible">
        <CardGroup>
          <FeatureEntryCard {...featureEntryProps} />
          <FeatureEntryCard {...featureEntryProps} />
        </CardGroup>
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
