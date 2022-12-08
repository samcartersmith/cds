/* eslint-disable no-underscore-dangle */
import { parseJson, writeJsonFile } from '@nrwl/devkit';
import fs from 'node:fs';
import { Task } from '@cbhq/mono-tasks';
import { existsOrCreateDir, getAbsolutePath } from '@cbhq/script-utils';

export type ItemShape = {
  id: string;
  name: string;
  outputs: string[];
  incrementVersion?: () => void;
};

export type ManifestShape<
  Item extends ItemShape = ItemShape,
  Metadata = Record<string, unknown>,
> = {
  items: [string, Item][];
  lastUpdated: string;
  metadata: Metadata;
};

export type GetManifestItem<T extends ManifestShape> = T['items'][number][1];

type InitManifestParams = {
  /** The manifest.json file to get information about previous syncs and to update after new syncs. */
  manifestFile: string;
  /** If the manifest.json file should track versions for any updates. */
  manifestVersioning?: boolean;
};

type ManifestOptions<PreviousManifest extends ManifestShape> = {
  previousManifest: PreviousManifest;
  filePath: string;
  versioned?: boolean;
  task: Task;
};

const FALLBACK_MANIFEST = { lastUpdated: '', items: [] };

export class Manifest<T extends ManifestShape = ManifestShape> {
  private readonly filePath: string;

  private _metadata: T['metadata'];

  public readonly lastUpdated: string;

  public readonly previousItems: Map<string, GetManifestItem<T>>;

  public readonly items = new Map<string, GetManifestItem<T>>();

  public additions = new Set<GetManifestItem<T>>();

  public deletions = new Set<GetManifestItem<T>>();

  public renames = new Map<string, string>();

  public updates = new Set<GetManifestItem<T>>();

  private remoteIds = new Set<string>();

  private recentlyUpdatedIds = new Set<string>();

  private readonly versioned: boolean;

  private readonly task: Task;

  constructor({ previousManifest, filePath, task, versioned }: ManifestOptions<T>) {
    this.filePath = filePath;
    this.lastUpdated = previousManifest.lastUpdated;
    this._metadata = previousManifest.metadata;
    this.previousItems = new Map(previousManifest.items);
    this.task = task;
    this.versioned = Boolean(versioned);
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
    if (!this.previousItems.has(item.id) && this.remoteIds.has(item.id)) {
      this.additions.add(item);
    }
  }

  public checkIfUpdated(item: GetManifestItem<T>) {
    if (this.previousItems.has(item.id) && this.recentlyUpdatedIds.has(item.id)) {
      this.updates.add(item);
      if (this.versioned && item.incrementVersion) {
        console.log(`Increment version ${item.name}`);
        item.incrementVersion();
      }
    }
  }

  private checkIfDeleted(item: GetManifestItem<T>) {
    if (this.previousItems.has(item.id) && !this.remoteIds.has(item.id)) {
      this.previousItems.delete(item.id);
      this.deletions.add(item);
    }
  }

  public get nameMap() {
    return new Map(
      [...this.previousItems.values(), ...this.items.values()].map((item) => [item.name, item]),
    );
  }

  public addNewItem(item: GetManifestItem<T>) {
    this.checkIfUpdated(item);
    this.checkIfAdded(item);
    this.checkIfDeleted(item);
    this.checkIfRenamed(item);
    this.items.set(item.id, item);
  }

  public onRemoteDataLoaded({
    recentlyUpdatedIds,
    remoteIds,
  }: {
    recentlyUpdatedIds: string[];
    remoteIds: string[];
  }) {
    this.recentlyUpdatedIds = new Set(recentlyUpdatedIds);
    this.remoteIds = new Set(remoteIds);
  }

  public async deleteStaleFiles() {
    const rmPromises: Promise<void>[] = [];
    if (this.versioned && this.updates.size > 0) {
      this.updates.forEach((item) => {
        const oldVersion = this.previousItems.get(item.id);
        if (oldVersion) {
          oldVersion.outputs.forEach((output) => {
            const absolutePath = getAbsolutePath(this.task, output);
            console.log(`Delete ${absolutePath}`);
            // rmPromises.push(fs.promises.rm(absolutePath));
          });
        }
      });
    }

    await Promise.all(rmPromises);
  }

  public get metadata() {
    return this._metadata;
  }

  public setMetadata(metadata: Partial<T['metadata']>) {
    this._metadata = { ...this._metadata, ...metadata };
  }

  public toJSON() {
    return {
      lastUpdated: new Date().toISOString(),
      ...(this.metadata ? { metadata: this.metadata } : {}),
      items: [...this.previousItems.entries(), ...this.items.entries()],
    };
  }

  public async generateFile() {
    writeJsonFile(this.filePath, this.toJSON());
  }

  static async readPrevious<T extends ManifestShape>(manifestPath: string): Promise<T> {
    /** If manifest file doesn't exist, create it */
    const existed = await existsOrCreateDir(manifestPath);
    if (!existed) {
      await fs.promises.writeFile(manifestPath, JSON.stringify(FALLBACK_MANIFEST));
    }

    const manifestAsString = await fs.promises.readFile(manifestPath, 'utf-8');
    return parseJson(manifestAsString);
  }

  static async init<T extends ManifestShape>(
    task: Task,
    { manifestFile, manifestVersioning }: InitManifestParams,
  ) {
    const manifestPath = getAbsolutePath(task, manifestFile);
    const previousManifest = await Manifest.readPrevious<T>(manifestPath);
    return new Manifest<T>({
      task,
      filePath: manifestPath,
      previousManifest,
      versioned: manifestVersioning,
    });
  }
}
