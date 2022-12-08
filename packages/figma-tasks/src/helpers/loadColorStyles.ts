import { Task } from '@cbhq/mono-tasks';

import { ColorStyleManifestType, ColorStyles } from '../tools/ColorStyles';
import { Manifest } from '../tools/Manifest';

export type LoadColorStylesTaskOptions = {
  /** The manifest.json file which contains light color styles */
  lightModeManifestFile?: string;
  /** The manifest.json file which contains dark color styles */
  darkModeManifestFile?: string;
  /** If the manifest.json file should track versions for any updates. */
  manifestVersioning?: boolean;
};

async function loadColorStyle(
  task: Task<LoadColorStylesTaskOptions>,
  colorStyleManifestFile: string,
) {
  const { manifestVersioning } = task.options;
  return Manifest.init<ColorStyleManifestType>(task, {
    manifestFile: colorStyleManifestFile,
    manifestVersioning,
  });
}

export async function loadColorStyles(task: Task<LoadColorStylesTaskOptions>) {
  const { darkModeManifestFile, lightModeManifestFile } = task.options;

  if (darkModeManifestFile && lightModeManifestFile) {
    const [dark, light] = await Promise.all([
      loadColorStyle(task, darkModeManifestFile),
      loadColorStyle(task, lightModeManifestFile),
    ]);
    return new ColorStyles({ dark, light });
  }
  return undefined;
}
