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

  // Regular expression to match camel case pattern
  const camelCasePattern = /^[a-z][a-zA-Z0-9]*$/;
  if (!camelCasePattern.test(name)) {
    throw new Error(`Name is not in camelCase: ${name}. Figma file should be updated.`);
  }

  return {
    type,
    name,
  };
}
