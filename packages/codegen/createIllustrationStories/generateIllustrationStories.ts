import { createWriteStream } from 'fs';
import { sortedImg } from '@cbhq/cds-common/internal/data/sortedIllustrationData';

import { baseTemplate } from './template';

export function generateIllustrationStories(outputFile: string, chunkSize: number) {
  const stream = createWriteStream(outputFile);

  stream.on('error', (err) => {
    console.log(`createWriteStream is erroring. Msg: `, err);
    stream.end();
  });

  stream.write(baseTemplate);

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
