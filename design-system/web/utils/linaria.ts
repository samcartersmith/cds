export declare type ClassName = string | false | undefined | null | 0;

/**
 * Dropin replacement for linaria's cx function
 * @link https://github.com/callstack/linaria/blob/master/packages/utils/src/cx.ts
 * Takes a list of class names and filters for truthy ones, joining them into a single class name for convenience.
 * eg.
 * ```js
 *  cx('red', isBig && 'big') // returns 'red big' if `isBig` is true, otherwise returns 'red'
 * ```
 * If arguments provided are objects, these objects are merged together, and the values are taken as class names:
 *
 * ```js
 *  cx({ color: 'class1', textDecoration: 'class2'}, { color: 'class3' }) // returns `class3 class2`
 * ```
 *
 * @returns the combined, space separated class names that can be applied directly to the class attribute
 */
export function cx(...classNames: ClassName[]) {
  return classNames.filter(Boolean).join(' ');
}
