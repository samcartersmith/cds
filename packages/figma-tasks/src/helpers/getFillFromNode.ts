import type { Node } from '@cbhq/figma-api';
import { Color } from '@cbhq/figma-api';

export function figmaColorToRgbaArray(color: Color) {
  const { r, g, b, a } = color;
  const [red, green, blue] = [r, g, b].map((item) => Math.round(item * 255));
  return [red, green, blue, a] as const;
}

export function numberToHex(val: number) {
  return val.toString(16).toUpperCase();
}

export function figmaColorToHex(color: Color): string {
  const [red, green, blue, alpha] = figmaColorToRgbaArray(color);
  const outParts = [numberToHex(red), numberToHex(green), numberToHex(blue)];

  if (alpha !== 1) {
    outParts.push(numberToHex(Math.round(alpha * 255)).substring(0, 2));
  }

  // Pad single-digit output values
  outParts.forEach((part, i) => {
    if (part.length === 1) {
      outParts[i] = `0${part}`;
    }
  });

  return `#${outParts.join('')}`;
}

export function getFillFromNode(node: Node) {
  if ('fills' in node) {
    const firstFill = node.fills[0];
    if (firstFill.type === 'SOLID') {
      return figmaColorToHex(firstFill.color);
    }
  }
  return undefined;
}
