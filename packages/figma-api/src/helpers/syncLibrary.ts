import { GetImageParams, ImageFormat } from '../getFileImages';

import { DownloadInformation, getNodesAndImageUrls } from './getNodesAndImageUrls';
import { getNormalizedFile, RequestType } from './getNormalizedFile';
import { getRecentlyUpdated } from './getRecentlyUpdated';

type SharedParams = {
  fileId: string;
  lastUpdated?: string;
  // filter: (item:  FullStyleMetadata | SharedElement, index: number, array: FullStyleMetadata[] | SharedElement[]) => boolean;
  filter?: (item: { readonly name: string }) => boolean;
};

type SyncLibraryParams = SharedParams &
  (
    | {
        requestType: 'styles';
        /** There is nothing to download if we are syncing styles */
        downloadFormats?: undefined;
      }
    | {
        requestType: Exclude<RequestType, 'styles'>;
        downloadFormats?: GetImageParams[] | ImageFormat[];
      }
  );

export type SyncedLibrary = DownloadInformation & {
  remoteIds: string[];
  recentlyUpdatedIds: string[];
};

export async function syncLibrary({
  fileId,
  lastUpdated,
  requestType,
  downloadFormats,
  filter = () => true,
}: SyncLibraryParams): Promise<SyncedLibrary> {
  const file = await getNormalizedFile(fileId, requestType);

  const nodesForRequestType = Object.values(file.items).filter(filter);
  const remoteIds = nodesForRequestType.map((item) => item.node_id);
  const recentlyUpdatedIds = getRecentlyUpdated({ lastUpdated, nodes: nodesForRequestType });

  const downloadedFormatsAndNodes = await getNodesAndImageUrls({
    downloadFormats,
    ids: recentlyUpdatedIds,
    file,
  });

  return { remoteIds, recentlyUpdatedIds, ...downloadedFormatsAndNodes };
}
