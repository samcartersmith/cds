import { escapeRegExp, filterModifiedMajorDependencies } from '../utils';

export async function checkMajorVersionChangesInPeerDeps(projectName?: string) {
  if (!projectName) {
    throw new Error('Project name must be provided');
  }
  const filePath = `packages/${escapeRegExp(projectName)}/package.json`;

  // @ts-expect-error: Danger methods are in the global scope.
  // TODO: Refer to https://github.com/danger/danger-js/discussions/1153 for more details.
  const packageDiff = await danger.git.JSONDiffForFile(filePath);

  if (!packageDiff.peerDependencies) return;

  const beforeDependencies = packageDiff.peerDependencies.before as Record<string, string>;
  const afterDependencies = packageDiff.peerDependencies.after as Record<string, string>;

  // Check for modified major dependencies
  const modifiedDependencies = filterModifiedMajorDependencies(
    beforeDependencies,
    afterDependencies,
  ).map((dependencyName) => ({
    dependency: dependencyName,
    before: beforeDependencies[dependencyName],
    after: afterDependencies[dependencyName],
  }));

  // Check for removed dependencies
  const removedDependencies = Object.keys(beforeDependencies)
    .filter((dependencyName) => !afterDependencies[dependencyName])
    .map((dependencyName) => {
      return {
        dependency: dependencyName,
        before: beforeDependencies[dependencyName],
        after: null,
      };
    });

  const allModifiedDependencies = [...modifiedDependencies, ...removedDependencies];

  if (allModifiedDependencies.length > 0) {
    const message = [
      '## 🚫 Did you modify a peerDependency?',
      `A major version change or removal was detected within the peerDependencies of project **${projectName}**. \n`,
      `Modified or removed peerDependencies:`,
      '```json',
      `${JSON.stringify(allModifiedDependencies, null, 2)}`,
      '```',
      'You can skip this check by adding **#skip_danger** in the PR body or title. If you decide to use **#skip_danger**, you should get team lead approval on the PR.',
      '\nPlease refer to the [breaking changes document](https://github.cbhq.net/frontend/cds/blob/master/docs/contributing/breakingChanges.md) for more information.',
    ].join('\n');

    fail(message);
  }
}
