import { arrayToObject } from '@cbhq/cds-utils/array';
import { mapValues } from '@cbhq/cds-utils/object';

import { responsiveClassName } from './constants';

const numberOfColumns = 12;
const numberOfColumnsAsArray = Array.from({ length: numberOfColumns }).map((_, index) => index + 1);

export const gridStylesForDevice = (deviceMq: string) => ({
  columns: mapValues(arrayToObject(numberOfColumnsAsArray), (value) => {
    return `
            @media (${deviceMq}) {
              &.${responsiveClassName} {
                grid-template-columns: repeat(${value}, minmax(0, 1fr));
              }
            }
          `;
  }),
});

export const gridConfig = {
  web: {
    columns: mapValues(
      arrayToObject(numberOfColumnsAsArray),
      (value) => `grid-template-columns: repeat(${value}, minmax(0, 1fr));`,
    ),
  },
  typescript: [
    {
      dest: 'common/types/Grid.ts',
      data: {
        types: {
          GridColumn: numberOfColumnsAsArray,
        },
      },
    },
  ],
};
