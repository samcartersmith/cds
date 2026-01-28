import mapValues from 'lodash/mapValues';
import { Task } from '@cbhq/mono-tasks';
import { sortByAlphabet } from '@cbhq/script-utils';

import { createHashFromObject } from '../helpers/createHashFromObject';
import type {
  ChildNode,
  NodeWithMetadata,
  SyncedIllustrationLibrary as SyncedLibrary,
} from '../helpers/fetchIllustrationLibrary';
import { outputPathNormalizer } from '../helpers/outputPathNormalizer';
import { parseName } from '../helpers/parseName';

// import { validators } from '../validators';
import {
  ComponentSetChild,
  ComponentSetChildMetadata,
  ComponentSetChildShape,
} from './ComponentSetChild';
import { Manifest, ManifestShape } from './Manifest';

export type ComponentSetManifestShape = ManifestShape<ComponentSet>;
export type ComponentSetManifest = Manifest<ComponentSetManifestShape>;

type MetadataShape = Record<string, string | number>;

export type ComponentSetParams<Metadata extends MetadataShape = MetadataShape> = {
  id: string;
  hashSourceMap: Record<string, string>;
  /** Base64 representation of provided hash source */
  hash: string;
  hasVisualChange: boolean;
  description: string;
  name: string;
  type: string;
  node: NodeWithMetadata;
  createdAt: string;
  lastUpdated: string;
  metadata?: Metadata;
  outputs?: Record<string, string>;
  version?: number;
  manifest: ComponentSetManifest;
};

export class ComponentSet<
  ChildShape extends ComponentSetChildShape = ComponentSetChildShape,
  Metadata extends MetadataShape = MetadataShape,
> {
  public readonly nodeType = 'componentSet';

  public readonly components: ComponentSetChild<ChildShape>[] = [];

  public readonly description: string;

  public readonly id: string;

  public readonly hash: string;

  public readonly hasVisualChange: boolean;

  public readonly name: string;

  public readonly node: NodeWithMetadata | undefined;

  public readonly type: string;

  public readonly createdAt: string;

  public readonly lastUpdated: string;

  private _metadata: Metadata | undefined = undefined;

  public outputs: Record<string, string> = {};

  public version = 0;

  private versioned: boolean;

  private task: Task;

  constructor({
    description,
    id,
    hashSourceMap,
    hash,
    hasVisualChange,
    name,
    node,
    type,
    version,
    outputs,
    createdAt,
    lastUpdated,
    metadata,
    manifest,
  }: ComponentSetParams<Metadata>) {
    this.id = id;
    this.hash = hash;
    this.hasVisualChange = hasVisualChange;
    this.description = description;
    this.name = name;
    this.type = type;
    this.createdAt = createdAt;
    this.lastUpdated = lastUpdated;
    this.task = manifest.task;
    this.versioned = manifest.versioned;

    this.node = node;

    if (node.document.type === 'COMPONENT_SET') {
      const prevNode = manifest.getPreviousItem({ id, type, name });

      node.document.children.forEach((child) => {
        if (child.type === 'COMPONENT') {
          const props = ComponentSetChild.stringToPropsObject(child.name);
          let childMetadata: ComponentSetChildMetadata | undefined;

          /**
           * We don't include detailed information about component_set *components* in our manifest.json.
           * However, there is component metadata we want to persist across syncs, for example
           * a unicode value for an icon font which is unique per component not component_set.
           *
           * In our manifest.json, we save component props and custom metadata in object format.
           * In Figma, the props are stringified within the component name.
           * We can convert our object format to string format to find a match to the original name.
           */
          if (prevNode) {
            childMetadata = prevNode.components.find((item) => {
              if (item.props) {
                return child.name === ComponentSetChild.propsObjectToString(item.props ?? {});
              }
              return undefined;
            })?.metadata;
          }

          this.components.push(
            new ComponentSetChild<ChildShape>({
              componentSet: this,
              node: { ...node, document: child },
              props,
              metadata: childMetadata,
              hashSource: hashSourceMap[child.id],
            }),
          );
        }
      });
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
    const mergedOutputs = { ...this.outputs, ...newOutputs };
    const sortedOuputEntries = Object.entries(mergedOutputs).sort(sortByAlphabet);
    this.outputs = Object.fromEntries(sortedOuputEntries);
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
      hash: this.hash,
      description: this.description,
      components: this.components,
      createdAt: this.createdAt,
      lastUpdated: this.lastUpdated,
      ...(Object.values(this.outputs).length
        ? { outputs: mapValues(this.outputs, normalizeOutputPath) }
        : {}),
      ...(this.versioned ? { version: this.version } : {}),
      ...(this.metadata ? { metadata: this.metadata } : {}),
    };
  }

  static async create<ChildShape extends ComponentSetChildShape = ComponentSetChildShape>(
    manifest: ComponentSetManifest,
    getHashSourceMapItem: (
      id: string,
      syncedLibrary: SyncedLibrary,
    ) => Promise<Record<string, string>>,
  ) {
    await Promise.all(
      Object.values(manifest.syncedLibrary.nodes).map(async (node) => {
        if (node?.document?.type === 'COMPONENT_SET') {
          const { id } = node.document;
          const { type, name } = parseName(node);
          const { description, updated_at: lastUpdated, created_at: createdAt } = node.metadata;
          const oldVersion = manifest.getPreviousItem({ id, type, name });

          const hashSourceMap = await Promise.all(
            node.document.children.map(async (child: ChildNode) => {
              return getHashSourceMapItem(child.id, manifest.syncedLibrary);
            }),
          ).then((results) =>
            results.reduce<Record<string, string>>((acc, result) => ({ ...acc, ...result }), {}),
          );

          // generate a single hash for the entire set of components
          const hash = createHashFromObject(hashSourceMap);

          const params = {
            ...oldVersion,
            node,
            id,
            hashSourceMap,
            hash,
            hasVisualChange: oldVersion?.hash !== hash,
            type,
            name,
            description,
            /**
             * If design re-creates the node in Figma, but the intent is that the asset is the same as before,
             * then we should keep the old createdAt value so that we maintain sorting in Percy.
             */
            createdAt: oldVersion?.createdAt ?? createdAt,
            lastUpdated,
            manifest,
          };

          const newComponentSet = new ComponentSet<ChildShape>(params);
          await manifest.syncItem(newComponentSet);
        }
      }),
    );
  }
}
