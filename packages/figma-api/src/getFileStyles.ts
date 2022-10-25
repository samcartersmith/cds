import { createClient } from './createClient';
import type { Style } from './getStyle';

type GetFileStylesParams = never;

type GetFileStylesResponse = {
  status: number;
  error: boolean;
  meta: {
    styles: Style[];
  };
};

const client = createClient<GetFileStylesParams, GetFileStylesResponse>();

/** https://www.figma.com/developers/api#get-file-styles-endpoint */
export async function getFileStyles(fileKey: string) {
  return client(`files/${fileKey}/styles`);
}
