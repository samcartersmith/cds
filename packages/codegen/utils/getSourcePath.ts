/**
 * Get absolute file path, relative to the root of repo.
 * @param path - i.e. packages/mobile/package.json
 * @returns string - Users/katherinemartinez/cds/packages/mobile/package.json
 */
export function getSourcePath(path: string) {
  return `${process.env.PROJECT_CWD ?? process.env.NX_MONOREPO_ROOT}/${path}`;
}
