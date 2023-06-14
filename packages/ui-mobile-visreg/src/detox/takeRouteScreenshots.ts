/* eslint-disable no-await-in-loop */
import { findElementById } from '@cbhq/detox-utils';

import {
  androidDeviceSwipeOffset,
  iosDeviceScrolDistance,
  screen,
  scrollView,
  scrollViewEnd,
} from '../constants';

import getDevicePlatform from './getDevicePlatform';

async function scrollToEnd() {
  try {
    // eslint-disable-next-line @typescript-eslint/await-thenable
    await expect(findElementById(scrollViewEnd)).not.toBeVisible();

    // detox scroll on Android and swipe on iOS are not deterministic,
    // so we need to maintain a different method for each device
    if (getDevicePlatform() === 'ios') {
      await findElementById(scrollView).scroll(iosDeviceScrolDistance, 'down');
    } else {
      await findElementById(scrollView).swipe('up', 'slow', androidDeviceSwipeOffset);
    }
  } catch {
    return true;
  }

  return false;
}

export default async function takeRouteScreenshots(
  fullDirPath: string,
  routeName: string,
  takeScreenshotCb: (
    dirPath: string,
    testName: string,
    elementId: string,
    options?: {
      filenamePrefix?: string | number;
    },
  ) => Promise<void>,
) {
  let atEnd = false;
  let count = 0;

  while (!atEnd) {
    await takeScreenshotCb(fullDirPath, routeName, screen, {
      filenamePrefix: count,
    });
    atEnd = await scrollToEnd();
    count += 1;
  }
}
