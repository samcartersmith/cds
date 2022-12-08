import { NodeResponse } from '@cbhq/figma-api';

import { ColorMode, getColorModeAndName } from '../helpers/getColorModeAndName';
import { getFillFromNode } from '../helpers/getFillFromNode';

type ColorStyleParams = {
  cssVariablesPrefix?: string;
};

export class ColorStyle {
  public readonly cssVarSetter: `--${string}`;

  public readonly cssVarGetter: `var(--${string})`;

  public readonly id: string;

  public readonly type: ColorMode;

  public readonly description: string;

  public readonly key: string;

  public readonly name: string;

  public readonly node: NodeResponse;

  public readonly fill: string;

  public outputs: string[] = [];

  constructor(node: NodeResponse, { cssVariablesPrefix }: ColorStyleParams) {
    const { key, description } = node.styles[node.document.id];
    const { name, colorMode } = getColorModeAndName(node.document.name);
    this.description = description;
    this.id = node.document.id;
    this.key = key;
    this.name = name;
    this.node = node;
    this.type = colorMode;
    const fill = getFillFromNode(node.document);
    if (!fill) {
      throw new Error(`Unable to extract hex color from ${node.document.name}`);
    }
    this.fill = fill;
    this.cssVarSetter = cssVariablesPrefix
      ? `--${cssVariablesPrefix}-${this.name}`
      : `--${this.name}`;
    this.cssVarGetter = `var(${this.cssVarSetter})`;
  }

  public addToOutputs(filePath: string) {
    this.outputs.push(filePath);
  }

  public toJSON() {
    return {
      key: this.key,
      name: this.name,
      type: this.type,
      fill: this.fill,
      cssVarSetter: this.cssVarSetter,
      cssVarGetter: this.cssVarGetter,
      ...(this.outputs.length ? { outputs: [...new Set(this.outputs).values()] } : {}),
    };
  }
}
