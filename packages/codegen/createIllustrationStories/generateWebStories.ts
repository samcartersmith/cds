import { createWriteStream } from 'fs';
import { sortedImg } from '@cbhq/cds-common/internal/data/sortedIllustrationData';

import { getSourcePath } from '../utils/getSourcePath';

import { baseWebTemplate } from './template';

function generateWebStories(outputFile: string, chunkSize: number) {
  const stream = createWriteStream(outputFile);

  stream.on('error', (err) => {
    console.log(`createWriteStream is erroring. Msg: `, err);
    stream.end();
  });

  stream.write(baseWebTemplate);

  Object.entries(sortedImg).forEach(([variant, names]) => {
    let sheetNumber = 0;
    const numIllustrations = names.length;

    for (let startRange = 0; startRange < numIllustrations; startRange += chunkSize) {
      const endRange = startRange + chunkSize;

      stream.write(
        `export const ${variant}_${sheetNumber} = () => ListIllustrations('${variant}', ${startRange}, ${endRange});\n`,
      );
      sheetNumber += 1;
    }
  });
  stream.end();
}
/**
 * The script generates the illustration stories for web in a storybook v7 compatible manner.
 */
function main() {
  const CHUNK_SIZE = 120;

  const outputFile = getSourcePath(
    `packages/web/illustrations/__stories__/Illustration.stories.tsx`,
  );

  generateWebStories(outputFile, CHUNK_SIZE);
}

main();
