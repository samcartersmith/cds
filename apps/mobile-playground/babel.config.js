const cdsMobilePackageConfig = require('../../packages/mobile/babel.config');

const isTestEnv = process.env.NODE_ENV === 'test';

// this enforces the same build & jest babel as cds-mobile to help identify mobile build errors in a local environment,
// but we only use the reanimated plugin for mobile-playground. This enables our consumer to transpile the worklets required for their build env.
const plugins = isTestEnv
  ? cdsMobilePackageConfig.plugins
  : [...cdsMobilePackageConfig.plugins, 'react-native-reanimated/plugin'];

const playgroundConfig = {
  presets: [...cdsMobilePackageConfig.presets],
  plugins,
};
module.exports = playgroundConfig;
