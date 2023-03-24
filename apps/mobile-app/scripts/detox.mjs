import fs from 'node:fs';
import { $, argv, within } from 'zx'; // https://github.com/google/zx
import { isCI } from '@cbhq/mono-tasks';

import detoxConfig from '../detox.config.js';

import { getBuildInfo } from './utils/getBuildInfo.mjs';
import { setEnvVars } from './utils/setEnvVars.mjs';

const { platform, profile, jsEngine } = argv;

const { ios, android } = getBuildInfo();

setEnvVars();

if (platform === 'ios') {
  await ios.unzip();
}

if (platform === 'android') {
  if (!fs.existsSync(android.apk) || !fs.existsSync(android.testApk)) {
    await android.unzip();
  }

  if (!isCI()) {
    const targetAvd = detoxConfig.devices.emulator.device.avdName;
    const { stdout: emulatorsAsString } = await $`avdmanager list avd --compact`;
    const emulators = emulatorsAsString.split('\n');
    const doesNotHaveEmulator = emulators.findIndex((item) => item === targetAvd) === -1;

    if (doesNotHaveEmulator) {
      const androidSdk = 'system-images;android-33;google_apis;arm64-v8a';
      await $`sdkmanager ${androidSdk}`;
      await $`avdmanager create avd --force --name ${targetAvd} --device ${targetAvd} --package ${androidSdk}`;
    }
  }
}

if (profile === 'debug') {
  within(async () => {
    await $`cd ../../ && yarn nx run mobile-app:launch --profile ${profile} --jsEngine ${jsEngine} --platform ${platform}`;
    await $`cd ../../ && yarn nx run mobile-app:start --profile ${profile} --jsEngine ${jsEngine} --platform ${platform}`;
  });
}

if (isCI() && platform === 'android') {
  await $`yarn workspace mobile-app detox test --configuration ${platform}-${profile} --device-boot-args='-skin 600x5000' --headless`;
} else {
  await $`yarn workspace mobile-app detox test --configuration ${platform}-${profile}`;
}
