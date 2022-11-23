import { FigmaTokens, ParsedTokenValue } from '@cbhq/figma-api';
import { writePrettyFile } from '@cbhq/script-utils/fs';
import { tokensTemplate } from '@cbhq/script-utils/tagged-templates';

const FIGMA_LIGHT_STYLES_FILE_ID = '0LGLs39lCL3WIFUadyGH1A';
const FIGMA_DARK_STYLES_FILE_ID = 'lQEzxkEp0nQPS6zV1ZpLNO';
const FIGMA_ILLUSTRATION_LIGHT_STYLES_FILE_ID = 'skPXKFmI64GqqEkOaBSHcL';
const FIGMA_ILLUSTRATION_DARK_STYLES_FILE_ID = 'etJaiHq7aFlJFICLKIrcK7';

type GenerateStylesParams = {
  light: FigmaTokens;
  dark: FigmaTokens;
  fileName: string;
};

async function generateStyles({ light, dark, fileName }: GenerateStylesParams) {
  const lightStyles = FigmaTokens.nameToTokenMap(light.localTokens);
  const darkStyles = FigmaTokens.nameToTokenMap(dark.localTokens);
  const lightKeyMap: Record<string, string> = {};
  const darkKeyMap: Record<string, string> = {};
  const lightIdToDarkRgba: Record<string, ParsedTokenValue> = {};
  const darkIdToLightRgba: Record<string, ParsedTokenValue> = {};

  lightStyles.forEach(({ key, name, id }) => {
    const match = FigmaTokens.nameToTokenMap(dark.localTokens).get(name);
    if (!match) {
      throw new Error(`${name} is missing dark mode equivalent`);
    }
    lightKeyMap[key] = match.key;
    lightIdToDarkRgba[id] = match.value;
  });

  darkStyles.forEach(({ id, key, name }) => {
    const match = FigmaTokens.nameToTokenMap(light.localTokens).get(name);
    if (!match) {
      throw new Error(`${name} is missing light mode equivalent`);
    }
    darkKeyMap[key] = match.key;
    darkIdToLightRgba[id] = match.value;
  });

  const colorStyles = tokensTemplate`
  /**
   * DO NOT MODIFY
   * Generated from yarn nx run figma-styles:sync
  */

  /** light name mapped to light style key */
  export const light = ${FigmaTokens.nameToKeyMap(light.localTokens)};

  /** light style mapped to dark style */
  export const lightKeyMap = ${lightKeyMap};

  /** 
   * light id mapped to dark rgba value. 
   * Useful for light mode only assets where we generate the dark mode
   * version using the light mode id.
   */
  export const lightIdToDarkRgba = ${lightIdToDarkRgba};

  /** dark name mapped to dark style key */
  export const dark = ${FigmaTokens.nameToKeyMap(dark.localTokens)};

  /** dark style mapped to light style */
  export const darkKeyMap = ${darkKeyMap};

  /** 
   * dark id mapped to light rgba value. 
   * Useful for dark mode only assets where we generate the light mode
   * version using the dark mode id.
   */
  export const darkIdToLightRgba = ${darkIdToLightRgba};
  `;

  return writePrettyFile(`__generated__/${fileName}.ts`, colorStyles);
}

async function sync() {
  try {
    const [light, dark, illoLight, illoDark] = await Promise.all([
      FigmaTokens.fetch(FIGMA_LIGHT_STYLES_FILE_ID),
      FigmaTokens.fetch(FIGMA_DARK_STYLES_FILE_ID),
      FigmaTokens.fetch(FIGMA_ILLUSTRATION_LIGHT_STYLES_FILE_ID),
      FigmaTokens.fetch(FIGMA_ILLUSTRATION_DARK_STYLES_FILE_ID),
    ]);

    await Promise.all([
      generateStyles({ light, dark, fileName: 'ui-styles' }),
      generateStyles({ light: illoLight, dark: illoDark, fileName: 'illustration-styles' }),
    ]);
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    } else {
      throw err;
    }
  }
}

void sync();
