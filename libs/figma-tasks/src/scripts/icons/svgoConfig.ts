import type { Config } from 'svgo';

import defaultSvgoConfig from '../../helpers/image/svgoConfig';

/** https://github.com/svg/svgo/blob/main/plugins/_collections.js#L2161 */
const colorsProps = ['color', 'fill', 'stroke', 'stop-color', 'flood-color', 'lighting-color'];

const svgoConfig: Config = {
  ...defaultSvgoConfig,
  plugins: [
    ...(defaultSvgoConfig.plugins ?? []),
    {
      /**
       * Ensure all fills from Figma are converted to be blue so we are able to differentiate the original svg from the icon font in Percy.
       * This has no impact on how the icon font ultimately renders. Once the svg is converted to a glyph within the icon font,
       * the icon will take on color applied to the Text it is rendered in.
       * This is a simplified version of https://github.com/svg/svgo/blob/main/plugins/convertColors.js
       */
      name: 'customColorPlugin',
      fn: () => {
        return {
          element: {
            enter: (node) => {
              Object.entries(node.attributes).forEach(([key]) => {
                if (colorsProps.includes(key)) {
                  node.attributes[key] = '#1652F0'; // we have to re-assign to apply change
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
