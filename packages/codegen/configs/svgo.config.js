const { extendDefaultPlugins } = require('svgo');

module.exports = {
  multipass: true,
  plugins: extendDefaultPlugins([
    {
      name: 'cleanupListOfValues',
      active: true,
    },
    {
      name: 'convertStyleToAttrs',
      active: true,
    },
    {
      name: 'removeRasterImages',
      active: false,
    },
    {
      name: 'sortAttrs',
      active: true,
    },
    {
      name: 'removeDimensions',
      active: true,
    },
    {
      name: 'removeAttrs',
      active: true,
    },
    {
      name: 'removeElementsByAttr',
      active: true,
    },
    {
      name: 'removeStyleElement',
      active: true,
    },
    {
      name: 'cleanupNumericValues',
      params: {
        floatPrecision: 2,
      },
    },
  ]),
};
