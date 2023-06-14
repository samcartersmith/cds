import { $, argv, within } from 'zx'; // https://github.com/google/zx

import detoxConfig from '../detox.config.js';

import { isCI } from './utils/env.mjs';
import { getBuildInfo } from './utils/getBuildInfo.mjs';
import { setEnvVars } from './utils/setEnvVars.mjs';

const { platform, profile, jsEngine } = argv;

const { ios, android } = getBuildInfo();

setEnvVars();

if (platform === 'android') {
  const targetAvd = detoxConfig.devices.emulator.device.avdName;
  const { stdout: emulatorsAsString } = await $`avdmanager list avd --compact`;
  const emulators = emulatorsAsString.split('\n');
  const doesNotHaveEmulator = emulators.findIndex((item) => item === targetAvd) === -1;

  if (doesNotHaveEmulator) {
    const architecture = isCI ? android.architectures.ubuntu : android.architectures.m1;
    const androidSdk = `system-images;android-30;default;${architecture}`;

    await $`sdkmanager ${androidSdk}`;
    await $`echo no | avdmanager create avd --force --name ${targetAvd} --package ${androidSdk}`;
  }
}

if (profile === 'debug') {
  within(async () => {
    await $`cd ../../ && yarn nx run mobile-app:launch --profile ${profile} --jsEngine ${jsEngine} --platform ${platform}`;
    await $`cd ../../ && yarn nx run mobile-app:start --profile ${profile} --jsEngine ${jsEngine} --platform ${platform}`;
  });
}

if (profile === 'release') {
  if (platform === 'android') await android.patchBundle();
  if (platform === 'ios') await ios.patchBundle();
}

if (platform === 'android' && isCI) {
  await $`yarn workspace mobile-app detox test --configuration ${platform}-${profile} --headless --cleanup --force-adb-install`;
} else {
  await $`yarn workspace mobile-app detox test --loglevel verbose --configuration ${platform}-${profile} --cleanup --force-adb-install`;
}
