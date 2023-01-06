/* eslint-disable no-underscore-dangle */
import { writeJsonFile } from '@nrwl/devkit';
import groupBy from 'lodash/groupBy';
import mapValues from 'lodash/mapValues';
import { ImageFormats, RequestType, SyncedLibrary, syncLibrary } from '@cbhq/figma-api';
import { Task } from '@cbhq/mono-tasks';
import { getAbsolutePath } from '@cbhq/script-utils';

import { getManifestFromDisk } from '../helpers/getManifestFromDisk';
import { outputPathNormalizer } from '../helpers/outputPathNormalizer';

import { Changelog } from './Changelog';
import { ColorStyles } from './ColorStyles';

export type ItemShape = {
  id: string;
  name: string;
  type: string;
  version?: number;
  outputs?: Record<string, string>;
  setVersion?: (num: number) => void;
};

export type ManifestShape<
  Item extends ItemShape = ItemShape,
  Metadata = Record<string, unknown>,
> = {
  executor?: string;
  imageFormats?: ImageFormats;
  lastUpdated: string;
  metadata: Metadata;
  items: [string, Item][];
};

export type ManifestTaskOptions = {
  /** The file ID to use when making requests to Figma API  */
  figmaApiFileId: string;
  /** The manifest.json file to get information about previous syncs and to update after new syncs. */
  manifestFile: string;
  /** The CHANGELOG.md file to document changes to. */
  changelogFile?: string;
  /** The manifest.json file which contains light color styles */
  lightModeManifestFile?: string;
  /** The manifest.json file which contains dark color styles */
  darkModeManifestFile?: string;
};

export type GetManifestItem<T extends ManifestShape> = T['items'][number][1];

type InitManifestParams<
  T extends ManifestShape,
  TaskOptions extends ManifestTaskOptions = ManifestTaskOptions,
> = {
  /** The image formats to get image urls for when syncing Figma libraries */
  imageFormats?: ImageFormats;
  /** The request type to use when syncing a figma library */
  requestType: RequestType;
  createItem: (manifest: Manifest<T>, taskOptions: TaskOptions) => void;
};

type ManifestOptions<PreviousManifest extends ManifestShape, TaskOptions = unknown> = {
  previousManifest: PreviousManifest;
  syncedLibrary: SyncedLibrary;
  filePath: string;
  versioned?: boolean;
  task: Task<TaskOptions>;
};

export class Manifest<
  T extends ManifestShape = ManifestShape,
  TaskOptions extends ManifestTaskOptions = ManifestTaskOptions,
> {
  private readonly filePath: string;

  private _metadata: T['metadata'];

  public readonly task: Task<TaskOptions>;

  public readonly lastUpdated: string;

  public readonly previousItems: Map<string, ItemShape>;

  public readonly items = new Map<string, GetManifestItem<T>>();

  public additions = new Set<ItemShape>();

  public deletions = new Set<ItemShape>();

  public renames = new Map<string, string>();

  public updates = new Set<ItemShape>();

  public readonly syncedLibrary: SyncedLibrary;

  private readonly versioned: boolean;

  private outputs: Record<string, string> = {};

  constructor({
    previousManifest,
    filePath,
    task,
    versioned,
    syncedLibrary,
  }: ManifestOptions<T, TaskOptions>) {
    this.filePath = filePath;
    this.lastUpdated = previousManifest.lastUpdated;
    this._metadata = previousManifest.metadata;
    this.previousItems = new Map(previousManifest.items);
    this.task = task;
    this.versioned = Boolean(versioned);
    this.syncedLibrary = syncedLibrary;
  }

  public checkIfRenamed(newItem: GetManifestItem<T>) {
    const prevNode = this.previousItems.get(newItem.id);
    if (prevNode) {
      const prevName = prevNode.name;
      const newName = newItem.name;
      if (prevName !== newName) {
        this.renames.set(prevName, newName);
      }
    }
  }

  public checkIfAdded(item: GetManifestItem<T>) {
    if (!this.previousItems.has(item.id) && this.syncedLibrary.remoteIds.includes(item.id)) {
      this.additions.add(item);
    }
  }

  public checkIfUpdated(item: GetManifestItem<T>) {
    if (
      this.previousItems.has(item.id) &&
      this.syncedLibrary.recentlyUpdatedIds.includes(item.id)
    ) {
      this.updates.add(item);
    }
  }

  private checkIfDeleted(item: GetManifestItem<T>) {
    if (this.previousItems.has(item.id) && !this.syncedLibrary.remoteIds.includes(item.id)) {
      this.previousItems.delete(item.id);
      this.deletions.add(item);
    }
  }

  public get nameMap() {
    return new Map(
      [...this.previousItems.values(), ...this.items.values()].map((item) => [item.name, item]),
    );
  }

  public get itemEntries() {
    const itemsAsArray = [...this.items.values()];
    const groupedByType = groupBy(itemsAsArray, 'type');
    return Object.entries(groupedByType);
  }

  public addNewItem(item: GetManifestItem<T>) {
    this.checkIfUpdated(item);
    this.checkIfAdded(item);
    this.checkIfDeleted(item);
    this.checkIfRenamed(item);
    this.items.set(item.id, item);
  }

  public get metadata() {
    return this._metadata;
  }

  public setMetadata(metadata: Partial<T['metadata']>) {
    this._metadata = { ...this._metadata, ...metadata };
  }

  public addToOutputs(newOutputs: Record<string, string>) {
    this.outputs = { ...this.outputs, ...newOutputs };
  }

  public toJSON() {
    const normalizeOutputPath = outputPathNormalizer(this.task);

    return {
      executor: this.task.context.targetName,
      lastUpdated: new Date().toISOString(),
      ...(this.metadata ? { metadata: this.metadata } : {}),
      ...(Object.values(this.outputs).length
        ? { outputs: mapValues(this.outputs, normalizeOutputPath) }
        : {}),
      items: Object.fromEntries([...this.previousItems.entries(), ...this.items.entries()]),
    };
  }

  public async generateFile() {
    writeJsonFile(this.filePath, this.toJSON());
  }

  static async init<
    T extends ManifestShape,
    TaskOptions extends ManifestTaskOptions = ManifestTaskOptions,
  >(task: Task<TaskOptions>, params: InitManifestParams<T, TaskOptions>) {
    const { imageFormats, requestType, createItem } = params;

    const manifestPath = getAbsolutePath(task, task.options.manifestFile);
    const previousManifest = await getManifestFromDisk<T>(manifestPath);
    const syncedLibrary = await syncLibrary({
      fileId: task.options.figmaApiFileId,
      requestType,
      /** TODO: uncomment once migration from old library is complete */
      // lastUpdated: previousManifest.lastUpdated,
      imageFormats,
      batchSize: 500,
    });

    if (syncedLibrary.recentlyUpdatedIds.length === 0) {
      throw new Error(
        `There are no new updates since last update on ${previousManifest.lastUpdated}`,
      );
    }

    const manifest = new Manifest<T, TaskOptions>({
      task,
      filePath: manifestPath,
      previousManifest,
      syncedLibrary,
    });

    createItem(manifest, task.options);

    const [changelog, colorStyles] = await Promise.all([
      Changelog.loadFromDisk(task),
      ColorStyles.loadFromDisk(task),
    ]);

    return { changelog, colorStyles, manifest };
  }
}
