import { createWriteStream } from 'fs';

import { manifestData } from '../illustrations/illustration_manifest';

import { baseTemplate } from './template';

export function generateIllustrationStories(outputFile: string, chunkSize: number) {
  const stream = createWriteStream(outputFile);

  stream.on('error', (err) => {
    console.log(`createWriteStream is erroring. Msg: `, err);
    stream.end();
  });

  stream.write(baseTemplate);

  let sheetNumber = 0;
  const numIllustrations = Object.keys(manifestData.svg).length;

  for (let startRange = 0; startRange < numIllustrations; startRange += chunkSize) {
    const endRange = startRange + chunkSize;

    stream.write(
      `export const Sheet${sheetNumber} = () => ListIllustrations(${startRange}, ${endRange});\n`,
    );
    sheetNumber += 1;
  }
  stream.end();
}
