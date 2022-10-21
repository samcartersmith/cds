import { createWriteStream } from 'fs';

import { manifest } from '../icons/manifest';
import { getSourcePath } from '../utils/getSourcePath';

const baseTemplate = `/**
 * DO NOT MODIFY
 * Generated from packages/codegen/stories/createIconStories.ts
 */

import {
  CreateIconSheetParams,
  iconSheetBuilderWeb,
} from '@cbhq/cds-common/internal/iconSheetBuilderWeb';

import { HStack, VStack } from '../../layout';
import { Icon } from '../Icon';

export default {
  title: 'Icon',
  component: Icon,
};

const { IconSheet } = iconSheetBuilderWeb({
  platform: 'web',
  VStack,
  HStack,
  Icon,
} as CreateIconSheetParams);

`;

const createIconStories = () => {
  const numIcons = Object.keys(manifest.unicodeMap).length;
  const outputFile = getSourcePath(`packages/web/icons/__stories__/Icon.stories.tsx`);

  const stream = createWriteStream(outputFile);

  stream.on('error', (err) => {
    console.log(`createWriteStream is erroring. Msg: `, err);
    stream.end();
  });

  stream.write(baseTemplate);

  let sheetNumber = 0;
  const CHUNK_SIZE = 50;

  for (let startRange = 0; startRange < numIcons; startRange += CHUNK_SIZE) {
    const endRange = startRange + CHUNK_SIZE;

    stream.write(
      `export const Sheet${sheetNumber} = () => IconSheet(${startRange}, ${endRange});\n`,
    );
    sheetNumber += 1;
  }
  stream.end();
};

void createIconStories();
