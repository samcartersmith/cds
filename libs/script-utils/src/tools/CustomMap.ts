/**
 * Extends the native Javascript Map class and adds extra helpers
 * that are commonly used.
 *
 * Usage:
 * import { CustomMap } from "@cbhq/script-utils/tools";
 *
 * export const palettes = new CustomMap([
 *    ['foreground', 'some_unique_foreground_id'],
 *    ['background', 'some_unique_background_id']
 * ]).asSortedObject
 *
 *
 * // Output
 *  export const palettes = {
 *    background: 'some_unique_background_id',
 *    foreground: 'some_unique_foreground_id'
 * };
 */
export class CustomMap<
  Key extends string,
  Value extends string | number | boolean | unknown = string,
> extends Map<Key, Value> {
  get asObject() {
    return Object.fromEntries(this.asArray);
  }

  get asArray() {
    return [...this.entries()];
  }

  get asSortedObject() {
    return Object.fromEntries(
      this.asArray.sort(([prev], [next]) => {
        return prev.localeCompare(next);
      }),
    );
  }
}
