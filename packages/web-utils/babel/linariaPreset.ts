import type { ConfigAPI, TransformOptions } from '@babel/core';
import linariaBabelPreset from 'linaria/babel';
import path from 'path';
import { argv } from 'yargs';

import linariaCssExtractPlugin from './linariaCssExtractPlugin';

export default function linariaPreset(
  babel: ConfigAPI,
  options: Record<string, unknown>,
  cwd: string,
): TransformOptions {
  // If we're not building a package, we can skip the extraction plugin
  if (!argv._[0]) {
    return {};
  }

  const preset = linariaBabelPreset(babel, options, cwd);
  const linariaPlugin = [
    linariaCssExtractPlugin,
    {
      // bazel-out/darwin-fastbuild/bin/eng/shared/design-system/<package>/lib
      outDir: argv.outDir,
      // /private/var/tmp/<hash>/sandbox/darwin-sandbox/execroot/coinbazel/eng/shared/design-system/<package>
      sandboxDir: path.join(cwd, path.basename(String(argv._[0]))),
    },
  ];

  if (preset.plugins) {
    preset.plugins.push(linariaPlugin);
  } else {
    preset.plugins = [linariaPlugin];
  }

  return preset;
}
