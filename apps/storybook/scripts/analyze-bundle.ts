import fs from 'node:fs';
import path from 'node:path';

/** Start configuration */

const PACKAGES_RELATIVE_PATH = './../packages';
const STATS_FILENAME = 'bundle-stats.json';
const COMPARISON_STATS_FILENAME = `apps/storybook/${STATS_FILENAME}`;

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

const bundleStatsPath = path.resolve(MONOREPO_ROOT, STATS_FILENAME);
const comparisonBundleStatsPath = path.resolve(MONOREPO_ROOT, COMPARISON_STATS_FILENAME);

if (!fs.existsSync(bundleStatsPath))
  throw Error(`No bundle stats ${STATS_FILENAME} found at path "${bundleStatsPath}"`);

if (!fs.existsSync(comparisonBundleStatsPath))
  throw Error(
    `No comparison bundle stats ${STATS_FILENAME} found at path "${comparisonBundleStatsPath}"`,
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

const bundleStats = JSON.parse(fs.readFileSync(bundleStatsPath, 'utf-8')) as BundleStats[];

const packagesStats = bundleStats[0].groups.find((group) => group.path === PACKAGES_RELATIVE_PATH);

if (!packagesStats)
  throw Error(`Could not find bundle stats group with path "${PACKAGES_RELATIVE_PATH}"`);

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

for (const packageStats of packagesStats.groups) {
  const packageName = packageStats.label;
  const title = `${packageName} `;
  const fileSize = readableFileSize(packageStats.gzipSize);

  simpleMessages[packageName] = `${title.padEnd(60, '.')} ${fileSize}`;

  if (packageName in detailedMessages)
    detailedMessages[packageName] = recursivelyPrintSizeInfo(packageStats, 3);
}

let message = `${process.env.CI === 'true' ? '+++ ' : '\n'}Bundle size results:\n`;

for (const simpleMessage of Object.values(simpleMessages)) message += `\n${simpleMessage}`;

// https://buildkite.com/docs/pipelines/managing-log-output
const CI_PREFIX = (packageName: string) => (process.env.CI === 'true' ? `+++ ${packageName}` : '');

for (const [packageName, detailedMessage] of Object.entries(detailedMessages))
  message += `\n\n${CI_PREFIX(packageName)}${detailedMessage}`;

// eslint-disable-next-line no-console
console.log(message);

fs.rmSync(bundleStatsPath, { recursive: true });
fs.rmSync(comparisonBundleStatsPath, { recursive: true });
