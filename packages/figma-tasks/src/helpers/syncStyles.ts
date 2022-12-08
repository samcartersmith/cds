import { Task as MonoTask } from '@cbhq/mono-tasks';

import { ColorStyle } from '../tools/ColorStyle';
import { ColorStyleManifestType } from '../tools/ColorStyles';
import { Manifest } from '../tools/Manifest';

import { loadChangelog } from './loadChangelog';
import { loadRemoteData } from './loadRemoteData';

export type SyncStylesTaskOptions = {
  /** The file ID to use when making requests to Figma API  */
  figmaApiFileId: string;
  /** The manifest.json file to get information about previous syncs and to update after new syncs. */
  manifestFile: string;
  /** The CHANGELOG.md file to document changes to. */
  changelogFile?: string;
  /** Prefix to add to generated css variables */
  cssVariablesPrefix?: string;
};

export async function syncStyles<TaskOptions extends SyncStylesTaskOptions = SyncStylesTaskOptions>(
  task: MonoTask<TaskOptions>,
) {
  const { figmaApiFileId, manifestFile } = task.options;

  const manifest = await Manifest.init<ColorStyleManifestType>(task, {
    manifestFile,
  });

  const [changelog, remoteData] = await Promise.all([
    loadChangelog(task),
    loadRemoteData({
      requestType: 'styles',
      figmaApiFileId,
      lastUpdated: manifest.lastUpdated,
      manifest,
    }),
  ]);

  const { nodes: remoteNodes } = remoteData;

  if (remoteNodes) {
    Object.values(remoteData.nodes).forEach((node) => {
      if (node) {
        const newStyle = new ColorStyle(node, {
          cssVariablesPrefix: task.options.cssVariablesPrefix,
        });
        manifest.addNewItem(newStyle);
      }
    });
  }

  return { changelog, manifest };
}
