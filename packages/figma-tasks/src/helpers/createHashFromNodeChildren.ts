import crypto from 'node:crypto';
import type { Node } from '@cbhq/figma-api';

export function createHashFromNodeChildren(children: readonly Node[]) {
  const stringifiedObj = JSON.stringify(children);
  return crypto.createHash('sha256').update(stringifiedObj).digest('base64');
}
