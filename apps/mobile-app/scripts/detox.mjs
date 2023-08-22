import { $, argv, within } from 'zx'; // https://github.com/google/zx

import detoxConfig from '../detox.config.js';

import { isCI } from './utils/env.mjs';
import { getAffectedRoutes } from './utils/getAffectedRoutes.mjs';
import { getBuildInfo } from './utils/getBuildInfo.mjs';
import { setEnvVars } from './utils/setEnvVars.mjs';

const { platform, profile, jsEngine } = argv;

const { commonChanged, affectedRouteKeys } = await getAffectedRoutes();

const runAll = process.env.DETOX_RUN_ALL === 'true';

// Only run detox if packages/common or code in a route's parent directory changed, or DETOX_RUN_ALL is true
if (!runAll && !commonChanged && !affectedRouteKeys.length) {
  console.log('No relevant changes to test, skipping detox');
  process.exit(0);
}
// Set the affected route keys for playgroundRoutes.e2e.ts, and flag as Percy partial build
if (!runAll && !commonChanged) {
  console.log('Only testing routes affected by changes:', affectedRouteKeys);
  process.env.DETOX_AFFECTED_ROUTE_KEYS = affectedRouteKeys.join(',');
  process.env.PERCY_PARTIAL_BUILD = '1';
} else console.log('Testing all routes');

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

// Clear Jest cache
await $`yarn workspace mobile-app detox test --configuration ${platform}-${profile} --clearCache`;

if (platform === 'android' && isCI) {
  await $`yarn workspace mobile-app detox test --configuration ${platform}-${profile} --headless --cleanup --force-adb-install`;
} else {
  await $`yarn workspace mobile-app detox test --loglevel verbose --configuration ${platform}-${profile} --cleanup --force-adb-install`;
}
