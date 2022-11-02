/**
 * Extends the native Javascript Set class and adds extra helpers
 * that are commonly used.
 *
 * Usage:
 * import { writePrettyFile } from "@cbhq/script-utils/fs";
 * import { typescript } from "@cbhq/script-utils/taggedTemplate";
 * import { CustomSet } from "@cbhq/script-utils/tools";
 *
 * const paletteNames = new CustomSet([
 *  'foreground',
 *  'foreground',
 *  'background',
 * ]).asSortedArray;
 *
 * const paletteNameType = typescript`
 *  export type PaletteName = ${paletteNames};
 * `
 *
 * await writePrettyFile('/types/PaletteName', paletteNameType)
 *
 * // Output
 * export type PaletteName = 'background' | 'foreground';
 */
export class CustomSet<T extends string = string> extends Set<T> {
  get asArray(): T[] {
    return [...this.values()];
  }

  get asSortedArray(): T[] {
    return this.asArray.sort((prev, next) => prev.localeCompare(next));
  }
}
