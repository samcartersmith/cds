function* chunks<T>(ids: T[], chunkSize: number) {
  for (let i = 0; i < ids.length; i += chunkSize) {
    yield ids.slice(i, i + chunkSize);
  }
}

export function getBatch<T>(ids: T[], batchSize: number) {
  let idGroups: T[][] = [ids];
  idGroups = [...chunks(ids, batchSize)];
  return idGroups;
}
