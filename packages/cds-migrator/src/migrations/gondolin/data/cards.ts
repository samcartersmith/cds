import { ComponentMigration } from '../../../helpers';

const sharedConfig = {
  replacement: 'NudgeCard',
  attributeRenameMap: {
    oldAttribute: 'actionLabel',
    newAttribute: 'action',
  },
};

export const cardMigrations: ComponentMigration[] = [
  {
    name: 'FeatureEntryCard',
    path: {
      '@cbhq/cds-mobile/alpha/FeatureEntryCard': '@cbhq/cds-mobile/cards/NudgeCard',
    },
    ...sharedConfig,
  },
  {
    name: 'FeatureEntryCard',
    path: {
      '@cbhq/cds-mobile/cards/FeatureEntryCard': '@cbhq/cds-mobile/cards/NudgeCard',
    },
    ...sharedConfig,
  },
  {
    name: 'FeatureEntryCard',
    path: {
      '@cbhq/cds-web/alpha/FeatureEntryCard': '@cbhq/cds-web/cards/NudgeCard',
    },
    ...sharedConfig,
  },
  {
    name: 'FeatureEntryCard',
    path: {
      '@cbhq/cds-web/cards/FeatureEntryCard': '@cbhq/cds-web/cards/NudgeCard',
    },
    ...sharedConfig,
  },
  {
    name: 'AnnouncementCard',
    path: {
      '@cbhq/cds-mobile/alpha/AnnouncementCard': '@cbhq/cds-mobile/cards/NudgeCard',
    },
    ...sharedConfig,
  },
  {
    name: 'AnnouncementCard',
    path: {
      '@cbhq/cds-mobile/cards/AnnouncementCard': '@cbhq/cds-mobile/cards/NudgeCard',
    },
    ...sharedConfig,
  },
  {
    name: 'AnnouncementCard',
    path: {
      '@cbhq/cds-web/alpha/AnnouncementCard': '@cbhq/cds-web/cards/NudgeCard',
    },
    ...sharedConfig,
  },
  {
    name: 'AnnouncementCard',
    path: {
      '@cbhq/cds-web/cards/AnnouncementCard': '@cbhq/cds-web/cards/NudgeCard',
    },
    ...sharedConfig,
  },
];

export const removedProps = ['spotSquare', 'image', 'media', 'mediaPlacement'];
