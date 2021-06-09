const { extendDefaultPlugins } = require('svgo');

module.exports = {
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
      active: true,
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
      name: 'convertPathData',
      params: {
        floatPrecision: 3,
      },
    },
    {
      name: 'cleanupNumericValues',
      params: {
        floatPrecision: 2,
      },
    },
  ]),
};
