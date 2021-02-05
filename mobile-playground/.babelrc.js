const rootBabelConfig = require('../../../../babel.config');

module.exports = api => {
  const config = rootBabelConfig(api);

  return {
    ...config,
    presets: [...config.presets, 'module:metro-react-native-babel-preset'],
  };
};
