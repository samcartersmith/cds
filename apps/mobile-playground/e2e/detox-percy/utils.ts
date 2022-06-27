/* eslint-disable no-console */
import { execSync } from 'child_process';

import config from '../../detox.config';

export const runCmd = (cmd: string) => {
  try {
    console.log('runCmd:\n', cmd);
    const output = execSync(cmd, { encoding: 'utf-8' }); // the default is 'buffer'
    console.log('Output was:\n', output);
  } catch (err) {
    console.warn('Error was:\n', err);
  }
};

export function isExpectedSimulator() {
  return (
    config.devices.simulator.device.type === 'iPhone 12' &&
    config.devices.simulator.type === 'ios.simulator'
  );
}
