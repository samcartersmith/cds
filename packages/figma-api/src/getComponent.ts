import { createClient } from './createClient';

export type Component<Name extends string = string> = {
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

type GetComponentParams = never;

type GetComponentResponse = {
  status: number;
  error: boolean;
  meta: Component;
};

const client = createClient<GetComponentParams, GetComponentResponse>();

/** https://www.figma.com/developers/api#get-component-endpoint */
export async function getComponent(componentKey: string) {
  return client(`components/${componentKey}`);
}
