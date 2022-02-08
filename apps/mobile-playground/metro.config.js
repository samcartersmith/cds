const path = require('path');

// const config = {
//   root: 'apps/mobile-playground/',
// };

// const projectRoot = path.resolve(__dirname, '');

const metroConfig = {
  // projectRoot,
  resetCache: false,
  watchFolders: [
    path.resolve(__dirname, '../../node_modules'),
    path.resolve(__dirname, '../../packages'),
  ],
  resolver: {
    resolveMainFields: ['react-native', 'browser', 'main'],
    sourceExts: ['cjs', 'ts', 'tsx', 'js', 'jsx', 'json'],
    useWatchman: false,
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
