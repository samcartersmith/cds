import { $, argv } from 'zx'; // https://github.com/google/zx

import { getBuildInfo } from './utils/getBuildInfo.mjs';
import { setEnvVars } from './utils/setEnvVars.mjs';

const { ios, android } = getBuildInfo();
const { platform } = argv;

setEnvVars();

const archivePath = platform === 'android' ? android.apk : ios.tarball;

await $`eas build:run --path ${archivePath} --platform ${platform}`;
