/* eslint-disable no-param-reassign */

import path from 'path';
import type webpack from 'webpack';

/**
 * Since we run all of our tooling through Bazel, it makes things *very* tricky.
 *
 * When running with `bazel build`, all files are copied into a sandbox and built from there
 * by changing the current working directory to the sandbox. For the most part this works
 * fine as the build is hermetic, the folder is isolated, and theres only 1 node_modules folder.
 *
 * However, when running with `bazel run`, it runs from your workspace directory (monorepo root)
 * instead of the sandbox, but also references files from the output directory. This is problematic
 * as it results in multiple node_modules folders, which duplicate packages across all trees.
 * Here's an example of all the different paths being used in a webpack config:
 *
 * - ~/Projects/monorepo/node_modules
 * - /private/var/tmp/_bazel_milesjohnson/a3f1e21faca691f85e7e54fa376a3339/execroot/coinbazel/node_modules
 * - /private/var/tmp/_bazel_milesjohnson/a3f1e21faca691f85e7e54fa376a3339/execroot/coinbazel/bazel-out/darwin-fastbuild/bin/<package>/serve.sh.runfiles/coinbazel/node_modules
 *
 * This becomes very apparent with React as it throws the "Invalid hook call" error when
 * launching an application. This is 100% caused by duplicate `react` packages in node_modules.
 * This problem is further exacerbated by Docusaurus and Storybook, as they define webpack
 * aliases with `config.resolve.alias`. These aliases can all point to different node_module paths.
 *
 * To resolve all these problems (after many attempts), this function will dig through the
 * webpack config and update any file path to utilize the monorepo node_modules folder (first item
 * in the list above). We also define `react` and `react-dom` aliases to avoid the duplicate
 * package problem. This is unfortunate but I haven't found a better solution yet.
 */
export function updateNodeModulesPath(config: webpack.Configuration, nodeModulesRoot: string) {
  function remap<T extends string | string[]>(modulePath: T): T {
    if (Array.isArray(modulePath)) {
      return modulePath.map((mp) => remap(mp)) as T;
    }

    if (modulePath.includes('node_modules') && !modulePath.startsWith(nodeModulesRoot)) {
      return path.join(nodeModulesRoot, modulePath.split('node_modules')[1]) as T;
    }

    return modulePath;
  }

  if (Array.isArray(config.entry) || typeof config.entry === 'string') {
    config.entry = remap(config.entry);
  }

  if (config.module?.rules) {
    config.module.rules.forEach((rule) => {
      if (rule !== '...' && Array.isArray(rule.use)) {
        rule.use = rule.use.map((use) => {
          if (typeof use === 'string') {
            return remap(use);
          }

          if (typeof use === 'object' && typeof use.loader === 'string') {
            use.loader = remap(use.loader);
          }

          return use;
        });
      }
    });
  }

  if (config.resolve) {
    config.resolve.modules = ['node_modules', nodeModulesRoot];

    Object.entries(config.resolve.alias ?? {}).forEach(([alias, modulePath]: [string, string]) => {
      // @ts-expect-error Type mismatch in webpack
      config.resolve.alias[alias] = remap(modulePath);
    });

    // Avoid multiple versions of react in the bundle
    Object.assign(config.resolve.alias, {
      '@mdx-js': path.join(nodeModulesRoot, '@mdx-js'),
      react: path.join(nodeModulesRoot, 'react'),
      'react-dom': path.join(nodeModulesRoot, 'react-dom'),
    });
  }

  if (config.resolveLoader) {
    config.resolveLoader.modules = ['node_modules', nodeModulesRoot];
  }
}
