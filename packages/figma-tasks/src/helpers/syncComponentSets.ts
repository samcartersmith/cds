import { Task as MonoTask } from '@cbhq/mono-tasks';

import { ComponentSet } from '../tools/ComponentSet';
import { Manifest, ManifestShape } from '../tools/Manifest';
import type { ExecutorName } from '../types';

import { loadChangelog } from './loadChangelog';
import { loadColorStyles } from './loadColorStyles';
import { loadRemoteData } from './loadRemoteData';
import { GenerateSvgsTaskOptions } from './svgsGenerator';

export type SyncComponentSetsTaskOptions = {
  /** The file ID to use when making requests to Figma API  */
  figmaApiFileId: string;
  /** The manifest.json file to get information about previous syncs and to update after new syncs. */
  manifestFile: string;
  /** If the manifest.json file should track versions for any updates. */
  manifestVersioning?: boolean;
  /** The CHANGELOG.md file to document changes to. */
  changelogFile?: string;
  /** The manifest.json file which contains light color styles */
  lightModeManifestFile?: string;
  /** The manifest.json file which contains dark color styles */
  darkModeManifestFile?: string;
  /** The directory to output generated types. */
  generatedTypesDirectory?: string;
} & Partial<GenerateSvgsTaskOptions>;

type SyncComponentSetsParams = {
  /** The name of the executor the manifest originated from */
  executor: ExecutorName;
  downloadSvgs?: boolean;
};

export async function syncComponentSets<
  ManifestType extends ManifestShape<ComponentSet>,
  TaskOptions extends SyncComponentSetsTaskOptions = SyncComponentSetsTaskOptions,
>(task: MonoTask<TaskOptions>, { downloadSvgs, executor }: SyncComponentSetsParams) {
  const { figmaApiFileId, manifestFile, manifestVersioning } = task.options;

  const manifest = await Manifest.init<ManifestType>(task, {
    executor,
    manifestFile,
    manifestVersioning,
  });

  const [changelog, colorStyles, remoteData] = await Promise.all([
    loadChangelog(task),
    loadColorStyles(task),
    loadRemoteData({
      requestType: 'component_sets',
      figmaApiFileId,
      downloadSvgs,
      lastUpdated: manifest.lastUpdated,
      manifest,
    }),
  ]);

  const { nodes: remoteNodes, svgs: remoteSvgs } = remoteData;

  /** Handle updates/additions */
  if (remoteNodes) {
    ComponentSet.init({ manifest, remoteNodes });
  }

  return { changelog, colorStyles, manifest, remoteSvgs };
}
