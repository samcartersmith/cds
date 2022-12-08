/* eslint-disable no-underscore-dangle */
import { NodeResponse } from '@cbhq/figma-api';

import { parseName } from '../helpers/parseName';
import { NodeShape } from '../types';

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
  node?: NodeResponse;
  metadata?: Metadata;
  outputs?: string[];
  version?: number;
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

  public readonly node: NodeShape | undefined;

  public readonly type: string;

  private _metadata: Metadata | undefined = undefined;

  public outputs: string[] = [];

  public version = 0;

  constructor({
    description,
    id,
    name,
    node,
    type,
    version,
    outputs,
    metadata,
  }: ComponentSetParams<Metadata>) {
    this.id = id;
    this.description = description;
    this.name = name;
    this.type = type;

    if (node) {
      this.node = node;

      if (node.document.type === 'COMPONENT_SET') {
        node.document.children.forEach((child) => {
          if (child.type === 'COMPONENT') {
            this.components.push(
              new ComponentSetChild<ChildShape>({
                componentSet: this,
                node: { document: child },
              }),
            );
          }
        });
      }
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
    this.outputs.push(filePath);
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
    return {
      type: this.type,
      name: this.name,
      description: this.description,
      components: this.components,
      outputs: [...new Set(this.outputs).values()],
      ...(this.version ? { version: this.version } : {}),
      ...(this.metadata ? { metadata: this.metadata } : {}),
    };
  }

  static init<ChildShape extends ComponentSetChildShape = ComponentSetChildShape>({
    manifest,
    remoteNodes,
  }: {
    manifest: ComponentSetManifest;
    remoteNodes: Record<string, NodeResponse>;
  }) {
    const componentSets: ComponentSet[] = [];
    Object.values(remoteNodes).forEach((node) => {
      if (node) {
        const { id } = node.document;
        const { type, name } = parseName(node);
        const { description } = node.componentSets[id];
        const oldVersion = manifest.previousItems.get(node.document.id);

        const params = {
          ...oldVersion,
          node,
          id,
          type,
          name,
          description,
        };
        const newComponentSet = new ComponentSet<ChildShape>(params);
        manifest.addNewItem(newComponentSet);
        componentSets.push(newComponentSet);
      }
    });
    return componentSets;
  }
}
