import { createClient } from './createClient';
import { ComponentResponse } from './types';

const client = createClient<never, ComponentResponse>();

/** https://www.figma.com/developers/api#get-component-endpoint */
export async function getComponent(componentKey: string) {
  return client(`components/${componentKey}`);
}
