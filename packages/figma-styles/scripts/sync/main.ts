import { getFileStyles, Style } from '@cbhq/figma-api';
import { writePrettyFile } from '@cbhq/script-utils/fs';
import { tokensTemplate } from '@cbhq/script-utils/tagged-templates';

const FIGMA_LIGHT_STYLES_FILE_ID = '0LGLs39lCL3WIFUadyGH1A';
const FIGMA_DARK_STYLES_FILE_ID = 'lQEzxkEp0nQPS6zV1ZpLNO';
const FIGMA_ILLUSTRATION_LIGHT_STYLES_FILE_ID = 'skPXKFmI64GqqEkOaBSHcL';
const FIGMA_ILLUSTRATION_DARK_STYLES_FILE_ID = 'etJaiHq7aFlJFICLKIrcK7';

type GenerateStylesParams = {
  light: Style[];
  dark: Style[];
  fileName: string;
};

function nameToKeyTuple(style: Style) {
  const [, ...rest] = style.name.split('/');
  const nameWithoutPrefix = rest.join('/');
  return [nameWithoutPrefix, style.key] as const;
}

async function generateStyles({ light, dark, fileName }: GenerateStylesParams) {
  const lightStyles: Map<string, string> = new Map(light.map(nameToKeyTuple));
  const darkStyles: Map<string, string> = new Map(dark.map(nameToKeyTuple));
  const lightKeyMap: Record<string, string> = {};
  const darkKeyMap: Record<string, string> = {};

  lightStyles.forEach((key, name) => {
    const match = darkStyles.get(name);
    if (!match) {
      throw new Error(`${name} is missing dark mode equivalent`);
    }
    lightKeyMap[key] = match;
  });

  darkStyles.forEach((key, name) => {
    const match = lightStyles.get(name);
    if (!match) {
      throw new Error(`${name} is missing light mode equivalent`);
    }
    darkKeyMap[key] = match;
  });

  const colorStyles = tokensTemplate`
  /**
   * DO NOT MODIFY
   * Generated from yarn nx run figma-styles:sync
  */

  /** light name mapped to light style key */
  export const light = ${lightStyles};

  /** light style mapped to dark style */
  export const lightKeyMap = ${lightKeyMap};

  /** dark name mapped to dark style key */
  export const dark = ${darkStyles}; 

  /** dark style mapped to light style */
  export const darkKeyMap = ${darkKeyMap};
  `;

  return writePrettyFile(`__generated__/${fileName}.ts`, colorStyles);
}

async function sync() {
  try {
    const [light, dark, illoLight, illoDark] = await Promise.all([
      getFileStyles(FIGMA_LIGHT_STYLES_FILE_ID),
      getFileStyles(FIGMA_DARK_STYLES_FILE_ID),
      getFileStyles(FIGMA_ILLUSTRATION_LIGHT_STYLES_FILE_ID),
      getFileStyles(FIGMA_ILLUSTRATION_DARK_STYLES_FILE_ID),
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
