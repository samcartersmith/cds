type ItemShape = {
  lastUpdated: string;
};

export function sortByLastUpdated(prev: ItemShape, next: ItemShape) {
  const prevDate = new Date(prev.lastUpdated).valueOf();
  const nextDate = new Date(next.lastUpdated).valueOf();

  return prevDate - nextDate;
}
