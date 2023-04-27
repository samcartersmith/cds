/**
 * Mutates the object by replacing the key with a new key
 * @param obj - The object to mutate
 * @param oldKey - The old key to replace
 * @param newKey - The new key to replace the old key with
 */
export function replaceKey<T>({
  obj,
  oldKey,
  newKey,
}: {
  obj: T;
  oldKey: keyof T;
  newKey: keyof T;
}) {
  if (Object.getOwnPropertyDescriptor(obj, oldKey)) {
    // eslint-disable-next-line no-param-reassign
    obj[newKey] = obj[oldKey];
    // eslint-disable-next-line no-param-reassign
    delete obj[oldKey];
  }
  return obj;
}
