import { $, argv } from 'zx'; // https://github.com/google/zx

import { getBuildInfo } from './utils/getBuildInfo.mjs';
import { setEnvVars } from './utils/setEnvVars.mjs';

const { ios, android } = getBuildInfo();

setEnvVars();

const scheme = argv.platform === 'ios' ? ios.bundleIdentifier : android.packageIdentifier;

await $`expo start --${argv.platform} --dev-client --localhost --clear --scheme ${scheme}`;
