import type { Manifest } from '../tools/Manifest';

export function logSummary(manifest: Manifest) {
  if (manifest.renames.size) {
    console.log(`
/* -------------------------------------------------------------------------- */
/*                                   RENAMED                                  */
/* -------------------------------------------------------------------------- */
`);
    console.table(
      [...manifest.renames.entries()].map(([previous, next]) => ({
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
}
