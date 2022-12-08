import { ColorStyle } from './ColorStyle';
import { Manifest, ManifestShape } from './Manifest';

export type ColorStyleManifestType = ManifestShape<ColorStyle>;

export type ColorStylesParams = {
  /** The manifest.json file with light mode color styles */
  light: Manifest<ColorStyleManifestType>;
  /** The manifest.json file with dark mode color styles */
  dark: Manifest<ColorStyleManifestType>;
};

export class ColorStyles {
  public readonly dark: Manifest<ColorStyleManifestType>;

  public readonly light: Manifest<ColorStyleManifestType>;

  private readonly lightToDarkTuple: [string, string][] = [];

  constructor({ light, dark }: ColorStylesParams) {
    this.light = light;
    this.dark = dark;
    light.items.forEach((color) => {
      const darkMatch = dark.nameMap.get(color.name);
      if (darkMatch) {
        this.lightToDarkTuple.push([color.fill, darkMatch.fill]);
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
      transformedContent = transformedContent.replaceAll(item.fill, item.cssVarGetter);
    });
    return transformedContent;
  }
}
