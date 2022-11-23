import { createClient } from './createClient';
import { ComponentSetResponse } from './types';

type GetComponentSetParams = never;

const client = createClient<GetComponentSetParams, ComponentSetResponse>();

/** https://www.figma.com/developers/api#get-component-sets-endpoint */
export async function getComponentSet(componentSetKey: string) {
  return client(`component_sets/${componentSetKey}`);
}
