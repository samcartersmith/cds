import { Deprecation } from '../types';

export const Q32023: Deprecation = {
  endOfLife: 'Q32023',
  prevMajorVersion: 'v4.2.1',
  props: [
    {
      name: 'title',
      components: ['CellMedia'],
      package: 'web',
      type: 'replaced',
      migrationMap: {
        api: {
          title: 'accessibilityLabel',
        },
      },
    },
    {
      name: 'title',
      components: ['CellMedia'],
      package: 'mobile',
      type: 'replaced',
      migrationMap: {
        api: {
          title: 'accessibilityLabel and accessibilityHint',
        },
      },
    },
    {
      name: 'alt',
      components: ['HeroSquare', 'Pictogram', 'SpotSquare', 'SpotRectangle'],
      package: 'mobile',
      type: 'replaced',
      migrationMap: {
        api: {
          alt: 'accessibilityLabel and accessibilityHint',
        },
      },
    },
  ],
};
