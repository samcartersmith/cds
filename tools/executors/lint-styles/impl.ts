// stylelint --cache --cache-location /Users/jonathan.rossi@coinbase.com/repo/design-system/.nx/cache/projects/packages/web/.stylelintcache --max-warnings 0 --report-needless-disables --report-invalid-scope-disables --allow-empty-input "**/*.{js,jsx,ts,tsx,css}"

import { ExecutorContext } from '@nrwl/devkit';

import { getProjectCachePath, runLocalCommand } from '../utils';

type LintStylesOptions = {
  fix?: boolean;
};

// TODO delete this executor in favor of @cbhq/mono-tasks:lint-styles once we upgrade stylelint to 14.0
export default async function runScript(options: LintStylesOptions, context: ExecutorContext) {
  const bin = 'stylelint';

  const args = [
    '--cache',
    '--cache-location',
    getProjectCachePath(context, '.stylelintcache'),
    '--max-warnings',
    '0',
    '--report-needless-disables',
    '--report-invalid-scope-disables',
    '--allow-empty-input',
    '**/*.{js,jsx,ts,tsx,css}',
  ];

  if (options.fix) {
    args.unshift('--fix');
  }

  return runLocalCommand(context, bin, args);
}
