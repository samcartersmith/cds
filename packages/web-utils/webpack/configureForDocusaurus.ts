import path from 'path';
import type webpack from 'webpack';

import { modifyConfigForTooling } from './modifyConfigForTooling';
import { updateNodeModulesPath } from './updateNodeModulesPath';

export function configureForDocusaurus(config: webpack.Configuration) {
  modifyConfigForTooling(config);

  // We are running with `bazel run`, so use local node modules instead of a sandbox
  if (process.env.BUILD_WORKSPACE_DIRECTORY) {
    updateNodeModulesPath(config, path.join(process.env.BUILD_WORKSPACE_DIRECTORY, 'node_modules'));
  }

  // Docusaurus wants us to return a webpack object to merge with,
  // but since we're modifying the object directly, just return this.
  return {};
}
