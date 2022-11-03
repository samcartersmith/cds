import { createClient } from './createClient';

export type Style<Name extends string = string> = {
  key: string;
  file_key: string;
  node_id: string;
  style_type: 'FILL' | 'TEXT' | 'EFFECT' | 'GRID';
  thumbnail_url: string;
  name: Name;
  description: string;
  updated_at: string;
  created_at: string;
  sort_position: string;
};

type GetStyleParams = never;

type GetStyleResponse<Name extends string = string> = {
  status: number;
  error: boolean;
  meta: Style<Name>;
};

/** https://www.figma.com/developers/api#get-style-endpoint */
export async function getStyle<Name extends string = string>(styleKey: string) {
  const client = createClient<GetStyleParams, GetStyleResponse<Name>>();
  return client(`styles/${styleKey}`);
}
