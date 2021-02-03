import { SpacingScale, spacingScale } from '@cds/common';
import { mapValues } from '@cds/utils';

import { spacingConfig } from './configs/spacingConfig';

const escape = (input: number) => String(input).replace('.', '\\\\.');

const directions = ['all', 'top', 'bottom', 'left', 'right'] as const;
type SpacingDirection = typeof directions[number];

export const Spacing = {
  css: (attribute: 'padding' | 'margin'): Record<SpacingDirection, Record<SpacingScale, string>> =>
    directions.reduce((map, suffix) => {
      map[suffix] = spacingScale.reduce((cssMap, spacing) => {
        const fullAttribute = `${attribute}${suffix === 'all' ? '' : `-${suffix}`}`;
        const value =
          attribute === 'padding'
            ? `var(--spacing-${escape(spacing)})`
            : `calc(-1 * var(--spacing-${escape(spacing)}))`;
        cssMap[spacing] = `css\`
          ${fullAttribute}: ${value}
        \``;
        return cssMap;
      }, {} as Record<SpacingScale, string>);
      return map;
    }, {} as Record<SpacingDirection, Record<SpacingScale, string>>),
  scaleCss: mapValues(spacingConfig, scaleFunc =>
    Object.fromEntries(
      spacingScale.map(size => [`--spacing-${escape(size)}`, `${scaleFunc(size)}px`])
    )
  ),
  native: mapValues(spacingConfig, scaleFunc =>
    Object.fromEntries(spacingScale.map(size => [size, scaleFunc(size)]))
  ),
};
