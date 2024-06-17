import chalk from 'chalk';
import progress from 'cli-progress';

export const progressBar = (msg: string, total: number) => {
  const bar = new progress.SingleBar(
    {
      format: `${chalk.cyan(
        '{bar}',
      )}| {percentage}% || {value}/${total} ${msg} || time elapsed: {duration_formatted}`,
      barCompleteChar: '\u2588',
      barIncompleteChar: '\u2591',
      hideCursor: true,
    },
    progress.Presets.shades_classic,
  );
  bar.start(total, 0);
  return {
    bar,
    start: bar.start.bind(bar),
    increment: bar.increment.bind(bar),
    stop: bar.stop.bind(bar),
  };
};

export const warn = (msg: string) => console.log(chalk.yellow(msg));
export const error = (msg: string) => console.log(chalk.red(msg));
export const info = (msg: string) => console.log(chalk.blue(msg));
export const success = (msg: string) => console.log(chalk.green(msg));
