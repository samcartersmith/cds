/* eslint-disable no-console */
import { diffLines } from 'diff';
import fs from 'node:fs';
import path from 'node:path';

/** Start configuration */

const PACKAGES_RELATIVE_PATH = './../packages';
const MASTER_STATS_FILENAME = 'bundle-stats.json';
const COMPARISON_STATS_FILENAME = `apps/storybook/${MASTER_STATS_FILENAME}`;

/**
 * Bundle groups whose `label` value is in this array, or whose `label` value
 * ends with a path seperator followed by a value in this array, will not be
 * included in the logged results
 */
const FILTERED_LABELS = ['__mocks__', '__stories__'];

/**
 * The order of the keys in this object conrols the order that the
 * detailed console log messages are printed for each package
 */
const detailedMessages: { [key: string]: string } = {
  common: '',
  web: '',
  'web-overlays': '',
  'web-visualization': '',
};

/**
 * The order of the keys in this object conrols the order that the
 * simple console log messages are printed for each package
 */
const simpleMessages: { [key: string]: string } = {
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

const masterBundleStats = JSON.parse(
  fs.readFileSync(masterBundleStatsPath, 'utf-8'),
) as BundleStats[];

const comparisonBundleStats = JSON.parse(
  fs.readFileSync(comparisonBundleStatsPath, 'utf-8'),
) as BundleStats[];

const masterPackageStats = masterBundleStats[0].groups.find(
  (group) => group.path === PACKAGES_RELATIVE_PATH,
);

const comparisonPackageStats = comparisonBundleStats[0].groups.find(
  (group) => group.path === PACKAGES_RELATIVE_PATH,
);

if (!masterPackageStats)
  throw Error(`Could not find master bundle stats group with path "${PACKAGES_RELATIVE_PATH}"`);

if (!comparisonPackageStats)
  throw Error(`Could not find comparison bundle stats group with path "${PACKAGES_RELATIVE_PATH}"`);

const readableFileSize = (size: number): string => {
  const i = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
  const sizeString = (size / 1024 ** i).toFixed(2);
  const simpleSizeString = Number(sizeString) * 1;
  const unit = ['B', 'kB', 'MB', 'GB', 'TB'][i];
  return `${simpleSizeString} ${unit}`;
};

const recursivelyPrintSizeInfo = (
  stats: BundleStats,
  maxDepth: number,
  depth = 0,
  messagePrefix = '',
  currentResult = '',
): string => {
  let result = currentResult;

  if (
    FILTERED_LABELS.includes(stats.label) ||
    FILTERED_LABELS.some((label) => stats.label.endsWith(`${path.sep}${label}`))
  )
    return result;

  const title = `${messagePrefix}${stats.label} `;
  const fileSize = readableFileSize(stats.gzipSize);

  result += `\n${title.padEnd(90, '.')} ${fileSize}`;

  if (depth >= maxDepth) return result;

  for (const groupStats of stats.groups || [])
    result = recursivelyPrintSizeInfo(
      groupStats,
      maxDepth,
      depth + 1,
      `${messagePrefix}  `,
      result,
    );

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
  process.env.CI === 'true' ? `${BUILDKITE_COLLAPSE_PLACEHOLDER} ${packageName}` : '';

const getPackageStatsMessage = (packageStatsGroups: BundleStats[]) => {
  for (const packageStats of packageStatsGroups) {
    const packageName = packageStats.label;
    const title = `${packageName} `;
    const fileSize = readableFileSize(packageStats.gzipSize);

    simpleMessages[packageName] = `${title.padEnd(60, '.')} ${fileSize}`;

    if (packageName in detailedMessages)
      detailedMessages[packageName] = recursivelyPrintSizeInfo(packageStats, 3);
  }

  let message = `${
    process.env.CI === 'true' ? `${BUILDKITE_EXPAND_PLACEHOLDER} ` : '\n'
  }Bundle size results:\n`;

  for (const simpleMessage of Object.values(simpleMessages)) message += `\n${simpleMessage}`;

  for (const [packageName, detailedMessage] of Object.entries(detailedMessages))
    message += `\n\n${getPackageTitle(packageName)}${detailedMessage}`;

  return message
    .replaceAll(BUILDKITE_COLLAPSE_PLACEHOLDER, BUILDKITE_COLLAPSE_PREFIX)
    .replaceAll(BUILDKITE_EXPAND_PLACEHOLDER, BUILDKITE_EXPAND_PREFIX);
};

const masterPackageStatsMessage = getPackageStatsMessage(masterPackageStats.groups);

const comparisonPackageStatsMessage = getPackageStatsMessage(comparisonPackageStats.groups);

const diff = diffLines(masterPackageStatsMessage, comparisonPackageStatsMessage);

const green = (message: string) => `\x1b[32m${message}\x1b[0m`;
const red = (message: string) => `\x1b[31m${message}\x1b[0m`;

diff.forEach(({ value, added, removed }, index) => {
  const nextDiff = diff[index + 1];
  const nextChanged = Boolean(nextDiff?.added || nextDiff?.removed);
  const message = added || nextChanged ? value.slice(0, -1) : value;
  if (added) return console.log(green(message));
  if (removed) return console.log(red(message));
  return console.log(message);
});

fs.rmSync(masterBundleStatsPath, { recursive: true });
fs.rmSync(comparisonBundleStatsPath, { recursive: true });
