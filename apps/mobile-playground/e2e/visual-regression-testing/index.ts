import { PercyScreenshotOptions } from './percy/processScreenshots';
import config from './config';
import {
  isExpectedAndroidDevice,
  isExpectedIosDevice,
  launchApp,
  navigateToRoute,
  processScreenshots,
  reloadApp,
  takeRouteScreenshots,
  takeScreenshot,
} from './helpers';
import { removeAllFilesFromDir } from './utils';

/**
 * Ensures the test environment is properly set up for visual regression (Visreg) tests. This primarily includes
 *    launching the simulator/emulator and configuring and verifying settings.
 *
 * @param {Object} [options] Options to configure initialization.
 * @param {Object} [options.launchOptions] Options to configure underlying app launcher.
 */
export async function initializeVisregTests(
  options: { launchOptions?: Detox.DevicePermissions } = {},
) {
  await launchApp(options.launchOptions);

  if (!isExpectedIosDevice()) {
    throw Error(
      'The wrong iOS simulator is being used. This is important to ensure properly sized screenshots are taken.',
    );
  }

  if (!isExpectedAndroidDevice()) {
    throw Error(
      'The wrong Android emulator is being used. This is important to ensure properly sized screenshots are taken.',
    );
  }
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
  await reloadApp();
  await navigateToRoute(routeName);

  const parentDir = `${config.screenshotArtifacts.baseDir}/${config.screenshotArtifacts.playgroundDir}`;
  const screenshotsDir = await takeRouteScreenshots(parentDir, routeName);

  processScreenshots(screenshotsDir, { parallelPercy: true });
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
  const fullDirPath = `${config.screenshotArtifacts.baseDir}${screenshotDir}`;

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
export function processScreenshotsForVisualDiffs(
  options: { screenshotsDir?: string; processingOptions?: PercyScreenshotOptions } = {},
) {
  const screenshotsDir = options.screenshotsDir ? `/${options.screenshotsDir}` : '';
  const fullDirPath = `${config.screenshotArtifacts.baseDir}${screenshotsDir}`;

  processScreenshots(fullDirPath, options.processingOptions);
}

/**
 * Removes the artifacts directory and takes care of all other required clean up. This can be run after each test case
 *    or after all tests are run depending on the context.
 */
export function finishVisregTests() {
  removeAllFilesFromDir(config.screenshotArtifacts.baseDir);
}

export { default as getPlaygroundRoutes } from './getPlaygroundRoutes';
