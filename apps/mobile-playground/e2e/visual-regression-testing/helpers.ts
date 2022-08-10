import { execSync } from 'child_process';

import { PercyScreenshotOptions } from './percy/processScreenshots';
import config from './config';
import {
  getDevicePlatform as getDetoxDevicePlatform,
  getSimulatorType as getDetoxSimulatorType,
  isExpectedAndroidDevice as isDetoxExpectedAndroidDevice,
  isExpectedIosDevice as isDetoxExpectedIosDevice,
  launchApp as launchDetoxApp,
  navigateToRoute as navigateDetoxToRoute,
  reloadApp as reloadDetoxApp,
  takeRouteScreenshots as takeDetoxRouteScreenshots,
  takeScreenshot as takeDetoxScreenshot,
} from './detox';
import { processScreenshots as processPercyScreenshots } from './percy';
import { ensureDirExists } from './utils';

export type DeviceType = 'ios' | 'android';

// add supported test steppers and mapped helpers here
const stepperHelpersMap = {
  detox: {
    launchApp: launchDetoxApp,
    getDevicePlatform: getDetoxDevicePlatform,
    getSimulatorType: getDetoxSimulatorType,
    isExpectedIosDevice: isDetoxExpectedIosDevice,
    isExpectedAndroidDevice: isDetoxExpectedAndroidDevice,
    navigateToRoute: navigateDetoxToRoute,
    reloadApp: reloadDetoxApp,
    takeRouteScreenshots: takeDetoxRouteScreenshots,
    takeScreenshot: takeDetoxScreenshot,
  },
};

// add supported visual differs and mapped helpers here
const diffHelpersMap = {
  percy: {
    processScreenshots: processPercyScreenshots,
  },
};

const stepperHelpers = stepperHelpersMap[config.testStepperMechanism];
const diffHelpers = diffHelpersMap[config.visualDiffMechanism];

if (!stepperHelpers) {
  throw Error(`Invalid test stepper mechanism was specified`);
}

if (!diffHelpers) {
  throw Error(`Invalid visual diff mechanism was specified`);
}

export async function launchApp(options: Detox.DevicePermissions = {}) {
  return stepperHelpers.launchApp(options);
}

export function getDevicePlatform(): DeviceType {
  return stepperHelpers.getDevicePlatform();
}

export function isExpectedIosDevice() {
  return stepperHelpers.isExpectedIosDevice();
}

export function isExpectedAndroidDevice() {
  return stepperHelpers.isExpectedAndroidDevice();
}

export async function reloadApp() {
  return stepperHelpers.reloadApp();
}

export async function navigateToRoute(routeName: string) {
  return stepperHelpers.navigateToRoute(routeName, config.playgroundTestIds);
}

export async function takeScreenshot(
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

  const tempFilePath = await stepperHelpers.takeScreenshot(elementId);

  ensureDirExists(filePath);
  execSync(`mv ${tempFilePath} ${filePath}`);
}

export async function takeRouteScreenshots(dirPath: string, routeName: string) {
  const fullDirPath = `${dirPath}/${routeName}`;

  await stepperHelpers.takeRouteScreenshots(fullDirPath, routeName, config, takeScreenshot);
  return fullDirPath;
}

export function processScreenshots(dirPath: string, options: PercyScreenshotOptions = {}) {
  return diffHelpers.processScreenshots(dirPath, options);
}
