import { NodeResponse, SharedElement } from '../types';

import { NormalizedFile } from './getNormalizedFile';

export type NodeResponseWithMetadata = NodeResponse & { metadata: SharedElement };

export type NormalizeNodesParams = {
  remoteFile: NormalizedFile;
  remoteNodes: Readonly<Record<string, NodeResponse | null>>;
};

export function normalizeNodes({ remoteFile, remoteNodes }: NormalizeNodesParams) {
  const nodes: Record<string, NodeResponseWithMetadata> = {};
  /**
   * Re-create the nodes response, but ensure the styles object for each node
   * is populated with the styles from getFileStyles response
   */
  Object.entries(remoteNodes).forEach(([nodeId, value]) => {
    if (value) {
      const metadata = remoteFile.items[nodeId];
      if (metadata) {
        nodes[nodeId] = {
          ...value,
          styles: remoteFile.styles,
          metadata: remoteFile.items[nodeId],
        };
      } else {
        throw new Error(
          `Missing metadata for ${nodeId}. Check the getNormalizedFile function to see why items is not including this nodeId`,
        );
      }
    }
  });

  return nodes;
}
