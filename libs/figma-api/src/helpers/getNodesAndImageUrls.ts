import { getFileImages, ImageFormat, ImageFormats } from '../getFileImages';
import { getFileNodes } from '../getFileNodes';
import { NodeResponse } from '../types';

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

function filterValidIdsForImagesEndpoint({
  ids,
  file,
  remoteNodes,
}: Pick<BatchDownloadParams, 'ids' | 'file'> & {
  remoteNodes: Readonly<Record<string, NodeResponse | null>>;
}) {
  /**
   * For component_sets, we want the images for the *children* components
   * of a component_set, not the component_set itself.
   *
   * An example is an Icon component_set with multiple size variants
   * If we were to get the image of the component_set, it would result in an
   * image with all size variants side by side like we see in the master component_set
   * within Figma.
   */
  if (file.requestType === 'component_sets') {
    const componentSetChildIds: string[] = [];
    ids.forEach((id) => {
      const node = remoteNodes[id];
      if (node) {
        const isComponentSet = remoteNodes[id]?.document.type === 'COMPONENT_SET';
        if (isComponentSet) {
          Object.keys(node.components).forEach((childId) => {
            componentSetChildIds.push(childId);
          });
        } else {
          componentSetChildIds.push(id);
        }
      }
    });
    return componentSetChildIds;
  }
  return ids;
}

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
    const nodeIdsAsString = idGroup.join(',');

    const { nodes: remoteNodes } = await getFileNodes(file.id, {
      ids: nodeIdsAsString,
      geometry: 'paths',
    });

    if (imageFormats) {
      const filteredIds = filterValidIdsForImagesEndpoint({ file, ids, remoteNodes });

      for await (const params of imageFormats) {
        const formatParams = typeof params === 'string' ? { format: params } : params;
        const { format } = formatParams;
        if (filteredIds.length > 0) {
          const imageIdGroups = getBatch(filteredIds, batchSize);
          for await (const imageIdGroup of imageIdGroups) {
            try {
              const { images } = await getFileImages(file.id, {
                ids: imageIdGroup.join(','),
                ...formatParams,
              });

              imageUrls[format] = {
                ...imageUrls[format],
                ...images,
              };
            } catch (err) {
              console.log(err);
              throw new Error('Fetching image urls failed');
            }
          }
        }
      }
    }

    const normalizedNodes = normalizeNodes({ remoteFile: file, remoteNodes });
    nodes = {
      ...nodes,
      ...normalizedNodes,
    };
  }

  return { nodes, imageUrls };
}
