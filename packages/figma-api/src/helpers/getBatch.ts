function* chunks(ids: string[], chunkSize: number) {
  for (let i = 0; i < ids.length; i += chunkSize) {
    yield ids.slice(i, i + chunkSize);
  }
}

export function getBatch(ids: string[]) {
  let idGroups: string[][] = [ids];
  const groupSize = 400;
  /** Cap each request to only 400 items or less at a time */
  idGroups = [...chunks(ids, groupSize)];
  return idGroups;
}
