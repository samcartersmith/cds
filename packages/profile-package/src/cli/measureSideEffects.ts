import { program } from 'commander';

import { type MeasureSideEffectsOptions, measureSideEffects } from '../measureSideEffects';
import { packageVersion } from '../packageVersion';

program
  .version(packageVersion)
  .description('profile-package measureSideEffects')
  .option('--root <string>', 'Root filepath of your yarn monorepo.')
  .option('--filepaths <strings...>', 'Glob paths of your packages to measure.')
  .option('--diff', 'Diff the current measurement results with a baseline file.')
  .option(
    '--baseline',
    'Generates a baseline file with the measurement results. The baseline file is used to diff against. The baseline file will never be generated during a diff.',
  )
  .option(
    '--baselineFilepath <string>',
    'Directory filepath to put the generated baseline file in.',
  )
  .option('--baselineFilename <string>', 'Filename of the generated baseline file.')
  .option('--json', 'Write the measurement results to a json file.')
  .option('--jsonFilepath <string>', 'Directory filepath to put the generated json file in.')
  .option('--jsonFilename <string>', 'Filename of the generated json file.')
  .option(
    '--numberOfSamples <number>',
    'Number of times to sample the runtime cost of each import. The median of the samples is used as the final result.',
  )
  .option('--ignoreFilepaths <strings...>', 'Glob paths to ignore measuring.')
  .option(
    '--silent',
    'Suppress console logging. Errors and warnings will still be shown. This option is ignored when diffing.',
  )
  .action((options: MeasureSideEffectsOptions) => {
    void measureSideEffects(options);
  });

program.parse();
