import { arrayToObject, kebabCase } from '@cbhq/cds-utils';
import { mapValues } from '@cbhq/cds-utils/object';

const flexStyles = [
  'alignContent',
  'alignItems',
  'alignSelf',
  'flexDirection',
  'flexWrap',
  'justifyContent',
] as const;

type FlexStyle = typeof flexStyles[number];

// shared values
const flexAxisValue = ['flex-start', 'flex-end', 'center'];
const flexAlignCommon = [...flexAxisValue, 'stretch'];
const flexSpaceCommon = ['space-between', 'space-around'];

// styles
export const flexStyleMap: Record<FlexStyle, string[]> = {
  alignContent: [...flexAlignCommon, ...flexSpaceCommon],
  alignItems: [...flexAlignCommon, 'baseline'],
  alignSelf: [...flexAlignCommon, 'baseline', 'auto'],
  flexDirection: ['row', 'column', 'row-reverse', 'column-reverse'],
  flexWrap: ['wrap', 'nowrap', 'wrap-reverse'],
  justifyContent: [...flexAxisValue, ...flexSpaceCommon, 'space-evenly'],
};

const generateStyles = (style: FlexStyle, values: string[]) =>
  mapValues(arrayToObject(values), (value) => `${[kebabCase(style)]}: ${value}`);

export const flexStylesForDevice = (deviceMq: string, style: FlexStyle) => ({
  [style]: mapValues(arrayToObject(flexStyleMap[style]), (value) => {
    return `
            @media (${deviceMq}) {
             ${[kebabCase(style)]}: ${value}
            }
          `;
  }),
});

const generateFlexClassNames = mapValues(flexStyleMap, (value, key) => generateStyles(key, value));

export const flexConfig = {
  web: generateFlexClassNames,
};
