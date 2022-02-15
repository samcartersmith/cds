const path = require('path');
const blacklist = require('metro-config/src/defaults/exclusionList');

const projectRoot = __dirname;

const extraNodeModules = {
  react: path.join(projectRoot, '../../node_modules/react'),
  'react-native': path.join(projectRoot, '../../node_modules/react-native'),
};

const metroConfig = {
  projectRoot,
  resetCache: true,
  watchFolders: [
    path.resolve(projectRoot, '../../node_modules'),
    path.resolve(projectRoot, '../../packages'),
    path.resolve(projectRoot, 'src'),
  ],
  resolver: {
    blacklistRE: blacklist([/dist\/@cb\/.*/, /dist\/package.json/]),
    resolveMainFields: ['react-native', 'browser', 'main'],
    sourceExts: ['cjs', 'ts', 'tsx', 'js', 'jsx', 'json', 'd.ts'],
    useWatchman: false,
    extraNodeModules,
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
