import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

import { isExpectedAndroidDevice, isExpectedIosDevice, runCmd } from './utils';

function setDemoMode() {
  if (device.getPlatform() === 'android') {
    // enter demo mode
    execSync('adb shell settings put global sysui_demo_allowed 1');
    // display time 12:00
    execSync('adb shell am broadcast -a com.android.systemui.demo -e command clock -e hhmm 1200');
    // Display full mobile data with 4g type and no wifi
    execSync(
      'adb shell am broadcast -a com.android.systemui.demo -e command network -e mobile show -e level 4 -e datatype 4g -e wifi false',
    );
    // Hide notifications
    execSync(
      'adb shell am broadcast -a com.android.systemui.demo -e command notifications -e visible false',
    );
    // Show full battery but not in charging state
    execSync(
      'adb shell am broadcast -a com.android.systemui.demo -e command battery -e plugged false -e level 100',
    );
  }
}

export function initializeVisualRegressionTests() {
  if (!isExpectedIosDevice()) {
    throw Error(
      'Detox is using the wrong iOS Simulator. This is important to ensure the properly sized screenshots are taken.',
    );
  }

  if (!isExpectedAndroidDevice()) {
    throw Error(
      'Detox is using the wrong Android emulator. This is important to ensure the properly sized screenshots are taken.',
    );
  }

  setDemoMode();
}

export function startLocalPercyServer() {
  runCmd('percy exec:start');
}

export function stopLocalPercyServer() {
  runCmd('percy exec:stop');
}

export function uploadImages(pathStr: string, skipStartLocalPercy = false) {
  const percyUploadCmd = `percy upload -c ./.percy.yml -f "./*.{png,jpg,jpeg}" ${pathStr}`;
  const cmd = skipStartLocalPercy ? percyUploadCmd : `percy exec --parallel -- ${percyUploadCmd}`;
  runCmd(cmd);
}

function ensureDirExists(fullPath: string) {
  const dir = path.dirname(fullPath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// TODO: make robust by using absolute path rather than relative path
const screenshotTempDir = '../../artifacts/temp-visual-regression-screenshots';

export async function takeScreenshot(filename: string, scrollViewId: string) {
  const platform = device.getPlatform();
  const fullFilename = `${filename}-${platform}`;
  const fullFilePath = `${screenshotTempDir}/${fullFilename}.png`;

  ensureDirExists(fullFilePath);

  // using detox's element level snapshots on iOS to remove device level flake
  // element level snapshots don't work well with ScrollView on Android
  // passing the file name into element level takeScreenshot causes detox to lose track of the image,
  // but setting a file name isn't required for this use case
  const tempFilePath =
    platform === 'ios'
      ? await element(by.id(scrollViewId)).takeScreenshot('')
      : await device.takeScreenshot(fullFilename);

  execSync(`mv ${tempFilePath} ${fullFilePath}`);
  return fullFilePath;
}

export async function percySnapshot(
  screenshotPath: string,
  skipPercyUpload = false,
  skipStartLocalPercy = false,
) {
  const dir = `${screenshotTempDir}/${screenshotPath}`;

  if (!skipPercyUpload) {
    uploadImages(dir, skipStartLocalPercy);
  }
}

export function cleanUpScreenshots() {
  runCmd(`rm -rf ${screenshotTempDir}`);
}

export function buildFinalize() {
  runCmd('percy build:finalize');
}
