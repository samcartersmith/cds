import { arrayToObject } from '@cbhq/cds-utils/array';
import { mapKeys, mapValues } from '@cbhq/cds-utils/object';

import { responsiveClassName } from './constants';

const numberOfColumns = 12;
const numberOfColumnsAsArray = Array.from({ length: numberOfColumns }).map((_, index) => index + 1);

const responsiveGridClassNames = (deviceMq: string) =>
  mapValues(arrayToObject(numberOfColumnsAsArray), (value) => {
    return `
            @media (${deviceMq}) {
              &.${responsiveClassName} {
                grid-template-columns: repeat(${value}, minmax(0, 1fr));
              }
            }
          `;
  });

export const gridStylesForDevice = (deviceMq: string) => ({
  columns: mapKeys(responsiveGridClassNames(deviceMq), (_, key) => `'columns-${key}'`),
});

const gridClassNames = mapValues(
  arrayToObject(numberOfColumnsAsArray),
  (value) => `grid-template-columns: repeat(${value}, minmax(0, 1fr));`,
);
mapValues(
  arrayToObject(numberOfColumnsAsArray),
  (value) => `grid-template-columns: repeat(${value}, minmax(0, 1fr));`,
);

export const gridConfig = {
  web: {
    columns: mapKeys(gridClassNames, (_, key) => `'columns-${key}'`),
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
