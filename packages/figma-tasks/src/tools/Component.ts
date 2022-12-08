/* eslint-disable no-underscore-dangle */
import type { NodeResponse } from '@cbhq/figma-api';

import { getSize } from '../helpers/getSize';
import { parseName } from '../helpers/parseName';
import { NodeShape } from '../types';

import { Manifest, ManifestShape } from './Manifest';

type MetadataShape = Record<string, string | number>;

export type ComponentParams<Metadata extends MetadataShape = MetadataShape> = {
  id: string;
  description: string;
  height: number;
  name: string;
  type: string;
  width: number;
  node?: NodeResponse;
  metadata?: Metadata;
  version?: number;
  outputs?: string[];
};

export class Component<Metadata extends MetadataShape = MetadataShape> {
  public readonly nodeType = 'componentSet';

  public readonly description: string;

  public readonly id: string;

  public readonly height: number;

  public readonly name: string;

  public readonly node: NodeShape | undefined;

  public readonly type: string;

  public readonly width: number;

  public outputs: string[] = [];

  public version = 0;

  private _metadata: Metadata | undefined = undefined;

  constructor({
    description,
    id,
    height,
    width,
    name,
    node,
    type,
    version,
    outputs,
    metadata,
  }: ComponentParams<Metadata>) {
    this.id = id;
    this.description = description;
    this.name = name;
    this.type = type;
    this.height = height;
    this.width = width;

    if (node) {
      this.node = node;
    }

    if (metadata) {
      this._metadata = metadata;
    }
    if (version) {
      this.version = version;
    }
    if (outputs) {
      this.outputs = outputs;
    }
  }

  public incrementVersion() {
    this.version += 1;
  }

  public addToOutputs(filePath: string) {
    // console.log(`Add ${filePath} to outputs`);
    this.outputs.push(filePath);
  }

  public get metadata() {
    return this._metadata;
  }

  public setMetadata(metadata: Metadata) {
    this._metadata = { ...this._metadata, ...metadata };
  }

  public toJSON() {
    return {
      type: this.type,
      name: this.name,
      width: this.width,
      height: this.height,
      description: this.description,
      ...(this.outputs.length ? { outputs: [...new Set(this.outputs).values()] } : {}),
      ...(this.version ? { version: this.version } : {}),
      ...(this.metadata ? { metadata: this.metadata } : {}),
    };
  }

  static init({
    manifest,
    remoteNodes,
  }: {
    manifest: Manifest<ManifestShape<Component>>;
    remoteNodes: Record<string, NodeResponse>;
  }) {
    const components: Component[] = [];
    Object.values(remoteNodes).forEach((node) => {
      if (node?.document?.type === 'COMPONENT') {
        const { id } = node.document;
        const oldVersion = manifest.previousItems.get(id);
        const { type, name } = parseName(node);
        const { width, height } = getSize(node.document);
        const { description } = node.components[id];

        const params = {
          ...oldVersion,
          node,
          id,
          type,
          name,
          width,
          height,
          description,
        };
        const newComponent = new Component(params);
        manifest.addNewItem(newComponent);
        components.push(newComponent);
      }
    });
    return components;
  }
}
