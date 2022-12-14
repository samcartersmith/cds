import { arrayToObject, mapValues, toCssVarFn } from '@cbhq/cds-utils/index';

import { responsiveClassName } from './configs/constants';
import { spacingConfig, spacingDirections, spacingScale } from './configs/spacingConfig';

export const escape = <T extends number>(input: T) => String(input).replace('.', '\\\\.') as `${T}`;

// JSON.stringify in objectMap double escapes escaped strings so have to escape with only 2 backslashes
const cssVariables = mapValues(arrayToObject(spacingScale), (_, key) =>
  toCssVarFn(`spacing-${key}`).replace('.', '\\.'),
);

export const paddingStylesForDevice = (device: string) => {
  return {
    padding: mapValues(arrayToObject(spacingDirections), (direction) => {
      return mapValues(arrayToObject(spacingScale), (spacing) => {
        const fullAttribute = `padding${direction === 'all' ? '' : `-${direction}`}`;
        const escapedPadding = `var(--spacing-${escape(spacing)})`;
        return `
          @media (${device}) {
            &.${responsiveClassName} {
              ${[fullAttribute]}: ${escapedPadding}
            }
          }
        `;
      });
    }),
  };
};
export const marginStylesForDevice = (device: string) => {
  return {
    margin: mapValues(arrayToObject(spacingDirections), (direction) => {
      return mapValues(arrayToObject(spacingScale), (spacing) => {
        const fullAttribute = `margin${direction === 'all' ? '' : `-${direction}`}` as const;
        const escapedMargin = `calc(-1 * var(--spacing-${escape(spacing)}))` as const;
        return `
          @media (${device}) {
            ${[fullAttribute]}: ${escapedMargin}
          }
        `;
      });
    }),
  };
};

export const Spacing = {
  css: (attribute: 'padding' | 'margin') => {
    return mapValues(arrayToObject(spacingDirections), (direction) => {
      return mapValues(arrayToObject(spacingScale), (spacing) => {
        const fullAttribute = `${attribute}${direction === 'all' ? '' : `-${direction}`}` as const;
        const escapedPadding = `var(--spacing-${escape(spacing)})` as const;
        const escapedMargin = `calc(-1 * var(--spacing-${escape(spacing)}))` as const;
        const value = attribute === 'padding' ? escapedPadding : escapedMargin;
        return `${fullAttribute}: ${value}`;
      });
    });
  },
  scaleCss: mapValues(spacingConfig, (scaleFunc) =>
    Object.fromEntries(
      spacingScale.map((size) => [`--spacing-${escape(size)}`, `${scaleFunc(size)}px`]),
    ),
  ),
  mobile: mapValues(spacingConfig, (scaleFunc) =>
    Object.fromEntries(spacingScale.map((size) => [size, scaleFunc(size)])),
  ),
  cssVariables,
};
