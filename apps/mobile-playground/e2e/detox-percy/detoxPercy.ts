import { execSync, ExecSyncOptions } from 'child_process';
import fs from 'fs';
import path from 'path';

import config from '../../detox.config';

import { isExpectedSimulator, runCmd } from './utils';

function setDemoMode() {
  if (device.getPlatform() === 'ios') {
    execSync(
      `xcrun simctl status_bar "${config.devices.simulator.device.type}" override --time "12:00" --batteryState charged --batteryLevel 100 --wifiBars 3 --cellularMode active --cellularBars 4`,
    );
  } else {
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
  if (!isExpectedSimulator()) {
    throw Error(
      'Detox is using the wrong simulator. This is important to ensure the properly sized screenshots are taken.',
    );
  }
  setDemoMode();
}

export function startLocalPercyServer() {
  runCmd('exec:start');
}

export function stopLocalPercyServer() {
  runCmd('exec:stop');
}

export function uploadImages(pathStr: string, skipStartLocalPercy = false) {
  const percyUploadCmd = `percy upload -c ./.percy.yml -f "./*.{png,jpg,jpeg}" ${pathStr}`;
  const cmd = skipStartLocalPercy ? percyUploadCmd : `percy exec --parallel -- ${percyUploadCmd}`;
  runCmd(cmd);
}

const OPTIONS: ExecSyncOptions = {
  timeout: 10000,
  killSignal: 'SIGKILL',
};

function ensureDirExists(fullPath: string) {
  const dir = path.dirname(fullPath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

const screenshotTempDir = '../../artifacts/percyTempScreenshots'; // TODO: make robust.

export function takeScreenshot(filename: string) {
  if (device.getPlatform() === 'android') {
    const androidFilename = `${filename}-android.png`;
    const fullAndroidPath = `${screenshotTempDir}/${androidFilename}`;
    ensureDirExists(fullAndroidPath);

    execSync(`adb exec-out screencap -p > ${fullAndroidPath}`, OPTIONS);
    return fullAndroidPath;
  }
  const iosFilename = `${filename}-ios.png`;
  const fullIosPath = `${screenshotTempDir}/${iosFilename}`;
  ensureDirExists(fullIosPath);

  execSync(`xcrun simctl io booted screenshot ${fullIosPath}`, OPTIONS);
  return fullIosPath;
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

export function takeIosScreenshot() {
  runCmd('xcrun simctl io booted screenshot Screenshot.png');
}
