import axios, { AxiosResponse } from 'axios';

import * as Figma from './api';

export type ExportFormat = 'jpg' | 'png' | 'svg' | 'pdf';

export const CDS_PERSONAL_ACCESS_TOKEN = '222741-d8a3b21a-4271-43ef-80d8-b7dea84175ee';

/**
 * Make sure that scale is within the range 0.01-4, since those
 * are the only acceptable values for Figma image scales.
 * @param scale
 * @returns a valid scale number
 */
const validateScale = (scale: number): number => {
  if (scale < 0.01 || scale > 4) {
    throw new Error(`The scale ${scale} is out of range. Can only be between 0.01 and 4`);
  }

  return scale;
};

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
    file: async (fileId: string, nodeId: string): Promise<AxiosResponse<Figma.FileResponse>> =>
      client.get(`files/${fileId}`, {
        params: {
          ids: nodeId,
        },
      }),
    /** Get a single figma node */
    node: async (fileId: string, nodeId: string): Promise<AxiosResponse<Figma.FileNodesResponse>> =>
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
     * @param {scale} Number A number between 0.01 and 4, the image scaling factor
     * @see https://www.figma.com/developers/api#get-images-endpoint
     */
    fileImages: async (
      fileId: string,
      nodeIds: string[],
      format: ExportFormat = 'svg',
      scale = 1,
    ): Promise<AxiosResponse<Figma.FileImageResponse>> => {
      validateScale(scale);
      return client.get(`images/${fileId}`, {
        params: {
          ids: nodeIds.join(','),
          format,
          scale,
        },
      });
    },
  };
};
