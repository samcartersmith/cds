import { Task } from '@cbhq/mono-tasks';
import { getAbsolutePath } from '@cbhq/script-utils';

import { getManifestFromDisk } from '../helpers/getManifestFromDisk';

import type { ColorStyle, ColorStyleManifestType } from './ColorStyle';
import type { ManifestShape } from './Manifest';

type ColorStyleFromDisk = {
  items: Map<string, ColorStyle>;
  nameMap: Map<string, ColorStyle>;
};

type ColorStylesTaskOptions = {
  /** The manifest.json file which contains light color styles */
  lightModeManifestFile?: string;
  /** The manifest.json file which contains dark color styles */
  darkModeManifestFile?: string;
};

type ColorStylesOptions = {
  /** The manifest.json file with light mode color styles */
  light: ColorStyleManifestType;
  /** The manifest.json file with dark mode color styles */
  dark: ColorStyleManifestType;
};

function normalizeColorStyleFromDisk(manifest: ManifestShape<ColorStyle>) {
  return {
    items: new Map(manifest.items),
    nameMap: new Map(manifest.items.map(([, item]) => [item.name, item])),
  };
}

export class ColorStyles {
  public readonly dark: ColorStyleFromDisk;

  public readonly light: ColorStyleFromDisk;

  private readonly lightToDarkTuple: [string, string][] = [];

  constructor({ light, dark }: ColorStylesOptions) {
    this.light = normalizeColorStyleFromDisk(light);
    this.dark = normalizeColorStyleFromDisk(dark);
    this.light.items.forEach((colorStyle) => {
      const darkMatch = this.dark.nameMap.get(colorStyle.name);
      if (darkMatch) {
        if (colorStyle.paint.type === 'solid' && darkMatch.paint.type === 'solid') {
          this.lightToDarkTuple.push([colorStyle.paint.value, darkMatch.paint.value]);
        }
      }
    });
  }

  public replaceLightWithDarkFills(content: string) {
    let transformedContent = content;
    this.lightToDarkTuple.forEach(([target, replacement]) => {
      transformedContent = transformedContent.replaceAll(target, replacement);
    });
    return transformedContent;
  }

  public replaceWithCssVariables(content: string) {
    let transformedContent = content;
    this.light.items.forEach((item) => {
      if (item.paint.type === 'solid') {
        transformedContent = transformedContent.replaceAll(item.paint.value, item.cssVarGetter);
      }
    });
    return transformedContent;
  }

  public static async loadFromDisk(task: Task<ColorStylesTaskOptions>) {
    const { darkModeManifestFile, lightModeManifestFile } = task.options;

    if (darkModeManifestFile && lightModeManifestFile) {
      const darkAbsolutePath = getAbsolutePath(task, darkModeManifestFile);
      const lightAbsolutePath = getAbsolutePath(task, lightModeManifestFile);
      const [dark, light] = await Promise.all([
        getManifestFromDisk<ColorStyleManifestType>(darkAbsolutePath),
        getManifestFromDisk<ColorStyleManifestType>(lightAbsolutePath),
      ]);

      return new ColorStyles({
        dark,
        light,
      });
    }
    return undefined;
  }
}
