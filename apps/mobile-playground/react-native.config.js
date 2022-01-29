// dependencies builder
const data = require('./package.json');

const getReactNativeDependencies = (dependencies) =>
  dependencies.filter(
    (dependency) =>
      (dependency !== 'react-native' && dependency.startsWith('react-native')) ||
      dependency.startsWith('@react-native'),
  );

const allDependencies = Object.keys(data.dependencies);
const rnDependencies = getReactNativeDependencies(allDependencies);

const getExcludedDependencies = (dependencies) =>
  dependencies.length > 0
    ? rnDependencies
        .filter((dependency) => !dependencies.includes(dependency))
        .reduce((prev, next) => {
          prev[next] = {
            platforms: {
              ios: null,
              android: null,
            },
          };
          return prev;
        }, {})
    : {};

const configCreator = (args) => {
  const { iosProject, androidSourceDir, assets = [], dependencies = [] } = args;

  const defaultAssets = ['../../packages/fonts/native'];

  const getConfig = () => {
    return {
      project: {
        ios: {
          project: iosProject,
        },
        android: {
          sourceDir: androidSourceDir,
        },
      },
      assets: [...defaultAssets, ...assets],
      dependencies: getExcludedDependencies(dependencies),
    };
  };

  const getDependencies = () => dependencies;
  const getAssets = () => assets;

  return {
    getAssets,
    getConfig,
    getDependencies,
  };
};

const cdsConfig = configCreator({
  assets: ['../../packages/mobile/icons/font'],
  iosProject: './ios/MobilePlayground.xcodeproj',
  androidSourceDir: './android',
  dependencies: [
    'react-native-gesture-handler',
    'react-native-linear-gradient',
    'react-native-navigation-bar-color',
    'react-native-reanimated',
    'react-native-safe-area-context',
    'react-native-svg',
    'react-native-webview',
    'react-native-inappbrowser-reborn',
  ],
});

// React Native CLI/config doesn't really support multiple projects
// within the same repo, so we need to differentiate through env vars.
// let config = {};

// switch (process.env.RN_PROJECT) {
//   case 'cds': {
//     config = cdsConfig.getConfig();
//     break;
//   }

//   default:
//     throw new Error('Missing RN_PROJECT!');
// }

module.exports = cdsConfig.getConfig();
