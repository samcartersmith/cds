/**
 * Check if a file includes a renamed value
 * @param sourceContent - The file content to check
 * @param renameMap - The rename map to check against
 * @returns boolean
 */
export function fileIncludesRenamedValue(sourceContent: string, renamedValues: string[]): boolean {
  return renamedValues.some((val) => sourceContent.includes(val));
}
