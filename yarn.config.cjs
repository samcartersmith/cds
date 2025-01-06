/** @type {import('@yarnpkg/types')} */
const { defineConfig } = require('@yarnpkg/types');

/**
 * This rule will enforce that a workspace MUST depend on the same version of
 * a dependency as the one used by the other workspaces.
 *
 * @param {import('@yarnpkg/types').Yarn.Constraints.Context} context
 */
const enforceConsistentDependenciesAcrossTheProject = ({ Yarn }) => {
  for (const dependency of Yarn.dependencies()) {
    if (dependency.type === `peerDependencies`) continue;
    for (const otherDependency of Yarn.dependencies({ ident: dependency.ident })) {
      if (otherDependency.type === `peerDependencies`) continue;
      dependency.update(otherDependency.range);
    }
  }
};

/**
 * This rule will enforce that a workspace MUST depend on the local "workspace:^"
 * version of a dependency if it exists.
 *
 * @param {import('@yarnpkg/types').Yarn.Constraints.Context} context
 */
const enforceWorkspaceDependenciesWhereAvailable = ({ Yarn }) => {
  for (const workspace of Yarn.workspaces()) {
    for (const workspacePackageDependency of Yarn.dependencies({ ident: workspace.ident })) {
      if (workspacePackageDependency.type === 'peerDependencies') continue;
      workspacePackageDependency.update('workspace:^');
    }
  }
};

module.exports = defineConfig({
  async constraints(context) {
    enforceConsistentDependenciesAcrossTheProject(context);
    enforceWorkspaceDependenciesWhereAvailable(context);
  },
});
