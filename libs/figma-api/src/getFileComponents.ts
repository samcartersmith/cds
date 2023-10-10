import { createClient } from './createClient';
import type { FileComponentsResponse } from './types';

/** https://www.figma.com/developers/api#get-file-components-endpoint */
export async function getFileComponents(fileKey: string) {
  const client = createClient<never, FileComponentsResponse>();
  return client(`files/${fileKey}/components`);
}
