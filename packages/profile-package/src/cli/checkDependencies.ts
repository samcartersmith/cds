import { program } from 'commander';

import { type CheckDependenciesOptions, checkDependencies } from '../checkDependencies';
import { packageVersion } from '../packageVersion';

program
  .version(packageVersion)
  .description('profile-package checkDependencies')
  .option('--root <string>', 'Root filepath of your yarn monorepo.')
  .option('--filepaths <strings...>', 'Glob paths to check with depcheck.')
  .option('--diff', 'Diff the current depcheck results against the baseline file.')
  .option(
    '--baseline',
    'Generates a baseline file with the depcheck results. The baseline file is used to diff against. The baseline file will never be generated during a diff.',
  )
  .option(
    '--baselineFilepath <string>',
    'Directory filepath to put the generated baseline file in.',
  )
  .option('--baselineFilename <string>', 'Filename of the generated baseline file.')
  .option('--json', 'Write the depcheck results to a json file.')
  .option('--jsonFilepath <string>', 'Directory filepath to put the generated json file in.')
  .option('--jsonFilename <string>', 'Filename of the generated json file.')
  .option('--maxNumberOfFiles <number>', 'Maximum number of files to show in the results.')
  .option('--errorOnInvalidFiles', 'Throw an error if depcheck finds invalid files.')
  .option('--errorOnInvalidDirs', 'Throw an error if depcheck finds invalid directories.')
  .option('--ignoreFilepaths <strings...>', 'Glob paths to ignore checking with depcheck.')
  .option(
    '--ignorePatterns <strings...>',
    "Depcheck's ignorePatterns argument. See the depcheck docs for info about ignoring files and deps https://www.npmjs.com/package/depcheck",
  )
  .option(
    '--ignoreMatches <strings...>',
    "Depcheck's ignorePatterns argument. See the depcheck docs for info about ignoring files and deps https://www.npmjs.com/package/depcheck",
  )
  .option(
    '--silent',
    'Suppress console logging. Errors and warnings will still be shown. This option is ignored when diffing.',
  )
  .action((options: CheckDependenciesOptions) => {
    void checkDependencies(options);
  });

program.parse();
