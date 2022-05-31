// tsc --build --pretty --verbose

import { ExecutorContext } from '@nrwl/devkit';

import { runLocalCommand } from '../utils';

export default async function runScript(options: { report: boolean }, context: ExecutorContext) {
  const bin = 'jest';
  const args = [options.report ? 'a11yReport.test' : 'a11y.test'];

  return runLocalCommand(context, bin, args);
}
