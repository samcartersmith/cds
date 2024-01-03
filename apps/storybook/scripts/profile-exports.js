/* eslint-disable no-console */
const path = require('node:path');
const fs = require('node:fs');
// eslint-disable-next-line import/no-extraneous-dependencies
const { globSync } = require('glob');

const MONOREPO_ROOT = process.env.PROJECT_CWD ?? process.env.NX_MONOREPO_ROOT;

if (!MONOREPO_ROOT) throw Error('MONOREPO_ROOT was undefined');

const BUILD_DIR = path.resolve(MONOREPO_ROOT, '.nx/dist/packages');

const TEMP_NODE_MODULES = path.resolve(__dirname, 'node_modules');

const WEB_EXPORTS = [
  './AccessibilityAnnouncer/AccessibilityAnnouncer',
  './accordion',
  './animation',
  './banner/Banner',
  './buttons',
  './buttons/buttonStyles',
  './cards',
  './cells',
  './chips',
  './collapsible',
  './color/useAccessibleForeground',
  './color/useAccessibleForegroundGradient',
  './color/usePaletteToCssVars',
  './color/usePaletteValueToRgbaString',
  './color/useSpectrumClassName',
  './color/useSpectrumClassNameForFrontier',
  './controls',
  './dots',
  './dots/dotStyles',
  './dropdown',
  './hooks/internal/useInternalSpacingStyles',
  './hooks/useA11yControlledVisibility',
  './hooks/useA11yLabels',
  './hooks/useBoundingClientRect',
  './hooks/useBreakpoints',
  './hooks/useButtonSpacing',
  './hooks/useCheckboxGroupState',
  './hooks/useComputedStyleForClassName',
  './hooks/useDeviceSpectrum',
  './hooks/useDimensions',
  './hooks/useElevationStyles',
  './hooks/useEventHandler',
  './hooks/useFlushStyles',
  './hooks/useHasMounted',
  './hooks/useInterpolate',
  './hooks/useIsBrowser',
  './hooks/useIsoEffect',
  './hooks/useOffsetStyles',
  './hooks/usePalette',
  './hooks/usePinStyles',
  './hooks/usePopoverA11y',
  './hooks/useRemoteImageSrc',
  './hooks/useResponsiveCellSpacing',
  './hooks/useResponsiveConfig',
  './hooks/useScrollBlocker',
  './hooks/useSpacingScale',
  './hooks/useSpacingStyles',
  './hooks/useSpacingValue',
  './hooks/useTriggerFocus',
  './icons',
  './icons/iconStyles',
  './illustrations',
  './layout',
  './loaders',
  './loaders/styles',
  './media/Avatar',
  './media/Hexagon',
  './media/RemoteImage',
  './media/RemoteImageGroup',
  './motion/AnimatedCaret',
  './motion/ColorSurge',
  './motion/Pulse',
  './motion/Shake',
  './motion/types',
  './motion/useMotionProps',
  './motion/utils',
  './navigation',
  './overlays',
  './overlays/alertStyles',
  './overlays/Modal/fullscreenModalStyles',
  './overlays/Modal/modalStyles',
  './overlays/toastStyles',
  './overlays/tooltipStyles',
  './styles/backgroundColor',
  './styles/border',
  './styles/borderColor',
  './styles/borderRadius',
  './styles/borderWidth',
  './styles/disabledState',
  './styles/display',
  './styles/flex',
  './styles/focus',
  './styles/foregroundColor',
  './styles/gap',
  './styles/global',
  './styles/gradient',
  './styles/grid',
  './styles/margin',
  './styles/overflow',
  './styles/padding',
  './styles/pin',
  './styles/position',
  './styles/responsive',
  './styles/responsiveSpacing',
  './styles/scale',
  './styles/spectrum',
  './styles/typography',
  './styles/visibility',
  './styles/visuallyHidden',
  './system/BreakpointsProvider',
  './system/BrowserOnly',
  './system/ButtonOrLink',
  './system/DevicePreferencesProvider',
  './system/EventHandlerProvider',
  './system/FeatureFlagContext',
  './system/FeatureFlagProvider',
  './system/Interactable',
  './system/interactableCSSProperties',
  './system/Pressable',
  './system/PressableOpacity',
  './system/RootScaleProvider',
  './system/RootSpectrumProvider',
  './system/ThemeProvider',
  './system/useFeatureFlag',
  './system/useFeatureFlags',
  './system/useFeatureFlagUpdater',
  './system/useThemeProviderStyles',
  './tables',
  './tabs',
  './tag/Tag',
  './tag/tagSpacingStyles',
  './tokens',
  './types',
  './typography',
  './typography/textStyles',
  './utils/browser',
  './utils/eventHandlers',
  './utils/getComputedStyleForClassName',
  './utils/getResponsiveSpacingStyles',
  './utils/globalMatchMediaListener',
  './utils/isRtl',
  './utils/linaria',
  './utils/mediaQueryListener',
  './utils/overflow',
  './utils/palette',
  './utils/storybook',
  './utils/storybookParams/percy',
  './utils/types',
  './version',
  './visualizations',
];

// Delete temp node_modules on exit to prevent any accidental misuse
const cleanup = () => {
  if (fs.existsSync(TEMP_NODE_MODULES)) fs.rmSync(TEMP_NODE_MODULES, { recursive: true });
};

process.on('exit', (message) => {
  console.log(message);
  cleanup();
});

process.on('uncaughtException', (error) => {
  console.log(error);
  cleanup();
  throw error;
});

cleanup();
fs.mkdirSync(TEMP_NODE_MODULES);

const builtPackagePaths = globSync(`${BUILD_DIR}/*/`);

const copyToTempNodeModules = (packagePath) => {
  const moduleName = `@cbhq/cds-${path.basename(packagePath)}`;
  const tempModulePath = path.resolve(TEMP_NODE_MODULES, moduleName);
  fs.cpSync(packagePath, tempModulePath, { recursive: true });
};

// Copy built packages from .nx/dist/packages/ into temp node_modules
builtPackagePaths.forEach(copyToTempNodeModules);

const jsFilePaths = globSync(`${TEMP_NODE_MODULES}/**/*.js`);

const removeCssRequires = (jsFilePath) => {
  const contents = fs.readFileSync(jsFilePath, 'utf-8');
  const newContents = contents.replaceAll(/^require\(".*\.css"\);$/gm, '');
  fs.writeFileSync(jsFilePath, newContents);
};

// Remove .css file require() from all .js files
jsFilePaths.forEach(removeCssRequires);

// Evaluate import runtime costs (e.g. the duration of any side effects)
const profileExport = (exportPath) => {
  const exportName = exportPath.replace('./', '');
  const moduleName = `@cbhq/cds-web/${exportName}`;
  const before = Date.now();
  // eslint-disable-next-line global-require, import/no-dynamic-require, no-unused-vars, @typescript-eslint/no-unused-vars
  const importedModule = require(moduleName);
  const after = Date.now();
  const message = `${`${moduleName} `.padEnd(90, '.')} ${after - before} ms`;
  return message;
};

const exportStatsMessage = WEB_EXPORTS.map(profileExport).join('\n');

// https://buildkite.com/docs/pipelines/managing-log-output
const BUILDKITE_COLLAPSE_PREFIX = '---';

console.log(
  `${process.env.CI === 'true' ? `${BUILDKITE_COLLAPSE_PREFIX} ` : '\n'}🐝 Export runtime costs:\n`,
);
console.log(exportStatsMessage, '\n');

cleanup();
