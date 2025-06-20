import { output as devkitOutput } from '@nx/devkit';
import { Task } from '@cbhq/mono-tasks';

import type { Manifest, ManifestTaskOptions } from '../tools/Manifest';

export function logSummary(
  manifest: Manifest,
  task: Task<ManifestTaskOptions>,
  options: { ignoreBreakingChanges?: boolean } = {},
) {
  if (manifest.renames.size) {
    console.log(`
/* -------------------------------------------------------------------------- */
/*                                   RENAMED                                  */
/* -------------------------------------------------------------------------- */
`);
    console.table(
      [...manifest.renames.entries()].map(([previous, next]) => ({
        type: previous.type,
        previous: previous.name,
        new: next.name,
      })),
    );
  }

  if (manifest.updates.size) {
    console.log(`
/* -------------------------------------------------------------------------- */
/*                                   UPDATED                                  */
/* -------------------------------------------------------------------------- */
`);
    console.table(
      [...manifest.updates.values()].map((item) => ({ type: item.type, name: item.name })),
    );
  }

  if (manifest.additions.size) {
    console.log(`
/* -------------------------------------------------------------------------- */
/*                                    ADDED                                   */
/* -------------------------------------------------------------------------- */
`);
    console.table(
      [...manifest.additions.values()].map((item) => ({ type: item.type, name: item.name })),
    );
  }

  if (manifest.deletions.size) {
    console.log(`
/* -------------------------------------------------------------------------- */
/*                                   DELETED                                  */
/* -------------------------------------------------------------------------- */
`);
    console.table(
      [...manifest.deletions.values()].map((item) => ({ type: item.type, name: item.name })),
    );
  }

  if (!options.ignoreBreakingChanges && (manifest.renames.size || manifest.deletions.size)) {
    if (task.options.exitOnBreakingChanges) {
      throw new Error('Renames and deletions are breaking changes');
    }

    devkitOutput.warn({
      title: 'Renames and deletions are breaking changes',
      bodyLines: [
        'Please ensure that you publish a migration guide and a migrator script along with this release',
      ],
    });
  }
}
