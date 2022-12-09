import {
  FullStyleMetadata,
  getFileComponents,
  getFileComponentSets,
  getFileImages,
  getFileNodes,
  getFileStyles,
  NodeResponse,
  SharedElement,
  Style,
} from '@cbhq/figma-api';

import { Manifest } from '../tools/Manifest';

import { getRecentlyUpdated } from './getRecentlyUpdated';

export type LoadRemoteDataType = 'components' | 'component_sets' | 'styles';
export type Svgs = Record<string, string>;
type RemoteStyles = readonly FullStyleMetadata[];

type LoadRemoteDataParams = {
  /** The file ID to use when making requests to Figma API  */
  figmaApiFileId: string;
  downloadSvgs?: boolean;
  lastUpdated?: string;
  requestType: LoadRemoteDataType;
  manifest: Manifest;
};

type LoadFileParams = {
  /** Figma file id that response is for */
  id: string;
  component_sets: readonly SharedElement[];
  components: readonly SharedElement[];
  styles: readonly FullStyleMetadata[];
};

export async function loadFile(
  fileId: string,
  requestType: LoadRemoteDataType,
): Promise<LoadFileParams> {
  if (requestType === 'component_sets') {
    const resp = await getFileComponentSets(fileId);
    return {
      id: fileId,
      components: [],
      styles: [],
      ...resp.meta,
    };
  }
  if (requestType === 'components') {
    const resp = await getFileComponents(fileId);
    return {
      id: fileId,
      component_sets: [],
      styles: [],
      ...resp.meta,
    };
  }
  if (requestType === 'styles') {
    const resp = await getFileStyles(fileId);
    return {
      id: fileId,
      components: [],
      component_sets: [],
      ...resp.meta,
    };
  }

  throw new Error(
    `Request type of ${requestType} is not valid. Please add the desired request type to Sync class`,
  );
}

function* chunks(ids: string[], chunkSize: number) {
  for (let i = 0; i < ids.length; i += chunkSize) {
    yield ids.slice(i, i + chunkSize);
  }
}

export function normalizeNodes({
  remoteStyles,
  remoteNodes,
}: {
  remoteStyles: RemoteStyles;
  remoteNodes: Readonly<Record<string, NodeResponse | null>>;
}) {
  const stylesObject: Record<string, Style> = {};
  const nodes: Record<string, NodeResponse> = {};

  remoteStyles.forEach((item) => {
    stylesObject[item.node_id] = { ...item, styleType: item.style_type, remote: true };
  });

  /**
   * Re-create the nodes response, but ensure the styles object for each node
   * is populated with the styles from getFileStyles response
   */
  Object.entries(remoteNodes).forEach(([key, value]) => {
    if (value) {
      nodes[key] = {
        ...value,
        styles: stylesObject,
      };
    }
  });

  return nodes;
}

type LoadNodesParams = {
  figmaApiFileId: string;
  remoteIds: string[];
  downloadSvgs: boolean;
  remoteStyles: RemoteStyles;
};

export async function loadNodes({
  figmaApiFileId,
  downloadSvgs,
  remoteIds,
  remoteStyles,
}: LoadNodesParams) {
  let idGroups: string[][] = [remoteIds];
  let svgs: Svgs | undefined = downloadSvgs ? {} : undefined;
  let nodes: Record<string, NodeResponse> = {};

  /** Cap each request to only 500 items or less at a time */
  if (remoteIds.length >= 500) {
    idGroups = [...chunks(remoteIds, 500)];
  }

  await Promise.all(
    idGroups.map(async (idGroup) => {
      if (downloadSvgs) {
        const { images: svgsFromBatch } = await getFileImages(figmaApiFileId, {
          ids: idGroup.join(','),
          format: 'svg',
        });

        svgs = { ...svgs, ...svgsFromBatch };
      }
      const { nodes: remoteNodes } = await getFileNodes(figmaApiFileId, {
        ids: idGroup.join(','),
        geometry: 'paths',
      });

      const normalizedNodes = normalizeNodes({ remoteStyles, remoteNodes });
      nodes = {
        ...nodes,
        ...normalizedNodes,
      };
    }),
  );

  return { nodes, svgs };
}

export async function loadRemoteData({
  figmaApiFileId,
  downloadSvgs = false,
  lastUpdated,
  requestType,
  manifest,
}: LoadRemoteDataParams) {
  const file = await loadFile(figmaApiFileId, requestType);

  const remoteItems = file[requestType];
  const remoteIds = remoteItems.map((item) => item.node_id);
  const recentlyUpdatedIds = getRecentlyUpdated({ lastUpdated, remoteItems });

  const { nodes, svgs } = await loadNodes({
    figmaApiFileId,
    downloadSvgs,
    remoteIds,
    remoteStyles: file.styles,
  });

  manifest.onRemoteDataLoaded({ recentlyUpdatedIds, remoteIds });

  return { nodes, svgs };
}
