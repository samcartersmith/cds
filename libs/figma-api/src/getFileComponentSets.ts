import { createClient } from './createClient';
import type { FileComponentSetsResponse } from './types';

type GetFileComponentSetsParams = never;

/** https://www.figma.com/developers/api#get-file-component-sets-endpoint */
export async function getFileComponentSets(fileKey: string) {
  const client = createClient<GetFileComponentSetsParams, FileComponentSetsResponse>();
  return client(`files/${fileKey}/component_sets`);
}
