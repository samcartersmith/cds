/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-globals */

import { androidDefaultPixelsToScroll, iOSDefaultPixelsToScroll } from './detox-percy/config';
import { percySnapshot, takeScreenshot } from './detox-percy/detoxPercy';
import { largeTests, routesNames } from './routeNames';

export const endOfExampleScrollView = 'end_of_example_scrollview';

export async function launchApp(permisions: Detox.DevicePermissions = {}) {
  await device.launchApp({
    newInstance: true,
    permissions: { notifications: 'NO', ...permisions },
    launchArgs: {
      ConnectHardwareKeyboard: 'NO',
    },
  });
}

async function scrollToEnd(
  scrollViewId: string,
  pixels = device.getPlatform() === 'ios' ? iOSDefaultPixelsToScroll : androidDefaultPixelsToScroll,
) {
  try {
    await element(by.id(scrollViewId)).scroll(pixels, 'down');
  } catch {
    return true;
  }
  return false;
}

async function swipeToEnd(scrollViewId: string) {
  try {
    await element(by.id(scrollViewId)).swipe('up', 'slow', 0.95);
    // eslint-disable-next-line @typescript-eslint/await-thenable
    await expect(element(by.id(endOfExampleScrollView))).toBeVisible();
    return true;
  } catch {
    return false;
  }
}

export async function takeRouteScreenshots(name: string, scrollViewId: string) {
  let atEnd = false;
  let count = 0;

  while (!atEnd) {
    await takeScreenshot(`${name}/${count}_${name}`, scrollViewId);
    atEnd =
      device.getPlatform() === 'ios'
        ? await scrollToEnd(scrollViewId)
        : await swipeToEnd(scrollViewId);
    count += 1;
  }

  await percySnapshot(`${name}`);
}

function getRoutesForLargeTestOverride(largeTestOverride: string) {
  const largeTestRouteName = largeTests.find(
    (name) => name.toUpperCase() === largeTestOverride.toUpperCase(),
  );
  if (largeTestRouteName !== undefined) {
    return [largeTestOverride];
  }
  throw Error(`Specified large test RouteName ${largeTestOverride} does not exist.`);
}

export function getRoutes() {
  const totalJobs = process?.env?.DETOX_TOTAL_JOBS as unknown as number;

  if (totalJobs === undefined) {
    throw Error('DETOX_TOTAL_JOBS environment variable is not defined.');
  }

  const jobNumber = process?.env?.DETOX_JOB_NUMBER as unknown as number;

  if (jobNumber === undefined) {
    throw Error('DETOX_JOB_NUMBER environment variable is not defined.');
  }

  const jobSize = Math.floor(routesNames.length / totalJobs);
  const startIndex = (jobNumber - 1) * jobSize;
  const endIndex = jobNumber === totalJobs ? routesNames.length : startIndex + jobSize;

  let routes = routesNames.slice(startIndex, endIndex);

  const largeTestOverride = process?.env?.PERCY_LARGE_TEST_NAME;
  if (largeTestOverride !== undefined) {
    routes = getRoutesForLargeTestOverride(largeTestOverride);
  }

  return routes;
}
