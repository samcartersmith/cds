const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const blacklist = require('metro-config/src/defaults/exclusionList');
const { resolveRequest } = require('@cbhq/metro-config/resolveRequest');

const projectRoot = __dirname;

const metroConfig = {
  resetCache: true,
  watchFolders: [
    path.resolve(projectRoot, '../../node_modules'),
    path.resolve(projectRoot, '../../packages'),
    path.resolve(projectRoot, 'src'),
  ],
  resolver: {
    resolveRequest,
    blacklistRE: blacklist([/dist\/@cb\/.*/, /dist\/package.json/]),
    resolveMainFields: ['react-native', 'browser', 'main'],
    sourceExts: ['cjs', 'ts', 'tsx', 'js', 'jsx', 'json', 'd.ts'],
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};

module.exports = metroConfig;
