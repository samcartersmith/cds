type ItemShape = {
  createdAt: string;
};

export function sortByCreatedAt(prev: ItemShape, next: ItemShape) {
  const prevDate = new Date(prev.createdAt).valueOf();
  const nextDate = new Date(next.createdAt).valueOf();

  return prevDate - nextDate;
}
