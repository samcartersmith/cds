const baseConfig = require('../../babel.config');

module.exports = {
  presets: [...baseConfig.presets, 'module:metro-react-native-babel-preset'],
  plugins: ['react-native-reanimated/plugin'],
};
