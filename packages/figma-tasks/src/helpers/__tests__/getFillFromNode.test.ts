import type { Node } from '@cbhq/figma-api';

import {
  figmaColorToHex,
  figmaColorToRgbaArray,
  getFillFromNode,
  numberToHex,
} from '../getFillFromNode';

describe('getFillFromNode', () => {
  test('figmaColorToRgbaArray converts a Figma color to an RGBA array', () => {
    const color = { r: 0.1, g: 0.2, b: 0.3, a: 0.4 };
    const expected = [26, 51, 77, 0.4];
    const result = figmaColorToRgbaArray(color);
    expect(result).toEqual(expected);
  });

  test('numberToHex converts a number to a hexadecimal string', () => {
    const num = 255;
    const expected = 'FF';
    const result = numberToHex(num);
    expect(result).toEqual(expected);
  });

  test('figmaColorToHex converts a Figma color to a hexadecimal string', () => {
    const color = { r: 0.1, g: 0.2, b: 0.3, a: 1 };
    const expected = '#1A334D';
    const result = figmaColorToHex(color);
    expect(result).toEqual(expected);
  });

  test('getFillFromNode returns the hexadecimal string representation of the first fill of a node, if it exists', () => {
    const node = {
      fills: [{ type: 'SOLID', color: { r: 0.1, g: 0.2, b: 0.3, a: 1 } }],
    };
    const expected = '#1A334D';
    const result = getFillFromNode(node as unknown as Node);
    expect(result).toEqual(expected);
  });

  test('getFillFromNode returns undefined if the node does not have any fills', () => {
    const node = {} as Node;
    const result = getFillFromNode(node);
    expect(result).toBeUndefined();
  });
});
