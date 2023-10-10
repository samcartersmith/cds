import { ImageFormats } from '../getFileImages';

import { getNodesAndImageUrls, SyncedNodesAndImageUrls } from './getNodesAndImageUrls';
import { getNormalizedFile, RequestType } from './getNormalizedFile';
import { getRecentlyUpdated } from './getRecentlyUpdated';

type SyncLibraryParams = {
  /** The file id for the Figma library.  */
  fileId: string;
  /**
   * The ISO timestamp from the last time the figma library was synced. This will
   * ensure any items which were updated before the last update are excluded.
   * Because our Figma libraries are so large (>=1600 components), we do not want to
   * have to fetch images or detailed node information for items which have not changed.
   *
   * Set this to undefined or an empty string to ensure all data is returned from response
   * regardless of when an item was last updated.
   */
  lastUpdated?: string;
  /** Callback that is triggered after requestType fetch completes. When mapping
   * through that response it will fire this callback for each item, and behaves like
   * array filter function. Use this to exclude a specific item from being returned when
   * completing subsequent requests to images or nodes endpoints.
   */
  filter?: (item: { readonly name: string }) => boolean;
  /**
   * The requestType to use when getting inital metadata about when items were last updated.
   * Each requestType has a separate (fast) endpoint for fetching metadata from Figma.
   * For example, if requestType is 'components' it will use the /components endpoint and if it's
   * 'component_sets' it will use the /component_sets endpoint.
   *
   * These endpoints are very fast, but tradeoff is that it gives us minimal information such as when an item
   * was last updated and ids to other related content such as associated styles.
   *
   * The most relevant piece from the 'slow' endpoint is the 'lastUpdated' field for each node,
   * since this is used in a follow up request we make to the nodes endpoint,
   * which has much more detailed data, but is also very slow.
   *
   * So in summary, we use the first faster endpoint to determine which node ids were updated after the
   * 'lastUpdated' (param to this function) and pass in these filtered ids to the nodes request (slow response)
   * so that it only fetches data for the nodes we care about (nodes which have changed after last time this was run).
   */
  requestType: RequestType;
  /**
   * Provide this information if you want to batch requests to Figma's images endpoint to return an image url
   * for an item. This option is not needed when syncing Figma style libraries.
   */
  imageFormats?: ImageFormats;
  /** The of group size to use for staggering API requests */
  batchSize: number;
};

export type SyncedLibrary = SyncedNodesAndImageUrls & {
  remoteIds: string[];
  recentlyUpdatedIds: string[];
};

export async function syncLibrary({
  fileId,
  lastUpdated,
  requestType,
  imageFormats,
  filter = () => true,
  batchSize,
}: SyncLibraryParams): Promise<SyncedLibrary> {
  const file = await getNormalizedFile(fileId, requestType);

  const nodesForRequestType = Object.values(file.items).filter(filter);
  const remoteIds = nodesForRequestType.map((item) => item.node_id);
  const recentlyUpdatedIds = getRecentlyUpdated({ lastUpdated, nodes: nodesForRequestType });

  const downloadedFormatsAndNodes = await getNodesAndImageUrls({
    imageFormats,
    ids: recentlyUpdatedIds,
    file,
    batchSize,
  });

  return { remoteIds, recentlyUpdatedIds, ...downloadedFormatsAndNodes };
}
