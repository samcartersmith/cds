import { createClient } from './createClient';

export type Style = {
  status: number;
  error: boolean;
  meta: {
    key: string;
    file_key: string;
    node_id: string;
    style_type: 'FILL' | 'TEXT' | 'EFFECT' | 'GRID';
    thumbnail_url: string;
    name: string;
    description: string;
    updated_at: string;
    created_at: string;
    sort_position: string;
  };
};

type GetStyleParams = never;

type GetStyleResponse = {
  status: number;
  error: boolean;
  meta: Style;
};

const client = createClient<GetStyleParams, GetStyleResponse>();

/** https://www.figma.com/developers/api#get-style-endpoint */
export async function getStyle(styleKey: string) {
  return client(`styles/${styleKey}`);
}
