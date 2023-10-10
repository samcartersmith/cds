import type { ConfigAPI, TransformOptions } from '@babel/core';
import linariaBabelPreset from 'linaria/babel';
import path from 'path';
import { argv } from 'yargs';

import { linariaCssExtractPlugin } from './linariaCssExtractPlugin';

type ArgvSync = {
  [x: string]: unknown;
  _: (string | number)[];
  $0: string;
};

export default function linariaPreset(
  babel: ConfigAPI,
  options: Record<string, unknown>,
  cwd: string,
): TransformOptions {
  if (Object.prototype.hasOwnProperty.call(argv, 'then')) {
    throw Error('linariaPreset argv must not be async');
  }

  const argvSync = argv as ArgvSync;

  // If we're not building a package, we can skip the extraction plugin
  if (!argvSync._[0]) {
    return {};
  }

  const preset = linariaBabelPreset(babel, options, cwd);
  const linariaPlugin = [
    linariaCssExtractPlugin,
    {
      // bazel-out/darwin-fastbuild/bin/eng/shared/design-system/<package>/lib
      outDir: argvSync.outDir,
      // /private/var/tmp/<hash>/sandbox/darwin-sandbox/execroot/coinbazel/eng/shared/design-system/<package>
      sandboxDir: path.join(cwd, path.basename(String(argvSync._[0]))),
    },
  ];

  if (preset.plugins) {
    preset.plugins.push(linariaPlugin);
  } else {
    preset.plugins = [linariaPlugin];
  }

  return preset;
}
