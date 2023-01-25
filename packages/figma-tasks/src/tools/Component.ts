/* eslint-disable no-underscore-dangle */
import { mapValues } from 'lodash';
import type { NodeResponseWithMetadata } from '@cbhq/figma-api';
import { Task } from '@cbhq/mono-tasks';

import { getSize } from '../helpers/getSize';
import { outputPathNormalizer } from '../helpers/outputPathNormalizer';
import { parseName } from '../helpers/parseName';

import { Manifest, ManifestShape } from './Manifest';

type MetadataShape = Record<string, string | number>;

export type ComponentParams<Metadata extends MetadataShape = MetadataShape> = {
  id: string;
  description: string;
  height: number;
  name: string;
  type: string;
  width: number;
  lastUpdated: string;
  node?: NodeResponseWithMetadata;
  metadata?: Metadata;
  version?: number;
  outputs?: Record<string, string>;
  task: Task;
};

export class Component<Metadata extends MetadataShape = MetadataShape> {
  public readonly nodeType = 'componentSet';

  public readonly description: string;

  public readonly id: string;

  public readonly height: number;

  public readonly name: string;

  public readonly node: NodeResponseWithMetadata | undefined;

  public readonly type: string;

  public readonly width: number;

  public readonly lastUpdated: string;

  public outputs: Record<string, string> = {};

  public version = 0;

  private _metadata: Metadata | undefined = undefined;

  private task: Task;

  constructor({
    description,
    id,
    height,
    width,
    name,
    node,
    type,
    lastUpdated,
    version,
    outputs,
    metadata,
    task,
  }: ComponentParams<Metadata>) {
    this.id = id;
    this.description = description;
    this.name = name;
    this.type = type;
    this.height = height;
    this.width = width;
    this.lastUpdated = lastUpdated;
    this.task = task;

    if (node) {
      this.node = node;
    }

    if (metadata) {
      this._metadata = metadata;
    }
    if (version !== undefined) {
      this.version = version;
    }
    if (outputs) {
      this.outputs = outputs;
    }
  }

  public setVersion(num: number) {
    this.version = num;
  }

  public addToOutputs(newOutputs: Record<string, string>) {
    this.outputs = { ...this.outputs, ...newOutputs };
  }

  public get metadata() {
    return this._metadata;
  }

  public setMetadata(metadata: Metadata) {
    this._metadata = { ...this._metadata, ...metadata };
  }

  public toJSON() {
    const normalizeOutputPath = outputPathNormalizer(this.task);
    return {
      type: this.type,
      name: this.name,
      width: this.width,
      height: this.height,
      description: this.description,
      lastUpdated: this.lastUpdated,
      ...(Object.values(this.outputs).length
        ? { outputs: mapValues(this.outputs, normalizeOutputPath) }
        : {}),
      ...(this.version !== undefined ? { version: this.version } : {}),
      ...(this.metadata ? { metadata: this.metadata } : {}),
    };
  }

  static async create(manifest: Manifest<ManifestShape<Component>>) {
    await Promise.all(
      Object.values(manifest.syncedLibrary.nodes).map(async (node) => {
        if (node?.document?.type === 'COMPONENT') {
          const { id } = node.document;
          const { type, name } = parseName(node);
          const oldVersion =
            manifest.previousItems.get(id) ??
            manifest.previousItemsArray.find(
              (prev) => `${prev.type}-${prev.name}` === `${type}-${name}`,
            );
          const { width, height } = getSize(node.document);
          const { description, updated_at: lastUpdated } = node.metadata;

          const params = {
            ...oldVersion,
            node,
            id,
            type,
            name,
            width,
            height,
            description,
            lastUpdated,
            recentlyUpdated: manifest.syncedLibrary.recentlyUpdatedIds.includes(id),
            task: manifest.task,
          };
          const newComponent = new Component(params);
          await manifest.syncItem(newComponent);
        }
      }),
    );
  }
}
