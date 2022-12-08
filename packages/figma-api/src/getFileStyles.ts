import { createClient } from './createClient';
import { FileStylesResponse } from './types';

type GetFileStylesParams = never;

/** https://www.figma.com/developers/api#get-file-styles-endpoint */
export async function getFileStyles(fileKey: string) {
  const client = createClient<GetFileStylesParams, FileStylesResponse>();
  return client(`files/${fileKey}/styles`);
}
