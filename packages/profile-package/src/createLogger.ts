import chalk from 'chalk';
import { diffLines } from 'diff';

const logDiff = (baseContent: string, updatedContent: string) => {
  const resultsMessageDiff = diffLines(baseContent, updatedContent);
  resultsMessageDiff.forEach(({ value, added, removed }, index) => {
    const nextDiff = resultsMessageDiff[index + 1];
    const nextChanged = Boolean(nextDiff?.added || nextDiff?.removed);
    const message = added || nextChanged ? value.slice(0, -1) : value;
    if (added) return console.log(chalk.green(message));
    if (removed) return console.log(chalk.red(message));
    return console.log(message);
  });
};

// https://buildkite.com/docs/pipelines/managing-log-output
const BUILDKITE_EXPAND_PREFIX = '+++';

const logTitle = (message: string) => {
  console.log(`${process.env.CI === 'true' ? `${BUILDKITE_EXPAND_PREFIX} ` : '\n'}${message}`);
};

export const createLogger = ({ silent, diff }: { silent?: boolean; diff?: boolean }) => ({
  /** Only log if we're not diffing and not in silent mode. */
  log: (message: string) => !silent && !diff && console.log(message),
  /** Logs a string formatted and spaced for the environment (local vs CI). */
  logTitle,
  /** Performs a line-by-line diff of two strings and logs the results. */
  logDiff,
});
