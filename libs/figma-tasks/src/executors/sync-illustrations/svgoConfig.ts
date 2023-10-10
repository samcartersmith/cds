import type { Config } from 'svgo';
import { color } from '@cbhq/d3/color';

import defaultSvgoConfig from '../../helpers/image/svgoConfig';

/** https://github.com/svg/svgo/blob/main/plugins/_collections.js#L2161 */
const colorsProps = ['color', 'fill', 'stroke', 'stop-color', 'flood-color', 'lighting-color'];

function colorTo6DigitUppercaseHex(val: string) {
  const hex = color(val)?.formatHex();
  return hex?.toUpperCase();
}

const svgoConfig: Config = {
  ...defaultSvgoConfig,
  plugins: [
    ...(defaultSvgoConfig.plugins ?? []),
    {
      /**
       * Ensure all fills are uppercase 6 digit hex values.
       * This is a simplified version of https://github.com/svg/svgo/blob/main/plugins/convertColors.js
       */
      name: 'customColorPlugin',
      fn: () => {
        return {
          element: {
            enter: (node) => {
              Object.entries(node.attributes).forEach(([key, value]) => {
                if (colorsProps.includes(key)) {
                  const hex = colorTo6DigitUppercaseHex(value);
                  if (hex) {
                    // eslint-disable-next-line no-param-reassign
                    node.attributes[key] = hex; // we have to re-assign to apply change
                  }
                }
              });
            },
          },
        };
      },
    },
  ],
};

export default svgoConfig;
