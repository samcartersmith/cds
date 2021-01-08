import { writePrettyFile } from '@tools/writePrettyFile';
import chalk from 'chalk';
import * as fs from 'fs';
import * as path from 'path';
import { argv } from 'yargs';

import { Type } from '../Type/Type';
import { getSourcePath } from '../utils/getSourcePath';

export const updateTextStory = async () => {
  const typeStylesTable = Type.generateScaleTable();
  const textStoryFile = await getSourcePath('web/src/components/Text/Text.stories.mdx');

  if (fs.existsSync(textStoryFile)) {
    const textStory = fs.readFileSync(textStoryFile);
    const tableStart = '<!-- styles table start -->';
    const tableEnd = '<!-- styles table end -->';
    const sectionStartIndex = textStory.indexOf(tableStart);
    const sectionEndIndex = textStory.indexOf(tableEnd);
    if (sectionStartIndex !== -1) {
      const updatedTextStory = `${textStory.slice(
        0,
        sectionStartIndex
      )}${tableStart}\n\n${typeStylesTable}\n${textStory.slice(sectionEndIndex, textStory.length)}`;

      writePrettyFile({
        prettierConfig: argv.prettierConfig as string,
        outFile: textStoryFile,
        contents: updatedTextStory,
        parser: 'mdx',
        logInfo: 'Text story',
      });
    } else {
      console.warn(
        `${chalk.yellow('warn')} Could not find styles table section in Text story to update.}`
      );
    }
  } else {
    console.warn(
      `${chalk.yellow(
        'warn'
      )} Text story has moved. Please update path in codegen script ${path.resolve(__filename)}.}`
    );
  }
};
