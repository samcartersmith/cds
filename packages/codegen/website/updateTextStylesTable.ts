import chalk from 'chalk';
import * as fs from 'fs';
import * as path from 'path';
import { argv } from 'yargs';
import { writePrettyFile } from '@cbhq/cds-web-utils';

import { Type } from '../Type/Type';
import { getSourcePath } from '../utils/getSourcePath';

export const updateTextStylesTable = async () => {
  const typeStylesTable = Type.generateScaleTable();
  const textStoryFile = await getSourcePath(
    '../apps/website/docs/components/typography/Text/design.mdx',
  );

  if (fs.existsSync(textStoryFile)) {
    const textStory = fs.readFileSync(textStoryFile);
    const tableStart = '<!-- styles table start -->';
    const tableEnd = '<!-- styles table end -->';
    const sectionStartIndex = textStory.indexOf(tableStart);
    const sectionEndIndex = textStory.indexOf(tableEnd);
    if (sectionStartIndex !== -1) {
      const updatedStylesTable = `${textStory.slice(
        0,
        sectionStartIndex,
      )}${tableStart}\n\n${typeStylesTable}\n${textStory.slice(sectionEndIndex, textStory.length)}`;

      await writePrettyFile({
        prettierConfig: argv.prettierConfig as string,
        outFile: textStoryFile,
        contents: updatedStylesTable,
        parser: 'mdx',
        logInfo: 'Text story',
      });
    } else {
      console.warn(
        `${chalk.yellow('warn')} Could not find styles table section in typography.mdx to update.}`,
      );
    }
  } else {
    console.warn(
      `${chalk.yellow(
        'warn',
      )} Doc typography.mdx has moved. Please update path in codegen script ${path.resolve(
        __filename,
      )}.}`,
    );
  }
};
