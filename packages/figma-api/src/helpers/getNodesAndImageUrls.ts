import { getFileImages, GetImageParams, ImageFormat } from '../getFileImages';
import { getFileNodes } from '../getFileNodes';

import { getBatch } from './getBatch';
import { NormalizedFile } from './getNormalizedFile';
import { NodeResponseWithMetadata, normalizeNodes } from './normalizeNodes';

type BatchDownloadParams = {
  file: NormalizedFile;
  ids: string[];
  downloadFormats?: GetImageParams[] | ImageFormat[];
};

type DownloadFormatMap = Record<ImageFormat, Record<string, string>>;

export type DownloadInformation = DownloadFormatMap & {
  nodes: Record<string, NodeResponseWithMetadata>;
};

export async function getNodesAndImageUrls({
  file,
  downloadFormats,
  ids,
}: BatchDownloadParams): Promise<DownloadInformation> {
  const resolvedDownloads: DownloadFormatMap = { jpg: {}, png: {}, svg: {}, pdf: {} };

  let nodes: Record<string, NodeResponseWithMetadata> = {};

  const idGroups = getBatch(ids);

  for await (const idGroup of idGroups) {
    const idsForGroup = idGroup.join(',');

    if (downloadFormats) {
      for await (const params of downloadFormats) {
        const formatParams = typeof params === 'string' ? { format: params } : params;
        const { format } = formatParams;
        const { images } = await getFileImages(file.id, {
          ids: idsForGroup,
          ...formatParams,
        });

        resolvedDownloads[format] = {
          ...resolvedDownloads[format],
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

  return { nodes, ...resolvedDownloads };
}
