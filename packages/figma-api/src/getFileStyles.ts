import { createClient } from './createClient';
import type { Style } from './getStyle';

type GetFileStylesParams = never;

export type GetFileStylesResponse<Name extends string = string> = {
  status: number;
  error: boolean;
  meta: {
    styles: Style<Name>[];
  };
};

/** https://www.figma.com/developers/api#get-file-styles-endpoint */
export async function getFileStyles<Name extends string = string>(fileKey: string) {
  const client = createClient<GetFileStylesParams, GetFileStylesResponse<Name>>();
  const data = await client(`files/${fileKey}/styles`);
  return data.meta.styles;
}
