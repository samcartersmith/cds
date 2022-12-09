type GetRecentlyUpdatedParams = {
  remoteItems: Readonly<{ node_id: string; updated_at: string }[]>;
  lastUpdated?: string;
};
export function getRecentlyUpdated({ remoteItems, lastUpdated = '' }: GetRecentlyUpdatedParams) {
  const recentlyUpdatedItems = remoteItems.filter((item) => {
    if (lastUpdated) {
      const date1 = new Date(item.updated_at);
      const date2 = new Date(lastUpdated);
      return date1 > date2;
    }
    return true;
  });

  return recentlyUpdatedItems.map((item) => item.node_id);
}
