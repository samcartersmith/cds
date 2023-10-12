import path from 'node:path';

/**
 * PROJECT_CWD comes from yarn
 * NX_MONOREPO_ROOT comes from mono-tasks
 */
export const MONOREPO_ROOT = process.env.PROJECT_CWD ?? process.env.NX_MONOREPO_ROOT;

/**
 * Get absolute file path, relative to the root of repo.
 * @param pathInput - i.e. packages/mobile/package.json
 * @returns string - Users/katherinemartinez/cds/packages/mobile/package.json
 */
export function getPath(pathInput: string) {
  /**
   * If unable to resolve MONOREPO_ROOT then walk back to root of repo manually
   */

  if (MONOREPO_ROOT) {
    return `${MONOREPO_ROOT}/${pathInput}`;
  }

  return path.resolve(__dirname, '../../../', pathInput);
}
