import React from 'react';
import { cardBuilder } from '@cbhq/cds-common2/internal/cardBuilder';
import { announcementCards } from '@cbhq/cds-common2/internal/data/announcementCards';
import { dataCards } from '@cbhq/cds-common2/internal/data/dataCards';
import { featureEntryCards } from '@cbhq/cds-common2/internal/data/featureEntryCards';
import { feedCards } from '@cbhq/cds-common2/internal/data/feedCards';

import { Button } from '../../buttons/Button';
import { IconButton } from '../../buttons/IconButton';
import { CellMedia } from '../../cells/CellMedia';
import { ListCell } from '../../cells/ListCell';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { LoremIpsum } from '../../layout/__stories__/LoremIpsum';
import { Box } from '../../layout/Box';
import { VStack } from '../../layout/VStack';
import { AnnouncementCard } from '../AnnouncementCard';
import { Card } from '../Card';
import { CardGroup } from '../CardGroup';
import { DataCard } from '../DataCard';
import { FeatureEntryCard } from '../FeatureEntryCard';
import { FeedCard } from '../FeedCard';

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
} = cardBuilder({
  Box,
  Button,
  Card: (props) => <Card accessibilityHint="Card" accessibilityLabel="Card" {...props} />,
  IconButton,
  VStack,
  ListCell,
  CellMedia,
  LoremIpsum,
  ThemeProvider: React.Fragment,
});

const CardScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Data Card">
        <CardGroup>
          {dataCards.map((item) => (
            <DataCard {...item} />
          ))}
        </CardGroup>
      </Example>
      <Example title="Feed Card">
        <CardGroup>
          {feedCards.map(({ like: getLikeProps, ...item }) => (
            <FeedCard {...item} like={getLikeProps()} />
          ))}
        </CardGroup>
      </Example>
      <Example title="Announcement Card">
        <CardGroup>
          {announcementCards.map((item) => (
            <AnnouncementCard {...item} />
          ))}
        </CardGroup>
      </Example>
      <Example title="Feature Entry Card">
        <CardGroup>
          {featureEntryCards.map((item) => (
            <FeatureEntryCard {...item} />
          ))}
        </CardGroup>
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
