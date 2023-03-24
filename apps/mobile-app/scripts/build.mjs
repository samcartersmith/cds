import { $, argv } from 'zx'; // https://github.com/google/zx

import { getBuildInfo } from './utils/getBuildInfo.mjs';
import { setEnvVars } from './utils/setEnvVars.mjs';

const { platform, profile } = argv;
const { ios, android } = getBuildInfo();

setEnvVars();

const output = platform === 'ios' ? ios.tarball : android.zipFile;

await $`eas build --local --non-interactive --json --clear-cache --platform ${platform} --profile ${profile} --output ${output}`;

if (platform === 'android') {
  await android.unzip();
}

if (platform === 'ios') {
  await ios.unzip();
}
