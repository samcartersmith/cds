import { writePrettyFile } from '@tools/writePrettyFile';
import * as chalk from 'chalk';
import { exec } from 'child_process';
import * as ejs from 'ejs';
import * as path from 'path';
import { promisify } from 'util';
import { argv } from 'yargs';

const prettierConfig = argv.prettierConfig as string;

const getFileDocString = (...additionalText: string[]) => `
/**
 * DO NOT MODIFY
 * Generated from scripts/codegen/main.ts \
 ${additionalText.length ? `\n* ${additionalText.join('\n* ')}` : ''}
 */
`;

export const outDirs = {
  web: '../../../web/src',
};

export const sh = promisify(exec);

export const getSourcePath = async (fromFile: string, ...relativePaths: string[]) => {
  const { stdout: absoluteFilePath } = await sh(`readlink ${fromFile}`);
  return path.join(absoluteFilePath, ...relativePaths);
};

export const generateFromTemplate = async ({
  template,
  data,
  extension = '.ts',
  outRoot,
  shouldCreateFolder = false,
  logInfo,
}: {
  template: string;
  outRoot: string;
  data: Record<string, unknown>;
  logInfo: string;
  extension?: '.ts' | '.tsx';
  shouldCreateFolder?: boolean;
}) => {
  try {
    // generate text styles for all scales
    const templatePath = path.join(__dirname, '../templates', template);
    const code = await ejs.renderFile(templatePath, { data });

    const fileName = path.basename(template, path.extname(template));
    const outFile = await getSourcePath(
      __filename,
      outRoot,
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
