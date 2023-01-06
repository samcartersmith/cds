import { createWriteStream } from 'fs';
import { iconNames, navigationIconInternalNames } from '@cbhq/cds-common/internal/data/iconData';

import { baseTemplate } from './template';

const iconMap = {
  ui: iconNames,
  nav: navigationIconInternalNames,
};

export const generateIconStories = (outputFile: string) => {
  const stream = createWriteStream(outputFile);
  stream.write(baseTemplate);

  for (const [variant, names] of Object.entries(iconMap)) {
    const numIcons = names.length;

    stream.on('error', (err) => {
      console.log(`createWriteStream is erroring. Msg: `, err);
      stream.end();
    });

    let sheetNumber = 0;
    const CHUNK_SIZE = 50;

    for (let startRange = 0; startRange < numIcons; startRange += CHUNK_SIZE) {
      const endRange = startRange + CHUNK_SIZE;

      stream.write(
        `export const ${variant}_${sheetNumber} = () => IconSheet('${variant}', ${startRange}, ${endRange});\n`,
      );
      sheetNumber += 1;
    }
  }
  stream.end();
};
