const baseConfig = require('../../babel.config');

const isTestEnv = process.env.NODE_ENV === 'test';

const sharedMobileConfig = {
  presets: ['module:metro-react-native-babel-preset', '@babel/preset-typescript'],
};

// We need the rn reanimated plugin to correctly test animated components, however we do NOT want it in our compiled package for consumers.
// This enables our consumer to transpile the worklets based on their Reanimated version.
const plugins = isTestEnv ? ['react-native-reanimated/plugin'] : [...baseConfig.plugins];

module.exports = {
  presets: [
    ...sharedMobileConfig.presets,
    ['@babel/preset-react', { runtime: isTestEnv ? 'automatic' : 'classic' }],
  ],
  plugins,
};
