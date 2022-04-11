import { arrayToObject } from '@cbhq/cds-utils/array';
import { mapValues } from '@cbhq/cds-utils/object';

const numberOfColumns = 12;
const numberOfColumnsAsArray = Array.from({ length: numberOfColumns }).map((_, index) => index + 1);

export const gridConfig = {
  cssMap: [
    {
      dest: 'web/styles/grid.ts',
      data: {
        columns: mapValues(
          arrayToObject(numberOfColumnsAsArray),
          (value) => `grid-template-columns: repeat(${value}, minmax(0, 1fr));`,
        ),
      },
    },
  ],
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
