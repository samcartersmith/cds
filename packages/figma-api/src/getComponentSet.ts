import { createClient } from './createClient';

export type ComponentSet<Name extends string = string> = {
  key: string;
  file_key: string;
  node_id: string;
  thumbnail_url: string;
  name: Name;
  description: string;
  /** The UTC ISO 8601 time at which the component was updated */
  updated_at: string;
  /** The UTC ISO 8601 time at which the component was created */
  created_at: string;
};

type GetComponentSetParams = never;

type GetComponentSetResponse = {
  status: number;
  error: boolean;
  meta: ComponentSet;
};

const client = createClient<GetComponentSetParams, GetComponentSetResponse>();

/** https://www.figma.com/developers/api#get-component-sets-endpoint */
export async function getComponentSet(componentSetKey: string) {
  return client(`component_sets/${componentSetKey}`);
}
