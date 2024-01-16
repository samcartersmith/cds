import { FunctionMigration } from '../../../helpers';

export const functionMigrations: FunctionMigration[] = [
  {
    name: 'useIsMobile',
    path: { '@cbhq/cds-web/hooks/useIsMobile': '@cbhq/cds-web/hooks/useBreakpoints' },
    replacement: 'useBreakpoints',
  },
  {
    name: 'buttonBuilderDeprecated',
    path: {
      '@cbhq/cds-common/internal/buttonBuilderDeprecated':
        '@cbhq/cds-common/internal/buttonBuilder',
    },
    replacement: 'buttonBuilder',
  },
  {
    name: 'createAnnouncementCardDeprecated',
    path: {
      '@cbhq/cds-common/cards/createAnnouncementCardDeprecated':
        '@cbhq/cds-common/cards/createAnnouncementCard',
    },
    replacement: 'createAnnouncementCard',
  },
  {
    name: 'createFeatureEntryCardDeprecated',
    path: {
      '@cbhq/cds-common/cards/createFeatureEntryCardDeprecated':
        '@cbhq/cds-common/cards/createFeatureEntryCard',
    },
    replacement: 'createFeatureEntryCard',
  },
];

export const removedFunctions: { name: string; path: string; replacement?: string }[] = [
  {
    name: 'useBadge',
    path: '@cbhq/cds-common/hooks/useBadge',
  },
  {
    name: 'useBeta',
    path: '@cbhq/cds-common/beta/useBeta',
  },
  {
    name: 'Animated',
    path: '@cbhq/cds-web/animation/Animated',
    replacement: 'useMotionProps and Framer Motion instead',
  },
  {
    name: 'getIllustrationScaledDimension',
    path: '@cbhq/cds-common/utils/getIllustrationScaledDimension',
    replacement: 'Please use convertDimensionToSize and convertSizeWithMultiplier instead',
  },
];
