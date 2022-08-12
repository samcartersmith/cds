import { arrayToObject } from '@cbhq/cds-utils/array';
import { mapValues } from '@cbhq/cds-utils/object';

import { responsiveClassName } from './constants';

const visibilityValues = ['hidden', 'visible'];

export const visibilityStylesForDevice = (deviceMq: string) => ({
  visibility: mapValues(arrayToObject(visibilityValues), (value) => {
    return `
            @media (${deviceMq}) {
              &.${responsiveClassName} {
                visibility: ${value}
              }
            }
          `;
  }),
});

export const visibilityConfig = {
  web: {
    visibility: mapValues(arrayToObject(visibilityValues), (value) => `visibility: ${value}`),
  },
  typescript: [
    {
      dest: 'common/types/Visibility.ts',
      data: {
        types: {
          Visibility: visibilityValues,
        },
      },
    },
  ],
};
