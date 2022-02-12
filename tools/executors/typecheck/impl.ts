// tsc --build --pretty --verbose

import { ExecutorContext } from '@nrwl/devkit';
import { runLocalCommand } from '../utils';

export default function runScript(options: unknown, context: ExecutorContext) {
  const bin = 'tsc';

  const args = ['--build', '--pretty', '--verbose'];

  return runLocalCommand(context, bin, args);
}
