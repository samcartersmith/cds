/* eslint-disable no-console */
import { diffLines } from 'diff';
import fs from 'node:fs';
import path from 'node:path';

/** Start configuration */

const PACKAGES_RELATIVE_PATH = './../packages';
const NODE_MODULES_RELATIVE_PATH = './../node_modules';

const MASTER_STATS_FILENAME = 'bundle-stats.json';
const COMPARISON_STATS_FILENAME = `apps/storybook/${MASTER_STATS_FILENAME}`;

/**
 * Bundle groups whose `label` value is in this array, or whose `label` value
 * ends with a path seperator followed by a value in this array, will not be
 * included in the logged results for package stats
 */
const PACKAGES_FILTERED_LABELS = ['__mocks__', '__stories__'];

const NODE_MODULES_FILTERED_LABELS = ['@storybook'];

/**
 * The order of the keys in this object conrols the order that the
 * detailed console log messages are printed for each package
 */
const packageDetailedMessagesOrder: { [key: string]: string } = {
  common: '',
  web: '',
  'web-overlays': '',
  'web-visualization': '',
};

/**
 * The order of the keys in this object conrols the order that the
 * simple console log messages are printed for each package
 */
const packageSimpleMessagesOrder: { [key: string]: string } = {
  common: '',
  web: '',
  'web-overlays': '',
  'web-visualization': '',
  fonts: '',
  icons: '',
  'illustrations/src/__generated__': '',
  'lottie-files': '',
  utils: '',
  d3: '',
};

/** End configuration */

const MONOREPO_ROOT = process.env.PROJECT_CWD ?? process.env.NX_MONOREPO_ROOT;

if (!MONOREPO_ROOT) throw Error('MONOREPO_ROOT was undefined');

const masterBundleStatsPath = path.resolve(MONOREPO_ROOT, MASTER_STATS_FILENAME);
const comparisonBundleStatsPath = path.resolve(MONOREPO_ROOT, COMPARISON_STATS_FILENAME);

if (!fs.existsSync(masterBundleStatsPath))
  throw Error(
    `No master bundle stats ${MASTER_STATS_FILENAME} found at path "${masterBundleStatsPath}"`,
  );

if (!fs.existsSync(comparisonBundleStatsPath))
  throw Error(
    `No comparison bundle stats ${MASTER_STATS_FILENAME} found at path "${comparisonBundleStatsPath}"`,
  );

// Delete all stats files on exit to prevent accidental misuse of buildkite cache plugin
const cleanup = () => {
  if (fs.existsSync(masterBundleStatsPath)) fs.rmSync(masterBundleStatsPath, { recursive: true });
  if (fs.existsSync(comparisonBundleStatsPath))
    fs.rmSync(comparisonBundleStatsPath, { recursive: true });
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

type BundleStats = {
  id?: string;
  label: string;
  path: string;
  groups: BundleStats[];
  isAsset: boolean;
  gzipSize: number;
  parsedSize: number;
  statSize: number;
};

const masterBundleStats = JSON.parse(fs.readFileSync(masterBundleStatsPath, 'utf-8')) as Omit<
  BundleStats,
  'path'
>[];

const comparisonBundleStats = JSON.parse(
  fs.readFileSync(comparisonBundleStatsPath, 'utf-8'),
) as Omit<BundleStats, 'path'>[];

/**
 * "Package stats" represent stats for our code in the local "packages" directory in the repo root.
 * "Node Module stats" represent stats for our dependencies in the node_modules directory.
 */

const masterStatsGroups = masterBundleStats.flatMap((stats) => stats.groups);
const masterPackageStats = masterStatsGroups.find((group) => group.path === PACKAGES_RELATIVE_PATH);
const masterNodeModuleStats = masterStatsGroups.find(
  (group) => group.path === NODE_MODULES_RELATIVE_PATH,
);

const comparisonStatsGroups = comparisonBundleStats.flatMap((stats) => stats.groups);
const comparisonPackageStats = comparisonStatsGroups.find(
  (group) => group.path === PACKAGES_RELATIVE_PATH,
);
const comparisonNodeModuleStats = comparisonStatsGroups.find(
  (group) => group.path === NODE_MODULES_RELATIVE_PATH,
);

if (!masterPackageStats)
  throw Error(`Could not find master bundle stats group with path "${PACKAGES_RELATIVE_PATH}"`);

if (!comparisonPackageStats)
  throw Error(`Could not find comparison bundle stats group with path "${PACKAGES_RELATIVE_PATH}"`);

if (!masterNodeModuleStats)
  throw Error(`Could not find master bundle stats group with path "${NODE_MODULES_RELATIVE_PATH}"`);

if (!comparisonNodeModuleStats)
  throw Error(
    `Could not find comparison bundle stats group with path "${NODE_MODULES_RELATIVE_PATH}"`,
  );

const readableFileSize = (size: number): string => {
  const i = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
  const sizeString = (size / 1024 ** i).toFixed(2);
  const simpleSizeString = Number(sizeString) * 1;
  const unit = ['B', 'kB', 'MB', 'GB', 'TB'][i];
  return `${simpleSizeString} ${unit}`;
};

const recursivelyPrintSizeInfo = ({
  stats,
  maxDepth,
  filterLabels = [],
  depth = 0,
  messagePrefix = '',
  currentResult = '',
}: {
  stats: BundleStats;
  maxDepth: number;
  filterLabels?: string[];
  depth?: number;
  messagePrefix?: string;
  currentResult?: string;
}): string => {
  let result = currentResult;

  if (
    filterLabels.includes(stats.label) ||
    filterLabels.some((filterLabel) => stats.label.endsWith(`${path.sep}${filterLabel}`))
  )
    return result;

  const title = `${messagePrefix}${stats.label} `;
  result += `\n${title.padEnd(90, '.')} ${readableFileSize(stats.gzipSize)}`;

  if (depth >= maxDepth) return result;

  for (const groupStats of stats.groups || [])
    result = recursivelyPrintSizeInfo({
      stats: groupStats,
      maxDepth,
      depth: depth + 1,
      messagePrefix: `${messagePrefix}  `,
      currentResult: result,
    });

  return result;
};

// https://buildkite.com/docs/pipelines/managing-log-output
// We want to collapse the CI logs in Buildkite, but we can't use +++ before diffing
// or it will mess with the diff. So we use ~~~ first, then replace with +++ later.
const BUILDKITE_COLLAPSE_PLACEHOLDER = '~~~';
const BUILDKITE_COLLAPSE_PREFIX = '---';
const BUILDKITE_EXPAND_PLACEHOLDER = '!!!';
const BUILDKITE_EXPAND_PREFIX = '+++';

const getPackageTitle = (packageName: string) =>
  process.env.CI === 'true' ? `${BUILDKITE_COLLAPSE_PLACEHOLDER} 📌 ${packageName}` : '';

const getNodeModulesStatsMessage = (nodeModulesStatsGroups: BundleStats[]) => {
  const nodeModuleSimpleMessages: { [key: string]: string } = {};
  const nodeModuleDetailedMessages: { [key: string]: string } = {};

  for (const nodeModuleStats of nodeModulesStatsGroups) {
    const moduleName = nodeModuleStats.label;
    const title = `${moduleName} `;
    const fileSize = readableFileSize(nodeModuleStats.gzipSize);

    nodeModuleSimpleMessages[moduleName] = `${title.padEnd(60, '.')} ${fileSize}`;

    nodeModuleDetailedMessages[moduleName] = recursivelyPrintSizeInfo({
      stats: nodeModuleStats,
      maxDepth: 3,
      filterLabels: NODE_MODULES_FILTERED_LABELS,
    });
  }

  const totalSize = nodeModulesStatsGroups.reduce((acc, group) => acc + group.gzipSize, 0);
  const sizeString = `${'Total size '.padEnd(60, '.')} ${readableFileSize(totalSize)}`;

  let message = `${
    process.env.CI === 'true' ? `${BUILDKITE_COLLAPSE_PLACEHOLDER} ` : '\n'
  }🐳 Node module size results:\n\n${sizeString}\n`;

  for (const simpleMessage of Object.values(nodeModuleSimpleMessages))
    message += `\n${simpleMessage}`;

  message += '\n';

  for (const detailedMessage of Object.values(nodeModuleDetailedMessages))
    message += `\n${detailedMessage}`;

  return message.replaceAll(BUILDKITE_COLLAPSE_PLACEHOLDER, BUILDKITE_COLLAPSE_PREFIX);
};

const getPackageStatsMessage = (packageStatsGroups: BundleStats[]) => {
  const packageSimpleMessages = { ...packageSimpleMessagesOrder };
  const packageDetailedMessages = { ...packageDetailedMessagesOrder };

  for (const packageStats of packageStatsGroups) {
    const packageName = packageStats.label;
    const title = `${packageName} `;
    const fileSize = readableFileSize(packageStats.gzipSize);

    packageSimpleMessages[packageName] = `${title.padEnd(60, '.')} ${fileSize}`;

    if (packageName in packageDetailedMessages)
      packageDetailedMessages[packageName] = recursivelyPrintSizeInfo({
        stats: packageStats,
        maxDepth: 3,
        filterLabels: PACKAGES_FILTERED_LABELS,
      });
  }

  let message = `${
    process.env.CI === 'true' ? `${BUILDKITE_EXPAND_PLACEHOLDER} ` : '\n'
  }🐙 Bundle size results:\n`;

  for (const simpleMessage of Object.values(packageSimpleMessages)) message += `\n${simpleMessage}`;

  for (const [packageName, detailedMessage] of Object.entries(packageDetailedMessages))
    message += `\n\n${getPackageTitle(packageName)}${detailedMessage}`;

  return message
    .replaceAll(BUILDKITE_COLLAPSE_PLACEHOLDER, BUILDKITE_COLLAPSE_PREFIX)
    .replaceAll(BUILDKITE_EXPAND_PLACEHOLDER, BUILDKITE_EXPAND_PREFIX);
};

const green = (message: string) => `\x1b[32m${message}\x1b[0m`;
const red = (message: string) => `\x1b[31m${message}\x1b[0m`;

// Diff node modules bundle stats
const masterNodeModulesStatsMessage = getNodeModulesStatsMessage(masterNodeModuleStats.groups);

const comparisonNodeModulesStatsMessage = getNodeModulesStatsMessage(
  comparisonNodeModuleStats.groups,
);

const nodeModulesDiff = diffLines(masterNodeModulesStatsMessage, comparisonNodeModulesStatsMessage);

nodeModulesDiff.forEach(({ value, added, removed }, index) => {
  const nextDiff = nodeModulesDiff[index + 1];
  const nextChanged = Boolean(nextDiff?.added || nextDiff?.removed);
  const message = added || nextChanged ? value.slice(0, -1) : value;
  if (added) return console.log(green(message));
  if (removed) return console.log(red(message));
  return console.log(message);
});

console.log('\n');

// Diff our local packages bundle stats
const masterPackageStatsMessage = getPackageStatsMessage(masterPackageStats.groups);

const comparisonPackageStatsMessage = getPackageStatsMessage(comparisonPackageStats.groups);

const packagesDiff = diffLines(masterPackageStatsMessage, comparisonPackageStatsMessage);

packagesDiff.forEach(({ value, added, removed }, index) => {
  const nextDiff = packagesDiff[index + 1];
  const nextChanged = Boolean(nextDiff?.added || nextDiff?.removed);
  const message = added || nextChanged ? value.slice(0, -1) : value;
  if (added) return console.log(green(message));
  if (removed) return console.log(red(message));
  return console.log(message);
});

console.log('\n');

cleanup();
