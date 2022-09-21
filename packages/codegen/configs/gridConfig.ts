import { arrayToObject } from '@cbhq/cds-utils/array';
import { mapKeys, mapValues } from '@cbhq/cds-utils/object';

import { responsiveClassName } from './constants';

const numberOfColumns = 12;
const numberOfColumnsAsArray = Array.from({ length: numberOfColumns }).map((_, index) => index + 1);
const colStartValues = [...numberOfColumnsAsArray, 'auto'];
const colEndColumnsAsArray = [...colStartValues, 13, -1];

const createClassNames = <T extends string | number>(arr: T[], cb: (value: T) => string) =>
  mapValues(arrayToObject(arr), (value) => cb(value));

const responsiveGridClassNames = (deviceMq: string) =>
  createClassNames(numberOfColumnsAsArray, (value) => {
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

const gridClassNames = createClassNames(
  numberOfColumnsAsArray,
  (value) => `grid-template-columns: repeat(${value}, minmax(0, 1fr));`,
);

const colStartClassNames = createClassNames(
  colStartValues,
  (value) => `grid-column-start: ${value}`,
);

// we add 13 because grid columns are indexed at 1
// -1 is shorthand for the last column
const colEndClassNames = createClassNames(
  colEndColumnsAsArray,
  (value) => `grid-column-end: ${value}`,
);

const responsiveColumnClassNames = (deviceMq: string, column: 'Start' | 'End') =>
  createClassNames(column === 'End' ? colEndColumnsAsArray : numberOfColumnsAsArray, (value) => {
    return `
            @media (${deviceMq}) {
              &.${responsiveClassName} {
                grid-column-${column}: ${value};
              }
            }
          `;
  });

export const columnStylesForDevice = (deviceMq: string, column: 'Start' | 'End') => ({
  [`col${column}`]: mapKeys(
    responsiveColumnClassNames(deviceMq, column),
    (_, key) => `'col${column}-${key}'`,
  ),
});

export const gridConfig = {
  web: {
    // we prefix all classNames to make debugging easier
    columns: mapKeys(gridClassNames, (_, key) => `'columns-${key}'`),
    colStart: mapKeys(colStartClassNames, (_, key) => `'colStart-${key}'`),
    colEnd: mapKeys(colEndClassNames, (_, key) => `'colEnd-${key}'`),
  },
  typescript: [
    {
      dest: 'packages/common/types/Grid.ts',
      data: {
        types: {
          GridColumn: numberOfColumnsAsArray,
        },
      },
    },
  ],
};
