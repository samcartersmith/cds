import updateNotifier, { Package } from 'update-notifier';
import yargs from 'yargs';

import { logError } from './logging';

updateNotifier({
  pkg: require('../package.json') as Package,
  shouldNotifyInNpmScript: true,
}).notify();

yargs.command<{ project: string }>(
  'adoption <project>',
  'Run adoption tracker for the given project',
  (args) =>
    args.positional('project', {
      required: true,
      description: 'Nx project to run.',
      type: 'string',
    }),
);

async function run() {
  const argv = process.argv.slice(2);
  try {
    await yargs.fail(false).demandCommand().parseAsync(argv);
  } catch (error) {
    process.exitCode = 1;

    logError(String(error));
  }
}

void run();
