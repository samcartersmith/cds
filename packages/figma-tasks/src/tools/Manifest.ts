/* eslint-disable no-underscore-dangle */
import { output as devkitOutput } from '@nrwl/devkit';
import { uniqBy } from 'lodash';
import groupBy from 'lodash/groupBy';
import mapValues from 'lodash/mapValues';
import fs from 'node:fs';
import path from 'node:path';
import { ImageFormats, RequestType, SyncedLibrary, syncLibrary } from '@cbhq/figma-api';
import { Task } from '@cbhq/mono-tasks';
import { getAbsolutePath, sortByAlphabet, writePrettyFile } from '@cbhq/script-utils';

import { getManifestFromDisk } from '../helpers/getManifestFromDisk';
import { logSummary } from '../helpers/logSummary';
import { outputPathNormalizer } from '../helpers/outputPathNormalizer';

import { Changelog } from './Changelog';
import { ColorStyles } from './ColorStyles';

export type ItemShape = {
  id: string;
  /** Base64 representation of vector data from Figma node response */
  hash?: string;
  name: string;
  type: string;
  version: number;
  outputs?: Record<string, string>;
  setVersion: (num: number) => void;
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
  /** The directory to output generated content */
  generatedDirectory: string;
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
  createItem: (manifest: Manifest<T>, taskOptions: TaskOptions) => Promise<void>;
  versioned?: boolean;
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

  public readonly previousItems: Map<string, GetManifestItem<T>>;

  public readonly items = new Map<string, GetManifestItem<T>>();

  public additions = new Set<ItemShape>();

  public deletions = new Set<ItemShape>();

  public renames = new Map<ItemShape, ItemShape>();

  public updates = new Set<ItemShape>();

  public readonly syncedLibrary: SyncedLibrary;

  public readonly versioned: boolean;

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

  get generatedDirectory() {
    return getAbsolutePath(this.task, this.task.options.generatedDirectory);
  }

  public get previousItemsArray() {
    return [...this.previousItems.values()];
  }

  private renameOutput(renameFn: (output: string) => string) {
    return async (output: string) => {
      const oldPath = path.normalize(`${this.generatedDirectory}/${output}`);
      const newPath = renameFn(oldPath);
      if (fs.existsSync(oldPath)) {
        return fs.promises.rename(oldPath, newPath);
      }
      return undefined;
    };
  }

  private async renameOutputs(item: GetManifestItem<T>, renameFn: (output: string) => string) {
    if (item.outputs) {
      await Promise.all(Object.values(item.outputs).map(this.renameOutput(renameFn)));
    }
  }

  public getPreviousItem(item: Pick<ItemShape, 'id' | 'type' | 'name'>) {
    return (
      this.previousItems.get(item.id) ??
      this.previousItemsArray.find(
        (prev) => `${prev.type}-${prev.name}` === `${item.type}-${item.name}`,
      )
    );
  }

  public async checkIfUpdated(item: GetManifestItem<T>) {
    const prevNode = this.getPreviousItem(item);
    const updatedRemotely = this.syncedLibrary.recentlyUpdatedIds.includes(item.id);

    if (updatedRemotely) {
      // Changed items
      if (prevNode) {
        // Handle renames
        const prevName = prevNode.name;
        const newName = item.name;
        const wasRenamed = prevName !== newName;

        if (wasRenamed) {
          this.renames.set(prevNode, item);
          const renameFn = (output: string) => output.replace(prevName, newName);
          await this.renameOutputs(prevNode, renameFn);

          // Reset versioning
          if (this.versioned) {
            item.setVersion(0);
          }
        } else {
          const hashingEnabled = Boolean(item.hash && prevNode?.hash);
          const hasVisualChange = hashingEnabled ? item.hash !== prevNode.hash : true;
          if (hasVisualChange) {
            this.updates.add(item);
            if (this.versioned) {
              const oldVersion = item.version;
              const newVersion = oldVersion + 1;
              item.setVersion(newVersion);

              const renameFn = (output: string) =>
                output.replace(`-${oldVersion}`, `-${newVersion}`);
              // If it already existed we need to rename outputs before writting new content
              await this.renameOutputs(item, renameFn);
            }
          } else {
            devkitOutput.warn({
              title: `Skipping SVG updates for ${item.type}/${item.name}`,
              bodyLines: [
                `Figma indicates that ${item.type}/${item.name} was recently updated, but the vector data has not changed.`,
                `Verify with design that this item has not had any visual changes`,
              ],
            });
          }
        }

        this.previousItems.delete(prevNode.id); // remove old from manifest so we don't have duplicates
      } else {
        this.additions.add(item);
      }
    }
  }

  private async handleDeletions(remoteIds: string[]) {
    const promises: Promise<void>[] = [];
    this.previousItems.forEach((item) => {
      if (!remoteIds.includes(item.id)) {
        // Delete outputs
        if (item.outputs) {
          Object.values(item.outputs).map(async (output) => {
            const absoluteOutputPath = path.normalize(`${this.generatedDirectory}/${output}`);
            if (fs.existsSync(absoluteOutputPath)) {
              promises.push(fs.promises.rm(absoluteOutputPath));
            }
          });
        }
        this.previousItems.delete(item.id);
        this.deletions.add(item);
      }
    });
    await Promise.all(promises);
  }

  public async syncItem(item: GetManifestItem<T>) {
    await this.checkIfUpdated(item);
    this.items.set(item.id, item);
  }

  private get itemEntries() {
    return uniqBy(
      // if duplicate object is found in array, the first object match will resolve
      [...this.items.entries(), ...this.previousItems.entries()],
      ([, item]) => `${item.type}-${item.name}`,
    );
  }

  public get groupedItems() {
    const itemsAsArray = this.itemEntries.map(([, item]) => item);
    const groupedByType = groupBy(itemsAsArray, 'type');
    return Object.entries(groupedByType);
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
      items: Object.fromEntries(this.itemEntries.sort(sortByAlphabet)),
    };
  }

  public async generateFile() {
    await writePrettyFile(this.filePath, JSON.stringify(this.toJSON()));
    logSummary(this);
  }

  static async init<
    T extends ManifestShape,
    TaskOptions extends ManifestTaskOptions = ManifestTaskOptions,
  >(task: Task<TaskOptions>, params: InitManifestParams<T, TaskOptions>) {
    const { imageFormats, requestType, createItem, versioned } = params;

    const manifestPath = getAbsolutePath(task, task.options.manifestFile);
    const previousManifest = await getManifestFromDisk<T>(manifestPath);
    const syncedLibrary = await syncLibrary({
      fileId: task.options.figmaApiFileId,
      requestType,
      lastUpdated: previousManifest.lastUpdated,
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
      versioned,
    });

    await createItem(manifest, task.options);
    await manifest.handleDeletions(syncedLibrary.remoteIds);

    const [changelog, colorStyles] = await Promise.all([
      Changelog.loadFromDisk(task),
      ColorStyles.loadFromDisk(task),
    ]);

    return { changelog, colorStyles, manifest };
  }
}
