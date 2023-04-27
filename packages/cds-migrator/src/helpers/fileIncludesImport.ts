/**
 * Check if a file includes a renamed value
 * @param sourceContent - The file content to check
 * @param path - A path or array of paths to check
 * @returns boolean
 */
export function fileIncludesImport(sourceContent: string, path: string | string[]): boolean {
  return [...path].some((val) => sourceContent.includes(val));
}
