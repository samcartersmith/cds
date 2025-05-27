/**
 * Function to sort the new names array based on the old names array
 * @param oldArray
 * @param newArray
 * @returns sorted names array in order of old names array with new entries appended at the end
 */
export function sortNamesByOldOrder(oldArray: string[], newArray: string[]): string[] {
  // Step 1: Create a mapping from name to its index in the old array
  const orderMap = new Map<string, number>();
  oldArray.forEach((name, index) => {
    orderMap.set(name, index);
  });

  // Step 2: Separate newArray into two arrays: one that exists in oldArray and one that doesn't
  const existingNames: string[] = [];
  const newAdditions: string[] = [];

  newArray.forEach((name) => {
    if (orderMap.has(name)) {
      existingNames.push(name);
    } else {
      newAdditions.push(name);
    }
  });

  // Step 3: Sort existingNames based on their order in oldArray
  existingNames.sort((a, b) => {
    return (orderMap.get(a) ?? 0) - (orderMap.get(b) ?? 0);
  });

  // Step 4: Concatenate the sorted existing names with new additions
  return [...existingNames, ...newAdditions];
}
