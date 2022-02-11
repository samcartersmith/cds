// ts-node -r tsconfig-paths/register -P ./tsconfig.json packages/codegen/website/build.ts

import { ExecutorContext } from '@nrwl/devkit';
import { runLocalCommand } from '../utils';

type RunScriptOptions = {
  scriptPath: string;
};

export default function runScript(options: RunScriptOptions, context: ExecutorContext) {
  const { scriptPath } = options;

  const bin = 'ts-node';

  const args = ['-r', 'tsconfig-paths/register', '-P', './tsconfig.json', scriptPath];

  return runLocalCommand(context, bin, args, context.root);
}
