const path = require('path');
const blacklist = require('metro-config/src/defaults/exclusionList');
const homedir = require('os').homedir();

// const config = {
//   root: 'apps/mobile-playground/',
// };

// const projectRoot = path.resolve(__dirname, '');
const projectRoot = path.resolve(homedir, 'Projects', 'design-system');

const extraNodeModules = {
  react: path.join(projectRoot, 'node_modules/react'),
  'react-native': path.join(projectRoot, 'node_modules/react-native'),
};

const metroConfig = {
  projectRoot,
  resetCache: false,
  watchFolders: [
    path.resolve(projectRoot, 'node_modules'),
    path.resolve(projectRoot, 'packages'),
    path.resolve(projectRoot, 'apps/mobile-playground/src'),
  ],
  resolver: {
    blacklistRE: blacklist([/dist\/@cb\/.*/, /dist\/package.json/]),
    resolveMainFields: ['react-native', 'browser', 'main'],
    sourceExts: ['cjs', 'ts', 'tsx', 'js', 'jsx', 'json'],
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
