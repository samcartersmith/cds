import { arrayToObject, kebabCase } from '@cbhq/cds-utils';
import { mapValues } from '@cbhq/cds-utils/object';

const flexStyles = [
  'alignContent',
  'alignItems',
  'alignSelf',
  'flexDirection',
  'flexWrap',
  'justifyContent',
  'flexShrink',
  'flexGrow',
] as const;

const flexShrink = [1, 2, 3];
const flexGrow = [1, 2, 3];

type FlexStyle = typeof flexStyles[number];

// shared values
const flexAxisValue = ['flex-start', 'flex-end', 'center'];
const flexAlignCommon = [...flexAxisValue, 'stretch'];
const flexSpaceCommon = ['space-between', 'space-around'];

// styles
export const flexStyleMap: Record<FlexStyle, string[] | number[]> = {
  alignContent: [...flexAlignCommon, ...flexSpaceCommon],
  alignItems: [...flexAlignCommon, 'baseline'],
  alignSelf: [...flexAlignCommon, 'baseline', 'auto'],
  flexDirection: ['row', 'column', 'row-reverse', 'column-reverse'],
  flexWrap: ['wrap', 'nowrap', 'wrap-reverse'],
  justifyContent: [...flexAxisValue, ...flexSpaceCommon, 'space-evenly'],
  flexShrink,
  flexGrow,
};

const generateStyles = <T extends string | number>(style: FlexStyle, values: T[]) =>
  mapValues(arrayToObject(values), (value) => `${[kebabCase(style)]}: ${value}`);

export const flexStylesForDevice = <T extends string | number>(
  deviceMq: string,
  style: FlexStyle,
) => ({
  [style]: mapValues(arrayToObject(flexStyleMap[style] as T[]), (value) => {
    return `
            @media (${deviceMq}) {
             ${[kebabCase(style)]}: ${value}
            }
          `;
  }),
});

const generateFlexClassNames = <T extends string | number>() =>
  mapValues(flexStyleMap, (value, key) => generateStyles(key, value as T[]));

export const flexConfig = {
  web: generateFlexClassNames(),
};
