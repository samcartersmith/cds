import { scaleConfig } from '@cb/design-system/codegen/configs/scaleConfig';
import { getSourcePath } from '@cb/design-system/codegen/utils/generateFromTemplate';
import { pascalCase } from '@cb/design-system/utils';
import { writePrettyFile } from '@tools/writePrettyFile';
import * as chalk from 'chalk';
import * as fs from 'fs';
import * as path from 'path';
import { argv } from 'yargs';

import {
  typographyCss,
  typographyScaleMapWithCssVariables,
  typographyScaleMapWithUnits,
  typographyPascalCaseConfig,
  typographyScaleMapWithoutUnits,
} from './generateTypeStyles';

export const Type = {
  native: typographyScaleMapWithoutUnits,
  pascalCaseConfig: typographyPascalCaseConfig,
  css: typographyCss,
  scaleCss: typographyScaleMapWithCssVariables,
  generateScaleTable: () => {
    // include type names
    const tableBody = Object.keys(typographyPascalCaseConfig).map(typeName => [
      `\`${pascalCase(typeName)}\``,
    ]);
    // concat type styles with corresponding type name
    Object.values(typographyScaleMapWithUnits).forEach(typeStylesAtScale => {
      Object.values(typeStylesAtScale).forEach((style, index) =>
        tableBody[index].push(`${style['font-size']} / ${style['line-height']}`)
      );
    });

    return mdTable([
      Object.entries(scaleConfig).map(
        ([scale, offset]) => `${scale} (${offset > 0 ? `+${offset}` : offset})`
      ),
      ...tableBody,
    ]);
  },
  async updateTextStory() {
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
        )}${tableStart}\n\n${typeStylesTable}\n${textStory.slice(
          sectionEndIndex,
          textStory.length
        )}`;

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
  },
};

const mdTable = ([header, ...rows]: string[][]) => {
  const numCol = header.length;
  header.unshift('', '');
  header.push('');
  const divider = Array(numCol).fill('---');
  divider.unshift('');
  divider.push('');
  const tableBody = rows.map(row => {
    row.unshift('');
    row.push('');
    return `${row.join(' | ')}`;
  });

  return `${header.join(' | ')}
  ${divider.join(' | ')}
  ${tableBody.join('\n')}
  `;
};
