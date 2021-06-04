const rootBabelConfig = require('../../../../babel.config');

module.exports = api => {
  const config = rootBabelConfig(api);

  return {
    ...config,
    plugins: [...config.plugins, ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }]],
    presets: ['module:metro-react-native-babel-preset', ...config.presets],
  };
};
