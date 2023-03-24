import { execSync } from 'child_process';

import processScreenshots, { PercyScreenshotOptions } from './percy/processScreenshots';
import { baseDir, playgroundDir } from './constants';
import {
  getDevicePlatform,
  isExpectedAndroidDevice,
  isExpectedIosDevice,
  launchApp,
  navigateToRoute,
  takeRouteScreenshots as takeDetoxRouteScreenshots,
  takeScreenshot as takeDetoxScreenshot,
} from './detox';
import { DetoxConfig } from './detoxConfig';
import { ensureDirExists, removeAllFilesFromDir } from './utils';

/**
 * Ensures the test environment is properly set up for visual regression (Visreg) tests. This primarily includes
 *    launching the simulator/emulator and configuring and verifying settings.
 *
 * @param {Object} [options] Options to configure initialization.
 * @param {Object} [options.launchOptions] Options to configure underlying app launcher.
 */
export async function initializeVisregTests(
  detoxConfig: DetoxConfig,
  options: { launchOptions?: Detox.DevicePermissions } = {},
) {
  await launchApp(options.launchOptions);

  if (!isExpectedIosDevice(detoxConfig)) {
    throw Error(
      'The wrong iOS simulator is being used. This is important to ensure properly sized screenshots are taken.',
    );
  }

  if (!isExpectedAndroidDevice(detoxConfig)) {
    throw Error(
      'The wrong Android emulator is being used. This is important to ensure properly sized screenshots are taken.',
    );
  }
}

async function takeScreenshot(
  dirPath: string,
  testName: string,
  elementId: string,
  options: {
    filenamePrefix?: string | number;
  } = {},
) {
  const { filenamePrefix } = options;
  const prefix = filenamePrefix !== undefined ? `${filenamePrefix}_` : '';
  const filename = `${prefix}${testName}-${getDevicePlatform()}.png`;
  const filePath = `${dirPath}/${filename}`;

  const tempFilePath = await takeDetoxScreenshot(elementId);

  ensureDirExists(filePath);
  execSync(`mv ${tempFilePath} ${filePath}`);
}

async function takeRouteScreenshots(dirPath: string, routeName: string) {
  const fullDirPath = `${dirPath}/${routeName}`;

  await takeDetoxRouteScreenshots(fullDirPath, routeName, takeScreenshot);
  return fullDirPath;
}

/**
 * Takes all screenshots for a given playground route. Once it has taken all screenshots
 *  for the route, this method uploads the screenshots to percy.
 *
 * @param {string} routeName Name of the route that will be included in the screenshot file name (e.g. 0_<routeName>-ios.png).
 *    The sdk will generate a set of route names leveraging the routes in the Mobile Playground.
 */
export async function uploadScreenshotsToPercyForRoute(routeName: string) {
  const parentDir = `${baseDir}/${playgroundDir}`;
  const screenshotsDir = await takeRouteScreenshots(parentDir, routeName);

  processScreenshots(screenshotsDir, { parallelPercy: true });
}

/**
 * Navigates to the provided route in the Mobile Playground and asserts all visual diffs
 *    on the set of associated screenshots. This is what CDS uses and is a convenience method for those who choose
 *    to leverage the Mobile Playground format.
 *
 * @param {string} routeName Name of the route that will be included in the screenshot file name (e.g. 0_<routeName>-ios.png).
 *    The sdk will generate a set of route names leveraging the routes in the Mobile Playground.
 */
export async function assertVisualDiffsForPlayground(routeName: string) {
  await navigateToRoute(routeName);
  await uploadScreenshotsToPercyForRoute(routeName);
}

/**
 * Takes one screenshot of a single component and its children on the current screen. This can take a full-screen
 *    screenshot if the provided componentId is associated to a component that wraps the entire app or screen.
 *
 * @param {string} testName Name of the test that will be included in the screenshot file name (e.g. <testName>-ios.png).
 * @param {string} componentId The React Native testID for the component to be screenshot.
 * @param {Object} [options] Options to configure screenshot captures.
 * @param {string} [options.screenshotDir] Path to artifacts subdirectory where screenshot will be saved. If not
 *    provided, the screenshot will be saved to the base artifacts directory.
 * @param {(string|number)} [options.filenamePrefix] Prefix to attach to the screenshot file name.
 */
export async function takeComponentScreenshot(
  testName: string,
  componentId: string,
  options: {
    screenshotDir?: string;
    filenamePrefix?: string | number;
  } = {},
) {
  const screenshotDir = options.screenshotDir ? `/${options.screenshotDir}` : '';
  const fullDirPath = `${baseDir}${screenshotDir}`;

  await takeScreenshot(fullDirPath, testName, componentId, {
    filenamePrefix: options.filenamePrefix,
  });
}

/**
 * Processes and uploads all stored screenshots in a directory for visual diffing.
 *
 * @param {Object} [options] Options to configure screenshot uploads.
 * @param {string} [options.screenshotDir] Path to artifacts subdirectory where screenshots to be uploaded are stored.
 *    If not provided, the processor will look for screenshots in the base artifacts directory.
 * @param {Object} [options.processingOptions] Options to configure underlying screenshot processor.
 */
export function processScreenshotsForVisualDiffs(options: {
  screenshotsDir?: string;
  processingOptions?: PercyScreenshotOptions;
}) {
  const screenshotsDir = options.screenshotsDir ? `/${options.screenshotsDir}` : '';
  const fullDirPath = `${baseDir}${screenshotsDir}`;

  processScreenshots(fullDirPath, options.processingOptions ?? {});
}

/**
 * Removes the artifacts directory and takes care of all other required clean up. This can be run after each test case
 *    or after all tests are run depending on the context.
 */
export function finishVisregTests() {
  removeAllFilesFromDir(baseDir);
}

export * from './detox';
export { getPlaygroundRoutes } from './getPlaygroundRoutes';
