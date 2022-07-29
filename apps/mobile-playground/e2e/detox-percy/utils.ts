/* eslint-disable no-console */
import chalk from 'chalk';
import { execSync } from 'child_process';

import config from '../../detox.config';

export const runCmd = (cmd: string) => {
  try {
    console.log(chalk.gray('runCmd:\n', cmd));
    const output = execSync(cmd, { encoding: 'utf-8' }); // the default is 'buffer'
    console.log(chalk.gray('Output was:\n', output));
  } catch (err) {
    console.log(chalk.red(`Error was:\n${err}`));
  }
};

export function isExpectedIosDevice() {
  return (
    config.devices.simulator.device.type === 'iPhone 12' &&
    config.devices.simulator.type === 'ios.simulator'
  );
}

export function isExpectedAndroidDevice() {
  return (
    config.devices.emulator.device.avdName === 'Pixel_3a_API_30' &&
    config.devices.emulator.type === 'android.emulator'
  );
}
