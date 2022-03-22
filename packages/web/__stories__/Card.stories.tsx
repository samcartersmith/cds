import { announcementCards } from '@cbhq/cds-common/internal/data/announcementCards';
import { dataCards } from '@cbhq/cds-common/internal/data/dataCards';
import { featureEntryCards } from '@cbhq/cds-common/internal/data/featureEntryCards';
import { feedCards } from '@cbhq/cds-common/internal/data/feedCards';
import { baseConfig, storyBuilder } from '@cbhq/cds-common/internal/utils/storyBuilder';

import { AnnouncementCard as AnnouncementCardComponent } from '../alpha/AnnouncementCard';
import { CardGroup } from '../alpha/CardGroup';
import { DataCard as DataCardComponent } from '../alpha/DataCard';
import { FeatureEntryCard as FeatureEntryCardComponent } from '../alpha/FeatureEntryCard';
import { FeedCard as FeedCardComponent, FeedCardProps } from '../alpha/FeedCard';
import { ThemeProvider, ThemeProviderProps } from '../system';

const accessToken = process.env.FIGMA_ACCESS_TOKEN ?? '';
const cardParameters = {
  percy: { skip: true },
  wrapper: CardGroup,
  wrapperProps: { background: true, borderedBottom: true },
} as const;
const builder = storyBuilder({ parameters: cardParameters });

/* -------------------------------------------------------------------------- */
/*                             Announcement Cards                             */
/* -------------------------------------------------------------------------- */
const announcementCardBuilder = builder(AnnouncementCardComponent, {
  parameters: {
    design: {
      type: 'figspec',
      url: 'https://www.figma.com/file/SWoyy3B5IkEpMvk60Lb4V6/CDS-Normal-%F0%9F%8C%9E?node-id=15595%3A75665',
      accessToken,
    },
  },
});
export const AnnouncementCard = announcementCardBuilder.build(announcementCards[0]);
export const AnnouncementCards = announcementCardBuilder.buildSheet(announcementCards);

/* -------------------------------------------------------------------------- */
/*                                 Data Cards                                 */
/* -------------------------------------------------------------------------- */
const dataCardsBuilder = builder(DataCardComponent, {
  parameters: {
    design: {
      type: 'figspec',
      url: 'https://www.figma.com/file/SWoyy3B5IkEpMvk60Lb4V6/CDS-Normal-%F0%9F%8C%9E?node-id=15595%3A75700',
      accessToken,
    },
  },
});
export const DataCard = dataCardsBuilder.build(dataCards[0]);
export const DataCards = dataCardsBuilder.buildSheet(dataCards);

/* -------------------------------------------------------------------------- */
/*                             FeatureEntry Cards                             */
/* -------------------------------------------------------------------------- */
const featureEntryCardBuilder = builder(FeatureEntryCardComponent, {
  parameters: {
    design: {
      type: 'figspec',
      url: 'https://www.figma.com/file/SWoyy3B5IkEpMvk60Lb4V6/CDS-Normal-%F0%9F%8C%9E?node-id=15595%3A75644',
      accessToken,
    },
  },
});
export const FeatureEntryCard = featureEntryCardBuilder.build(featureEntryCards[0]);
export const FeatureEntryCards = featureEntryCardBuilder.buildSheet(featureEntryCards);

/* -------------------------------------------------------------------------- */
/*                                 Feed Cards                                 */
/* -------------------------------------------------------------------------- */
export const FeedCard = ({
  spectrum,
  scale,
  ...props
}: FeedCardProps & Omit<ThemeProviderProps, 'display' | 'palette'>) => {
  return (
    <ThemeProvider display="contents" spectrum={spectrum} scale={scale}>
      <FeedCardComponent
        background
        {...feedCards[0]}
        like={feedCards[0].like()}
        maxWidth={800}
        {...props}
      />
    </ThemeProvider>
  );
};

FeedCard.bind({});
FeedCard.args = baseConfig.args;
FeedCard.argTypes = baseConfig.argTypes;
FeedCard.parameters = {
  ...baseConfig.parameters,
  ...cardParameters,
  design: {
    type: 'figspec',
    url: 'https://www.figma.com/file/SWoyy3B5IkEpMvk60Lb4V6/CDS-Normal-%F0%9F%8C%9E?node-id=18698%3A107647',
    accessToken,
  },
};

export const FeedCards = () => {
  return (
    <CardGroup>
      {feedCards.map(({ like: getLikeProps, ...item }) => (
        <FeedCardComponent {...item} like={getLikeProps()} maxWidth={800} />
      ))}
    </CardGroup>
  );
};

FeedCards.bind({});
FeedCards.args = FeedCard.args;
FeedCards.parameters = FeedCard.parameters;
FeedCards.argTypes = FeedCard.argTypes;

export default {
  title: 'components/Cards',
  component: FeedCard,
};
