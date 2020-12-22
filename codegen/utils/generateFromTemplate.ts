import { writePrettyFile } from '@tools/writePrettyFile';
import * as ejs from 'ejs';
import * as path from 'path';
import { argv } from 'yargs';

import { getSourcePath } from './getSourcePath';

const prettierConfig = argv.prettierConfig as string;

const getFileDocString = () => `
/**
 * DO NOT MODIFY
 * Generated from scripts/codegen/main.ts
 */
`;

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
      logInfo: dest,
    });
  } catch (error) {
    console.error(error);
    throw new Error(`Couldn't generate ${dest}.`);
  }
};
