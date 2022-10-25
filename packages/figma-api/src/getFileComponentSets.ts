import { createClient } from './createClient';
import type { ComponentSet } from './getComponentSet';

type GetFileComponentSetsParams = never;

type GetFileComponentSetsResponse<Name extends string = string> = {
  status: number;
  error: boolean;
  meta: {
    component_sets: ComponentSet<Name>[];
  };
};

/** https://www.figma.com/developers/api#get-file-component-sets-endpoint */
export async function getFileComponentSets<Name extends string = string>(fileKey: string) {
  const client = createClient<GetFileComponentSetsParams, GetFileComponentSetsResponse<Name>>();
  return client(`files/${fileKey}/component_sets`);
}
