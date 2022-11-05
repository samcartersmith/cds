import { createWriteStream } from 'fs';

import { manifest } from '../icons/manifest';

import { baseTemplate } from './template';

export const generateIconStories = (outputFile: string) => {
  const numIcons = Object.keys(manifest.unicodeMap).length;

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
