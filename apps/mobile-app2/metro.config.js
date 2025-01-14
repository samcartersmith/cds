const cbConfig = require('@cbhq/metro-config');
const { getDefaultConfig } = require('expo/metro-config');
const { mergeConfig } = require('@react-native/metro-config');
const path = require('node:path');

// Learn more https://docs.expo.io/guides/customizing-metro
const expoConfig = getDefaultConfig(__dirname);

const getBaseModule = (moduleName) => {
  const parts = moduleName.split('/');
  if (!moduleName.startsWith('@')) return parts[0];
  return `${parts[0]}/${parts[1]}`;
};

const cbResolveRequest = cbConfig.resolver.resolveRequest;

const aliases = {
  '@cbhq/cds-common2': path.resolve(__dirname, '../../packages/cds-common2/src'),
  '@cbhq/cds-common': path.resolve(__dirname, '../../packages/common/src'),
  '@cbhq/cds-fonts': path.resolve(__dirname, '../../packages/fonts/src'),
  '@cbhq/cds-icons': path.resolve(__dirname, '../../packages/icons/src'),
  '@cbhq/cds-illustrations': path.resolve(__dirname, '../../packages/illustrations/src'),
  '@cbhq/cds-lottie-files': path.resolve(__dirname, '../../packages/lottie-files/src'),
  '@cbhq/cds-mobile2': path.resolve(__dirname, '../../packages/cds-mobile2/src'),
  '@cbhq/cds-mobile-visualization': path.resolve(
    __dirname,
    '../../packages/mobile-visualization/src',
  ),
  '@cbhq/cds-utils': path.resolve(__dirname, '../../packages/utils/src'),
  '@cbhq/ui-mobile-playground2': path.resolve(
    __dirname,
    '../../packages/ui-mobile-playground2/src',
  ),
  '@cbhq/ui-mobile-visreg': path.resolve(__dirname, '../../packages/ui-mobile-visreg/src'),
};

// This custom Metro resolver will try to use the aliases defined above.
const customResolveRequest = (context, baseModuleName, platform) => {
  const moduleName = context.redirectModulePath(baseModuleName);
  const baseModule = moduleName && getBaseModule(moduleName);

  if (baseModule && aliases[baseModule]) {
    const aliasPath = moduleName.replace(baseModule, aliases[baseModule]);
    return context.resolveRequest(context, aliasPath, platform);
  }

  return cbResolveRequest(context, baseModuleName, platform);
};

// Only use our custom resolver when not running in CI or production
if (
  process.env.CI !== 'true' &&
  process.env.NODE_ENV !== 'production' &&
  process.env.CDS_METRO_RESOLVER !== 'false'
) {
  console.log(
    'Using custom Metro resolver: mapping some packages to source code via "aliases" in metro.config.js',
  );
  cbConfig.resolver.resolveRequest = customResolveRequest;
} else
  console.log(
    'No custom Metro resolver: packages will be resolved via package.json "exports" (and so must be built)',
  );

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const metroConfig = mergeConfig(expoConfig, cbConfig);

module.exports = metroConfig;
