import chalk from 'chalk';

import navIconNames from '../src/__generated__/nav/data/names';
import iconNames from '../src/__generated__/ui/data/names';
import type { NavIconName, UiIconName } from '../src/index';
import { writePrettyFile } from './writeStories';

const NAV_ICON_CHUNK_SIZE = 80;
const ICON_CHUNK_SIZE = 160;
const STORIES_DIR = 'packages/web/src/icons/__stories__';

const rootPath = process.env.PROJECT_CWD ?? process.env.NX_MONOREPO_ROOT;
const storiesPath = `${rootPath}/${STORIES_DIR}`;

type IconType = 'navigationIcon' | 'icon';
type IconNamesMap = {
  navigationIcon: NavIconName;
  icon: UiIconName;
};

const generateStory = async <T extends IconType>(
  type: T,
  iconsList: IconNamesMap[T][],
  chunkSize: number,
) => {
  const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);
  const numberOfChunks = Math.ceil(iconsList.length / chunkSize);

  let sheets = '';

  for (let i = 0; i < numberOfChunks; i += 1) {
    const start = i * chunkSize;
    const end = start + chunkSize;

    sheets += `export const Sheet${
      i + 1
    } = () => <${capitalizedType}Sheet endIndex={${end}} startIndex={${start}} />;\n`;
  }

  await writePrettyFile(
    `${storiesPath}/${capitalizedType}.stories.tsx`,
    `
/**
 * DO NOT MODIFY
 * Generated from yarn nx run icons:generate-stories
 */

import { ${capitalizedType} } from '../${capitalizedType}';

import { ${capitalizedType}Sheet } from './${capitalizedType}Sheet';

export default {
  title: '${capitalizedType}',
  component: ${capitalizedType},
};

// single sheet is too large for Percy, need to split up in chunks of ${chunkSize} to stay under resource limit
${sheets}
    `.trimStart(),
  );
};

const generateStories = async () => {
  try {
    console.info(chalk.blue('Generating icon stories...'));

    await generateStory('navigationIcon', navIconNames, NAV_ICON_CHUNK_SIZE);
    await generateStory('icon', iconNames, ICON_CHUNK_SIZE);

    console.info(chalk.green('Icon stories generated successfully!'));
  } catch (err) {
    throw new Error(`Error generating icon stories: ${err}`);
  }
};

void generateStories();
