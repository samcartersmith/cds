import { $, argv } from 'zx'; // https://github.com/google/zx

import { getBuildInfo } from './utils/getBuildInfo.mjs';
import { setEnvVars } from './utils/setEnvVars.mjs';

$.verbose = true;

const { android, ios } = getBuildInfo();
const { platform } = argv;

setEnvVars();

const archivePath = platform === 'android' ? android.apk.signed : ios.app;

if (platform === 'android') {
  await android.patchBundle();
}

if (platform === 'ios') {
  await ios.patchBundle();
}

await $`eas build:run --path ${archivePath} --platform ${platform}`;
