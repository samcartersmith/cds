import { mapValues, arrayToObject } from '@cbhq/cds-utils';

import { spacingConfig, spacingScaleWithoutZero, spacingDirections } from './configs/spacingConfig';

const escape = <T extends number>(input: T) => String(input).replace('.', '\\\\.') as `${T}`;

export const Spacing = {
  css: (attribute: 'padding' | 'margin') => {
    return mapValues(arrayToObject(spacingDirections), direction => {
      return mapValues(arrayToObject(spacingScaleWithoutZero), spacing => {
        const fullAttribute = `${attribute}${direction === 'all' ? '' : `-${direction}`}` as const;
        const escapedPadding = `var(--spacing-${escape(spacing)})` as const;
        const escapedMargin = `calc(-1 * var(--spacing-${escape(spacing)}))` as const;
        const value = attribute === 'padding' ? escapedPadding : escapedMargin;
        return `css\`
            ${fullAttribute}: ${value}
          \``;
      });
    });
  },
  scaleCss: mapValues(spacingConfig, scaleFunc =>
    Object.fromEntries(
      spacingScaleWithoutZero.map(size => [`--spacing-${escape(size)}`, `${scaleFunc(size)}px`])
    )
  ),
  mobile: mapValues(spacingConfig, scaleFunc =>
    Object.fromEntries(spacingScaleWithoutZero.map(size => [size, scaleFunc(size)]))
  ),
};
