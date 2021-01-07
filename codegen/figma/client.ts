import axios, { AxiosPromise } from 'axios';

import * as Figma from './api';

export type ExportFormat = 'jpg' | 'png' | 'svg' | 'pdf';

export const FigmaClient = (personalAccessToken: string) => {
  const client = axios.create({
    baseURL: 'https://api.figma.com/v1/',
    headers: {
      'X-Figma-Token': personalAccessToken,
    },
  });
  return {
    client,
    /** Get a single figma file */
    file: (fileId: string, nodeId: string): AxiosPromise<Figma.FileResponse> =>
      client.get(`files/${fileId}`, {
        params: {
          ids: nodeId,
        },
      }),
    /** Get a single figma node */
    node: (fileId: string, nodeId: string): AxiosPromise<Figma.FileNodesResponse> =>
      client.get(`files/${fileId}/nodes`, {
        params: {
          ids: nodeId,
        },
      }),
    /**
     * Export nodes from the file in the format asked. If succeeds, returns a map of node id to s3
     * asset urls to download the exported images.
     * @param {fileId} String File to export images from
     * @param {nodeIds} String Node ids to the images in figma
     * @param {format} ExportFormat file format for the images
     * @see https://www.figma.com/developers/api#get-images-endpoint
     */
    fileImages: (
      fileId: string,
      nodeIds: string[],
      format: ExportFormat = 'svg'
    ): AxiosPromise<Figma.FileImageResponse> =>
      client.get(`images/${fileId}`, {
        params: {
          ids: nodeIds.join(','),
          format,
        },
      }),
  };
};
