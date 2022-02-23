module.exports = {
  multipass: true,
  plugins: [
    // set of built-in plugins enabled by default
    'preset-default',
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
  ],
};
