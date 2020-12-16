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

export const sh = promisify(exec);

export const getSourcePath = async (dest: string) => {
  const { stdout: absoluteFilePath } = await sh(`readlink ${__filename}`);
  return path.join(absoluteFilePath, '../../..', dest);
};

export const generateFromTemplate = async ({
  template,
  data,
  dest,
}: {
  template: string;
  dest: string;
  data: Record<string, unknown>;
}) => {
  try {
    const templatePath = path.join(__dirname, '../templates', template);
    const code = await ejs.renderFile(templatePath, { data });
    const outFile = await getSourcePath(dest);
    await writePrettyFile({
      prettierConfig,
      outFile,
      contents: getFileDocString() + code,
      logInfo: `Building ${dest}`,
    });
  } catch (error) {
    console.error(`${chalk.redBright('failed')} Couldn't generate ${dest}.`);
    console.error(error);
  }
};
