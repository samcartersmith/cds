import chalk from 'chalk';
import { Ora } from 'ora';

/**
 * Status Message Logging Utils
 */
export const errMsg = (spinner: Ora, message: string) => {
  spinner.fail(`${chalk.redBright('error')} ${message}`);
};

export const successMsg = (spinner: Ora, message: string) => {
  spinner.succeed(`${chalk.greenBright('success')} ${message}`);
};
