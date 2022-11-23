import { createClient } from './createClient';
import { StyleResponse } from './types';

type GetStyleParams = never;

/** https://www.figma.com/developers/api#get-style-endpoint */
export async function getStyle(styleKey: string) {
  const client = createClient<GetStyleParams, StyleResponse>();
  return client(`styles/${styleKey}`);
}
