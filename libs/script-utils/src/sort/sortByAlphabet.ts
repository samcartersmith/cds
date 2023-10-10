export function sortByAlphabet(prev: string | [string, unknown], next: string | [string, unknown]) {
  const prevValue = Array.isArray(prev) ? prev[0] : prev;
  const nextValue = Array.isArray(next) ? next[0] : next;
  /** @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/Collator */
  return prevValue.localeCompare(nextValue, undefined, { numeric: true, sensitivity: 'base' });
}
