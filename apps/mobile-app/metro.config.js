const cbConfig = require('@cbhq/metro-config');
const { getDefaultConfig } = require('expo/metro-config');
const { mergeConfig } = require('@react-native/metro-config');
const metroResolver = require('metro-resolver');

// Learn more https://docs.expo.io/guides/customizing-metro
const expoConfig = getDefaultConfig(__dirname);

const pkgCache = {};

const getBaseModule = (moduleName) => {
  const parts = moduleName.split('/');
  if (!moduleName.startsWith('@')) return parts[0];
  return `${parts[0]}/${parts[1]}`;
};

const loadPackageJson = (pkgPath) => {
  if (!pkgCache[pkgPath]) pkgCache[pkgPath] = require(pkgPath);
  return pkgCache[pkgPath];
};

const cbResolveRequest = cbConfig.resolver.resolveRequest;

// Configure Expo's default Metro resolver to use the `metroSrc` field in a module's package.json
expoConfig.resolver.resolverMainFields = ['metroSrc', ...expoConfig.resolver.resolverMainFields];

/**
 * This custom Metro resolver will skip using the @cbhq/metro-config resolver when the module's
 * package.json includes the `metroSrc` field. This allows us to use the `metroSrc` field to point
 * to the package's source code, rather than the built package's entry point via `exports`.
 */
const customResolveRequest = (context, baseModuleName, platform) => {
  const resolveRequestInner = context.resolveRequest;
  const moduleName = context.redirectModulePath(baseModuleName);

  if (!moduleName || !moduleName.startsWith('@cb'))
    return cbResolveRequest(context, baseModuleName, platform);

  const pkgPath = require.resolve(`${getBaseModule(moduleName)}/package.json`);
  const pkg = loadPackageJson(pkgPath);

  if (!('metroSrc' in pkg)) return cbResolveRequest(context, baseModuleName, platform);

  if (resolveRequestInner) return resolveRequestInner(context, moduleName, platform);

  delete context.resolveRequest;
  return metroResolver.resolve(context, moduleName, platform);
};

// Only use our custom resolver when not running in CI or production
if (process.env.CI !== 'true' && process.env.NODE_ENV !== 'production') {
  console.log(
    'Using custom Metro resolver: looking for "metroSrc" field in package.json to resolve source code',
  );
  cbConfig.resolver.resolveRequest = customResolveRequest;
} else
  console.log(
    'Not using custom Metro resolver: all packages will be resolved via "exports" (and so must be built)',
  );

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const metroConfig = mergeConfig(expoConfig, cbConfig);

module.exports = metroConfig;
