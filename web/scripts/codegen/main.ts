import { typography, fallbackStack } from '@cb/design-system-web/primitives/typography/typography';
import * as chalk from 'chalk';
import * as ejs from 'ejs';
import * as fs from 'fs';
import * as path from 'path';

import { writePrettyFile } from '../../../../../../tools/js/writePrettyFile';
import { Type } from './Type';

const prettierConfig = path.resolve('../../../../.prettierrc');
const srcDir = path.resolve(__dirname, '../../src');
const getFileDocString = (...additionalText: string[]) => `
/**
 * DO NOT MODIFY
 * Generated from scripts/codegen/main.ts \
 ${additionalText.length ? `\n* ${additionalText.join('\n* ')}` : ''}
 */
`;

const generateFromTemplate = async ({
  template,
  data,
  extension = '.ts',
  shouldCreateFolder = false,
  logInfo,
}: {
  template: string;
  data: Record<string, unknown>;
  logInfo: string;
  extension?: '.ts' | '.tsx';
  shouldCreateFolder?: boolean;
}) => {
  try {
    // generate text styles for all scales
    const templatePath = path.join(__dirname, './templates', template);
    const code = await ejs.renderFile(templatePath, data);

    const fileName = path.basename(template, path.extname(template));
    const outFile = path.join(
      srcDir,
      path.dirname(template),
      shouldCreateFolder ? fileName : '',
      fileName + extension
    );
    await writePrettyFile({
      prettierConfig,
      outFile,
      contents: getFileDocString() + code,
      logInfo,
    });
  } catch (error) {
    console.error(`${chalk.redBright('failed')} Couldn't generate ${logInfo}.`);
    console.error(error);
  }
};

const generateStyles = () => {
  const { genericTypeStyles, allTypeStyles } = Type.generateGenericStyles();

  // global styles and css variable definitions
  generateFromTemplate({
    template: 'primitives/scale/styles.ejs',
    data: {
      scaleStyles: allTypeStyles,
    },
    logInfo: 'scale styles',
  });

  generateFromTemplate({
    template: 'primitives/typography/styles.ejs',
    data: {
      fallbackStack,
      styleObjects: genericTypeStyles,
    },
    logInfo: 'typography styles',
  });
};

const updateTextStory = () => {
  const typeStylesTable = Type.generateScaleTable();
  const textStoryFile = path.join(srcDir, 'components/Text/Text.stories.mdx');

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
        prettierConfig,
        outFile: textStoryFile,
        contents: updatedTextStory,
        parser: 'mdx',
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

const main = async () => {
  generateStyles();
  generateFromTemplate({
    template: 'components/Text.ejs',
    data: { typography },
    logInfo: 'typography components',
    extension: '.tsx',
    shouldCreateFolder: true,
  });
  updateTextStory();
};

main();
