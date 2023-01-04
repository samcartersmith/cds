export function getDuplicates(items: string[]) {
  const uniqueItems = new Set(items);
  return items.filter((item) => {
    if (uniqueItems.has(item)) {
      uniqueItems.delete(item);
      return false;
    }
    return true;
  });
}
