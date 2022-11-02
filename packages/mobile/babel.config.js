const baseConfig = require('../../babel.config');

const isTestEnv = process.env.NODE_ENV === 'test';

const sharedMobileConfig = {
  plugins: ['react-native-reanimated/plugin'],
  presets: ['module:metro-react-native-babel-preset', '@babel/preset-typescript'],
};

const plugins = isTestEnv
  ? sharedMobileConfig.plugins
  : [...baseConfig.plugins, ...sharedMobileConfig.plugins];

module.exports = {
  presets: [
    ...sharedMobileConfig.presets,
    ['@babel/preset-react', { runtime: isTestEnv ? 'automatic' : 'classic' }],
  ],
  plugins,
};
