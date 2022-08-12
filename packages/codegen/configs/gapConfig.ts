import { arrayToObject } from '@cbhq/cds-utils/array';
import { mapValues } from '@cbhq/cds-utils/object';

import { escape } from '../Spacing';

import { responsiveClassName } from './constants';
import { spacingScale } from './spacingConfig';

export const gapStylesForDevice = (deviceMq: string) => ({
  gap: mapValues(arrayToObject(spacingScale), (spacing) => {
    const escapedPadding = `var(--spacing-${escape(spacing)})`;
    return `
            @media (${deviceMq}) {
              &.${responsiveClassName}{
                gap: ${escapedPadding}
              }
            }
          `;
  }),
});

export const gapConfig = {
  web: {
    gap: mapValues(
      arrayToObject(spacingScale),
      (spacing) => `gap: var(--spacing-${escape(spacing)})`,
    ),
  },
};
