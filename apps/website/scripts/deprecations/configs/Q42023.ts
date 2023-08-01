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
  ],
};
