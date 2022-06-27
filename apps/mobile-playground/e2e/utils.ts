/* eslint-disable no-await-in-loop */
import { defaultPixelsToScroll } from './detox-percy/config';
import { percySnapshot, takeScreenshot } from './detox-percy/detoxPercy';

export async function launchApp(permisions: Detox.DevicePermissions = {}) {
  await device.launchApp({
    newInstance: true,
    permissions: { notifications: 'NO', ...permisions },
    launchArgs: {
      ConnectHardwareKeyboard: 'NO',
    },
  });
}

async function scrollToEnd(scrollViewId: string, pixels = defaultPixelsToScroll) {
  try {
    await element(by.id(scrollViewId)).scroll(pixels, 'down');
  } catch {
    return true;
  }
  return false;
}

export async function takeRouteScreenshots(name: string) {
  let atEnd = false;
  let count = 0;

  while (!atEnd) {
    takeScreenshot(`${name}/${count}_${name}`);
    atEnd = await scrollToEnd('example_screen_scrollview');
    count += 1;
  }

  await percySnapshot(`${name}`);
}
