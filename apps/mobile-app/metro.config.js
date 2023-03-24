const { resolveRequest } = require('@cbhq/metro-config/resolveRequest');
const { getDefaultConfig } = require('expo/metro-config');

// Learn more https://docs.expo.io/guides/customizing-metro
const expoConfig = getDefaultConfig(__dirname);

/**
 * @type {import('metro-config').InputConfigT}
 */
const metroConfig = {
  ...expoConfig,
  resolver: {
    ...expoConfig.resolver,
    resolveRequest,
  },
};

module.exports = metroConfig;
