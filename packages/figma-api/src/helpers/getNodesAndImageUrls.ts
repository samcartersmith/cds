import { getFileImages, ImageFormat, ImageFormats } from '../getFileImages';
import { getFileNodes } from '../getFileNodes';

import { getBatch } from './getBatch';
import { NormalizedFile } from './getNormalizedFile';
import { NodeResponseWithMetadata, normalizeNodes } from './normalizeNodes';

type BatchDownloadParams = {
  /** The normalized file to merge detailed node information with */
  file: NormalizedFile;
  /** The node ids to fetch detailed node information for */
  ids: string[];
  /** The image formats to fetch urls for */
  imageFormats?: ImageFormats;
  /** The of group size to use for staggering API requests */
  batchSize: number;
};

export type SyncedLibraryImageUrls = { [key in ImageFormat]: Record<string, string> };

export type SyncedLibraryNodes = Record<string, NodeResponseWithMetadata>;

export type SyncedNodesAndImageUrls = {
  nodes: SyncedLibraryNodes;
  imageUrls: SyncedLibraryImageUrls;
};

export async function getNodesAndImageUrls({
  file,
  imageFormats,
  ids,
  batchSize,
}: BatchDownloadParams): Promise<SyncedNodesAndImageUrls> {
  const imageUrls: SyncedLibraryImageUrls = { jpg: {}, png: {}, svg: {}, pdf: {} };

  let nodes: Record<string, NodeResponseWithMetadata> = {};

  const idGroups = getBatch(ids, batchSize);

  for await (const idGroup of idGroups) {
    const idsForGroup = idGroup.join(',');

    if (imageFormats) {
      for await (const params of imageFormats) {
        const formatParams = typeof params === 'string' ? { format: params } : params;
        const { format } = formatParams;
        const { images } = await getFileImages(file.id, {
          ids: idsForGroup,
          ...formatParams,
        });

        imageUrls[format] = {
          ...imageUrls[format],
          ...images,
        };
      }
    }

    const { nodes: remoteNodes } = await getFileNodes(file.id, {
      ids: idsForGroup,
      geometry: 'paths',
    });

    const normalizedNodes = normalizeNodes({ remoteFile: file, remoteNodes });
    nodes = {
      ...nodes,
      ...normalizedNodes,
    };
  }

  return { nodes, imageUrls };
}
