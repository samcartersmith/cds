import { createWriteStream } from 'fs';

import { manifestData } from '../illustrations/illustration_manifest';
import { getSourcePath } from '../utils/getSourcePath';

const baseTemplate = `/**
 * DO NOT MODIFY
 * Generated from packages/codegen/stories/createIllustrationStories.ts
 */

import { illustrationPercyBuilder } from '@cbhq/cds-common/internal/illustrationPercyBuilder';

import { Box, HStack, VStack } from '../../layout';
import { ThemeProvider } from '../../system';
import { TextLabel1 } from '../../typography';
import { Illustration } from '../Illustration';

export default {
  title: 'Illustrations',
  component: Illustration,
};

const { ListIllustrations } = illustrationPercyBuilder(
  Illustration,
  ThemeProvider,
  (props) => <HStack {...props} />,
  (props) => <VStack {...props} />,
  (props) => <Box {...props} />,
  (props) => <TextLabel1 {...props} as="p" />,
);

`;

const CHUNK_SIZE = 120;

const createIllustrationStories = () => {
  const numIllustrations = Object.keys(manifestData.svg).length;
  const outputFile = getSourcePath(
    `packages/web/illustrations/__stories__/Illustration.stories.tsx`,
  );

  const stream = createWriteStream(outputFile);

  stream.on('error', (err) => {
    console.log(`createWriteStream is erroring. Msg: `, err);
    stream.end();
  });

  stream.write(baseTemplate);

  let sheetNumber = 0;

  for (let startRange = 0; startRange < numIllustrations; startRange += CHUNK_SIZE) {
    const endRange = startRange + CHUNK_SIZE;

    stream.write(
      `export const Sheet${sheetNumber} = () => ListIllustrations(${startRange}, ${endRange});\n`,
    );
    sheetNumber += 1;
  }
  stream.end();
};

void createIllustrationStories();
