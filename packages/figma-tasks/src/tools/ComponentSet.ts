/* eslint-disable no-underscore-dangle */
import { mapValues } from 'lodash';
import { NodeResponseWithMetadata } from '@cbhq/figma-api';
import { Task } from '@cbhq/mono-tasks';

import { outputPathNormalizer } from '../helpers/outputPathNormalizer';
import { parseName } from '../helpers/parseName';

// import { validators } from '../validators';
import { ComponentSetChild, ComponentSetChildShape } from './ComponentSetChild';
import { Manifest, ManifestShape } from './Manifest';

export type ComponentSetManifestShape = ManifestShape<ComponentSet>;
export type ComponentSetManifest = Manifest<ComponentSetManifestShape>;

type MetadataShape = Record<string, string | number>;

export type ComponentSetParams<Metadata extends MetadataShape = MetadataShape> = {
  id: string;
  description: string;
  name: string;
  type: string;
  node?: NodeResponseWithMetadata;
  createdAt: string;
  lastUpdated: string;
  metadata?: Metadata;
  outputs?: Record<string, string>;
  version?: number;
  task: Task;
};

export class ComponentSet<
  ChildShape extends ComponentSetChildShape = ComponentSetChildShape,
  Metadata extends MetadataShape = MetadataShape,
> {
  public readonly nodeType = 'componentSet';

  public readonly components: ComponentSetChild<ChildShape>[] = [];

  public readonly description: string;

  public readonly id: string;

  public readonly name: string;

  public readonly node: NodeResponseWithMetadata | undefined;

  public readonly type: string;

  public readonly createdAt: string;

  public readonly lastUpdated: string;

  private _metadata: Metadata | undefined = undefined;

  public outputs: Record<string, string> = {};

  public version = 0;

  private task: Task;

  constructor({
    description,
    id,
    name,
    node,
    type,
    version,
    outputs,
    createdAt,
    lastUpdated,
    metadata,
    task,
  }: ComponentSetParams<Metadata>) {
    this.id = id;
    this.description = description;
    this.name = name;
    this.type = type;
    this.createdAt = createdAt;
    this.lastUpdated = lastUpdated;
    this.task = task;

    if (node) {
      this.node = node;

      if (node.document.type === 'COMPONENT_SET') {
        node.document.children.forEach((child) => {
          if (child.type === 'COMPONENT') {
            this.components.push(
              new ComponentSetChild<ChildShape>({
                componentSet: this,
                node: { ...node, document: child },
              }),
            );
          }
        });
      }
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

  public setVersion(version: number) {
    this.version = version;
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

  // public getWarnings(): { invalidFillRules: string[]; invalidChildren: string[] } {
  //   return {
  //     invalidFillRules: this.components
  //       .filter(validators.hasInvalidFillRule)
  //       // Display name in same format as Figma so it's easier for Design to lookup
  //       .map((item) => item.node.name),
  //     invalidChildren: this.components
  //       .filter(validators.hasEmptyPaths)
  //       // Display name in same format as Figma so it's easier for Design to lookup
  //       .map((item) => item.node.name),
  //   };
  // }

  public toJSON() {
    const normalizeOutputPath = outputPathNormalizer(this.task);

    return {
      type: this.type,
      name: this.name,
      description: this.description,
      components: this.components,
      createdAt: this.createdAt,
      lastUpdated: this.lastUpdated,
      ...(Object.values(this.outputs).length
        ? { outputs: mapValues(this.outputs, normalizeOutputPath) }
        : {}),
      ...(this.version !== undefined ? { version: this.version } : {}),
      ...(this.metadata ? { metadata: this.metadata } : {}),
    };
  }

  static async create<ChildShape extends ComponentSetChildShape = ComponentSetChildShape>(
    manifest: ComponentSetManifest,
  ) {
    await Promise.all(
      Object.values(manifest.syncedLibrary.nodes).map(async (node) => {
        if (node) {
          const { id } = node.document;
          const { type, name } = parseName(node);
          const { description, updated_at: lastUpdated, created_at: createdAt } = node.metadata;
          const oldVersion =
            manifest.previousItems.get(id) ??
            // The ids might be different, but the intent is that they are treated as the same asset.
            manifest.previousItemsArray.find(
              (prev) => `${prev.type}-${prev.name}` === `${type}-${name}`,
            );

          const params = {
            ...oldVersion,
            node,
            id,
            type,
            name,
            description,
            /**
             * If design re-creates the node in Figma, but the intent is that the asset is the same as before,
             * then we should keep the old createdAt value so that we maintain sorting in Percy.
             */
            createdAt: oldVersion?.createdAt ?? createdAt,
            lastUpdated,
            task: manifest.task,
            recentlyUpdated: manifest.syncedLibrary.recentlyUpdatedIds.includes(id),
          };
          const newComponentSet = new ComponentSet<ChildShape>(params);
          await manifest.syncItem(newComponentSet);
        }
      }),
    );
  }
}
