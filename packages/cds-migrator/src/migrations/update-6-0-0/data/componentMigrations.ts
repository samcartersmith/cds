import { ComponentMigration } from '../../../helpers';

type RemovedComponent = {
  name: string;
  path: string;
  replacement?: string;
};

const warningText =
  'This component has been replaced by a component with a different API. Please migrate props manually. Refer to go/cds-deprecations for API migration guidance.';

/** Component was replaced with another, API could potentially be different and requires manual migration */
export const oneToOneMigrations: ComponentMigration[] = [
  {
    name: 'FiatIcon',
    path: {
      '@cbhq/cds-mobile/icons': '@cbhq/cds-mobile/icons',
    },
    replacement: 'Icon',
    warning: warningText,
  },
];

const oldCardWarning =
  'This component is getting removed in v7.0.0. Please use UpsellCard or NudgeCard instead. ';
const illoWarning = 'use Pictogram, HeroSquare, SpotSquare, or SpotRectangle instead';
const cardMediaWarning = 'use CardMedia instead';

export const removedComponents: RemovedComponent[] = [
  {
    name: 'Illustration',
    path: '@cbhq/cds-web/illustrations/Illustration',
    replacement: illoWarning,
  },
  {
    name: 'Illustration',
    path: '@cbhq/cds-mobile/illustrations/Illustration',
    replacement: illoWarning,
  },
  {
    name: 'CardSpotRectangle',
    path: '@cbhq/cds-mobile/cards/CardMedia',
    replacement: cardMediaWarning,
  },
  {
    name: 'CardSpotSquare',
    path: '@cbhq/cds-mobile/cards/CardMedia',
    replacement: cardMediaWarning,
  },
  {
    name: 'CardPictogram',
    path: '@cbhq/cds-mobile/cards/CardMedia',
    replacement: cardMediaWarning,
  },
  {
    name: 'CardSpotRectangle',
    path: '@cbhq/cds-web/cards/CardMedia',
    replacement: cardMediaWarning,
  },
  {
    name: 'CardSpotSquare',
    path: '@cbhq/cds-web/cards/CardMedia',
    replacement: cardMediaWarning,
  },
  {
    name: 'CardPictogram',
    path: '@cbhq/cds-web/cards/CardMedia',
    replacement: cardMediaWarning,
  },
  {
    name: 'FeatureEntryCard',
    path: '@cbhq/cds-mobile/cards/FeatureEntryCard.tsx',
    replacement: oldCardWarning,
  },
  {
    name: 'FeatureEntryCard',
    path: '@cbhq/cds-web/cards/FeatureEntryCard.tsx',
    replacement: oldCardWarning,
  },
  {
    name: 'FeatureEntryCard',
    path: '@cbhq/cds-mobile/alpha/FeatureEntryCard.tsx',
    replacement: oldCardWarning,
  },
  {
    name: 'FeatureEntryCard',
    path: '@cbhq/cds-web/alpha/FeatureEntryCard.tsx',
    replacement: oldCardWarning,
  },
  {
    name: 'AnnouncementCard',
    path: '@cbhq/cds-mobile/cards/AnnouncementCard.tsx',
    replacement: oldCardWarning,
  },
  {
    name: 'AnnouncementCard',
    path: '@cbhq/cds-web/cards/AnnouncementCard.tsx',
    replacement: oldCardWarning,
  },
  {
    name: 'AnnouncementCard',
    path: '@cbhq/cds-mobile/alpha/AnnouncementCard.tsx',
    replacement: oldCardWarning,
  },
  {
    name: 'AnnouncementCard',
    path: '@cbhq/cds-web/alpha/AnnouncementCard.tsx',
    replacement: oldCardWarning,
  },
];
