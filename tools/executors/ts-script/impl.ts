// ts-node -r tsconfig-paths/register -P ./tsconfig.json packages/codegen/website/build.ts

// If envs is set, example run 
//NODE_OPTIONS="--trace-deprecation --abort-on-uncaught-exception --max-old-space-size=4096"  ts-node -r tsconfig-paths/register -P ./tsconfig.json packages/codegen/adoption/prepare.ts --tempDir=packages/codegen/adoption/temp debug=1` in ./Users/jennifer.liu/Projects/design-system`

import { ExecutorContext } from '@nrwl/devkit';
import { runLocalCommand } from '../utils';

type RunScriptOptions = {
  scriptPath: string;
  args: string[];
  envs: Record<string, string>; 
};

export default function runScript(options: RunScriptOptions, context: ExecutorContext) {
  const { scriptPath, args, envs } = options;

  const bin = 'ts-node';

  const finalArguments = ['-r', 'tsconfig-paths/register', '-P', './tsconfig.json', scriptPath, ...(args ?? [])];

  return runLocalCommand(context, bin, finalArguments, envs ?? {}, context.root);
}
