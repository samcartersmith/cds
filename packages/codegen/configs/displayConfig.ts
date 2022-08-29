import { arrayToObject } from '@cbhq/cds-utils/array';
import { mapValues } from '@cbhq/cds-utils/object';

import { responsiveClassName } from './constants';

/**
 * @link https://developer.mozilla.org/en-US/docs/Web/CSS/display
 * support all display values except for two-value syntax, flow, revert, and unset
 */
const displayValues = ['block', 'inline-block', 'flex', 'inline-flex', 'none', 'contents', 'grid'];

export const displayStylesForDevice = (deviceMq: string) => ({
  display: mapValues(arrayToObject(displayValues), (value) => {
    return `
            @media (${deviceMq}) {
              &.${responsiveClassName} {
                display: ${value}
              }
            }
          `;
  }),
});

export const displayConfig = {
  web: {
    display: mapValues(arrayToObject(displayValues), (value) => `display: ${value}`),
  },
  typescript: [
    {
      dest: 'common/types/Display.ts',
      data: {
        types: {
          Display: displayValues,
        },
      },
    },
  ],
};
