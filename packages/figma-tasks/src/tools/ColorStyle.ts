import { mapValues } from 'lodash';
import { NodeResponse } from '@cbhq/figma-api';
import { Task } from '@cbhq/mono-tasks';

import { ColorMode, getColorModeAndName } from '../helpers/getColorModeAndName';
import { getFillFromNode } from '../helpers/getFillFromNode';
import { outputPathNormalizer } from '../helpers/outputPathNormalizer';

import { Manifest, ManifestShape } from './Manifest';

export type ColorStyleManifestType = ManifestShape<ColorStyle>;

type ColorStyleTaskOptions = {
  generatedCssVariablesPrefix?: string;
};

export type ColorStyleParams = {
  node: NodeResponse;
  task: Task;
  taskOptions: ColorStyleTaskOptions;
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

  public outputs: Record<string, string> = {};

  public version: number | undefined;

  private task: Task;

  constructor({ node, taskOptions, task }: ColorStyleParams) {
    const { generatedCssVariablesPrefix } = taskOptions;
    const { key, description } = node.styles[node.document.id];
    const { name, colorMode } = getColorModeAndName(node.document.name);
    this.description = description;
    this.id = node.document.id;
    this.key = key;
    this.name = name;
    this.node = node;
    this.type = colorMode;
    this.task = task;
    const fill = getFillFromNode(node.document);
    if (!fill) {
      throw new Error(`Unable to extract hex color from ${node.document.name}`);
    }
    this.fill = fill;
    this.cssVarSetter = generatedCssVariablesPrefix
      ? `--${generatedCssVariablesPrefix}-${this.name}`
      : `--${this.name}`;
    this.cssVarGetter = `var(${this.cssVarSetter})`;
  }

  public addToOutputs(newOutputs: Record<string, string>) {
    this.outputs = { ...this.outputs, ...newOutputs };
  }

  public toJSON() {
    const normalizeOutputPath = outputPathNormalizer(this.task);
    return {
      key: this.key,
      name: this.name,
      type: this.type,
      fill: this.fill,
      cssVarSetter: this.cssVarSetter,
      cssVarGetter: this.cssVarGetter,
      ...(Object.values(this.outputs).length
        ? { outputs: mapValues(this.outputs, normalizeOutputPath) }
        : {}),
    };
  }

  public static create(
    manifest: Manifest<ColorStyleManifestType>,
    taskOptions: ColorStyleTaskOptions,
  ) {
    Object.values(manifest.syncedLibrary.nodes).forEach((node) => {
      if (node) {
        const colorStyleParams = {
          node,
          taskOptions,
          task: manifest.task,
        };
        const newStyle = new ColorStyle(colorStyleParams);
        manifest.addNewItem(newStyle);
      }
    });
  }
}
