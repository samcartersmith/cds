import { Deprecation } from '../types';

export const Q42023: Deprecation = {
  endOfLife: 'Q42023',
  prevMajorVersion: 'v6.0.0',
  components: [
    {
      package: 'mobile',
      name: 'FiatIcon',
      type: ['replaced'],
      path: 'packages/mobile/icons/FiatIcon.tsx',
      scope: {
        exportNames: ['FiatIcon'],
      },
      migrationMap: {
        replaced: 'Icon',
      },
    },
    {
      package: 'web',
      name: 'Illustration',
      type: ['replaced'],
      path: 'packages/web/illustrations/Illustration.tsx',
      scope: {
        exportNames: ['Illustration'],
      },
      migrationMap: {
        replaced: ['Pictogram', 'HeroSquare', 'SpotSquare', 'SpotRectangle'],
      },
    },
    {
      package: 'mobile',
      name: 'Illustration',
      type: ['replaced'],
      path: 'packages/mobile/illustrations/Illustration.tsx',
      scope: {
        exportNames: ['Illustration'],
      },
      migrationMap: {
        replaced: ['Pictogram', 'HeroSquare', 'SpotSquare', 'SpotRectangle'],
      },
    },
  ],
  tokens: [
    {
      path: 'packages/web/illustrations/Illustration.tsx',
      name: 'versionMaps',
      package: 'web',
      exportNames: ['versionMaps'],
      type: 'removed',
      migrationMap: {
        replaced: '@cbhq/cds-illustrations/generated/**illustration type**/data/versionMap',
      },
    },
  ],
};
