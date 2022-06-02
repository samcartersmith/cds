import { ExecutorContext } from '@nrwl/devkit';

import { runLocalCommand } from '../utils';

type Options = {
  /**
   * The source directory of your TypeScript plugin
   * @default src
   */
  sourceDir?: string;
  /**
   * The target directory of transpilation output.
   * @default lib
   */
  targetDir?: string;
  /**
   * The directory of your theme components. If the directory is not present, we assume that no theme components are present.
   * @default src/theme
   */
  themeDir?: string;
  /**
   * The directory to output the human-readable JS components
   * @default lib/js-theme
   */
  themeTargetDir?: string;
  /**
   * A list of patterns to be ignored—no compilation output will be emitted.
   * @default __tests__
   */
  ignore?: string[];
};
export default async function runScript(
  { sourceDir, targetDir, themeDir, themeTargetDir, ignore }: Options,
  context: ExecutorContext,
) {
  const bin = 'docusaurus-plugin';
  let finalArgs: string[] = ['build'];

  if (sourceDir) {
    finalArgs = ['--source-dir', sourceDir];
  }

  if (targetDir) {
    finalArgs = [...finalArgs, '--target-dir', targetDir];
  }

  if (themeDir) {
    finalArgs = [...finalArgs, '--theme-dir', themeDir];
  }

  if (themeTargetDir) {
    finalArgs = [...finalArgs, '--theme-target-dir', themeTargetDir];
  }

  if (ignore) {
    finalArgs = [...finalArgs, '--ignore', ...ignore];
  }

  return runLocalCommand(context, bin, finalArgs);
}
