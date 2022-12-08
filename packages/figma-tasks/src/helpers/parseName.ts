import { camelCase } from 'lodash';
import { splitName } from '@cbhq/script-utils';

type NodeName = `${string}/${string}`;

export function parseName(node: { document: { name: string } }) {
  const parts = splitName(node.document.name as NodeName, '/');
  if (parts.length < 2) {
    throw new Error(`${node.document.name} needs to use the format [type]/[name] format`);
  }
  const [originalType, originalName] = parts;
  const type = camelCase(originalType);
  const name = originalName;
  return {
    type,
    name,
  };
}
