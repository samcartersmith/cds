import React from 'react';
import { announcementCards } from '@cbhq/cds-common2/internal/data/announcementCards';
import { dataCards } from '@cbhq/cds-common2/internal/data/dataCards';
import { featureEntryCards } from '@cbhq/cds-common2/internal/data/featureEntryCards';
import { feedCards } from '@cbhq/cds-common2/internal/data/feedCards';
import { assets } from '@cbhq/cds-common2/internal/data/assets';
import type { CellSpacing } from '@cbhq/cds-common2';

import { Button } from '../../buttons/Button';
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

const onPressConsole = () => console.log('pressed');

const sharedWrapperProps = {
  position: 'relative',
  width: '100%',
} as const;

const sharedProps = { padding: 2 } as const;
const sharedPressProps = { onPress: onPressConsole, ...sharedProps } as const;
const pinnedSharedProps = { ...sharedProps, elevation: 2 } as const;
const pinnedSharedWrapperProps = {
  ...sharedWrapperProps,
  height: 250,
} as const;

const innerSpacingConfig: CellSpacing = {
  paddingX: 2,
};

const ListCellCard = () => (
  <React.Fragment>
    <VStack gap={2} {...sharedWrapperProps}>
      <Card elevation={1} accessibilityHint="Card" accessibilityLabel="Card">
        {Array.from({ length: 4 }).map((_, i) => {
          return (
            <ListCell
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
              variant="negative"
            />
          );
        })}
      </Card>
    </VStack>
  </React.Fragment>
);

const PressableCards = () => (
  <React.Fragment>
    <VStack gap={2} {...sharedWrapperProps}>
      <Card {...sharedPressProps} elevation={0} accessibilityHint="Card" accessibilityLabel="Card">
        <LoremIpsum title="Elevation 0" />
      </Card>
      <Card {...sharedPressProps} elevation={1} accessibilityHint="Card" accessibilityLabel="Card">
        <LoremIpsum title="Elevation 1" />
      </Card>
      <Card {...sharedPressProps} elevation={2} accessibilityHint="Card" accessibilityLabel="Card">
        <LoremIpsum title="Elevation 2" />
      </Card>
      <Card
        {...sharedPressProps}
        elevation={2}
        width="50%"
        accessibilityHint="Card"
        accessibilityLabel="Card"
      >
        <LoremIpsum title="Half width" />
      </Card>
      <Card
        {...sharedPressProps}
        elevation={2}
        size="medium"
        accessibilityHint="Card"
        accessibilityLabel="Card"
      >
        <LoremIpsum title="Medium size" />
      </Card>
      <Card
        {...sharedPressProps}
        borderRadius={400}
        elevation={1}
        accessibilityHint="Card"
        accessibilityLabel="Card"
      >
        <LoremIpsum title="With Border Radius" />
      </Card>
    </VStack>
  </React.Fragment>
);

const PressableColoredCards = () => (
  <React.Fragment>
    <VStack gap={2} {...sharedWrapperProps}>
      <Card
        {...sharedPressProps}
        background="bgPrimary"
        accessibilityHint="Card"
        accessibilityLabel="Card"
      >
        <LoremIpsum color="fgInverse" title="Primary" />
      </Card>

      <Card
        {...sharedPressProps}
        background="bgPositive"
        accessibilityHint="Card"
        accessibilityLabel="Card"
      >
        <LoremIpsum color="fgInverse" title="Positive" />
      </Card>

      <Card
        {...sharedPressProps}
        background="bgNegative"
        accessibilityHint="Card"
        accessibilityLabel="Card"
      >
        <LoremIpsum color="fgInverse" title="Negative" />
      </Card>
    </VStack>
  </React.Fragment>
);

const NonClickableCards = () => (
  <React.Fragment>
    <VStack gap={2} {...sharedWrapperProps}>
      <Card {...sharedProps} elevation={1} accessibilityHint="Card" accessibilityLabel="Card">
        <LoremIpsum title="Elevation 1" />
        <Button variant="secondary">Secondary button</Button>
      </Card>

      <Card {...sharedProps} elevation={2} accessibilityHint="Card" accessibilityLabel="Card">
        <LoremIpsum title="Elevation 2" />
        <Button variant="secondary">Secondary button</Button>
      </Card>
    </VStack>
  </React.Fragment>
);

const NonClickableColoredCards = () => (
  <React.Fragment>
    <VStack gap={2} {...sharedWrapperProps}>
      <Card
        {...sharedProps}
        background="bgPrimary"
        accessibilityHint="Card"
        accessibilityLabel="Card"
      >
        <LoremIpsum color="fgInverse" title="Primary" />
      </Card>

      <Card
        {...sharedProps}
        background="bgPositive"
        accessibilityHint="Card"
        accessibilityLabel="Card"
      >
        <LoremIpsum color="fgInverse" title="Positive" />
      </Card>

      <Card
        {...sharedProps}
        background="bgNegative"
        accessibilityHint="Card"
        accessibilityLabel="Card"
      >
        <LoremIpsum color="fgInverse" title="Negative" />
      </Card>
    </VStack>
  </React.Fragment>
);

const PinnedTopCard = () => (
  <React.Fragment>
    <Box {...pinnedSharedWrapperProps} background="bgAlternate">
      <Card {...pinnedSharedProps} pin="top" accessibilityHint="Card" accessibilityLabel="Card">
        <LoremIpsum concise title="Top" />
      </Card>
    </Box>
  </React.Fragment>
);

const PinnedRightCard = () => (
  <React.Fragment>
    <Box {...pinnedSharedWrapperProps} background="bgAlternate">
      <Card {...pinnedSharedProps} pin="right" accessibilityHint="Card" accessibilityLabel="Card">
        <LoremIpsum concise title="Right" />
      </Card>
    </Box>
  </React.Fragment>
);

const PinnedBottomCard = () => (
  <React.Fragment>
    <Box {...pinnedSharedWrapperProps} background="bgAlternate">
      <Card {...pinnedSharedProps} pin="bottom" accessibilityHint="Card" accessibilityLabel="Card">
        <LoremIpsum concise title="Bottom" />
      </Card>
    </Box>
  </React.Fragment>
);

const PinnedLeftCard = () => (
  <React.Fragment>
    <Box {...pinnedSharedWrapperProps} background="bgAlternate">
      <Card {...pinnedSharedProps} pin="left" accessibilityHint="Card" accessibilityLabel="Card">
        <LoremIpsum concise title="Left" />
      </Card>
    </Box>
  </React.Fragment>
);

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
