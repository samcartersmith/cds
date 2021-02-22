import { AnyObject } from '@cbhq/cds-utils';
import { writePrettyFile } from '@tools/writePrettyFile';
import * as ejs from 'ejs';
import * as fs from 'fs';
import * as path from 'path';
import * as prettier from 'prettier';
import { argv } from 'yargs';

import { formatTemplateType } from './formatTemplateType';
import { getSourcePath } from './getSourcePath';

const prettierConfig = argv.prettierConfig as string;

const getParser = (ext: string): prettier.BuiltInParserName => {
  switch (ext) {
    case '.mdx':
      return 'mdx';
    default:
      return 'typescript';
  }
};

const getFileDocString = (ext: string) => {
  switch (ext) {
    case '.mdx':
    case '.md': {
      return '';
    }
    default:
      return `
/**
 * DO NOT MODIFY
 * Generated from scripts/codegen/main.ts
 */
`;
  }
};

export const generateFromTemplate = async ({
  template,
  data,
  dest,
  config = {},
}: {
  template: string;
  dest: string;
  data: unknown;
  config?: AnyObject;
}) => {
  try {
    const templatePath = path.join(__dirname, '../templates', template);
    const code = await ejs.renderFile(templatePath, { data, format: formatTemplateType, config });
    const outFile = await getSourcePath(dest);
    const dirForFile = path.dirname(outFile);
    const ext = path.extname(outFile);

    // If directory doesn't already exist, create it.
    fs.mkdirSync(dirForFile, { recursive: true });
    await writePrettyFile({
      prettierConfig,
      outFile,
      contents: getFileDocString(ext) + code,
      logInfo: dest,
      parser: getParser(ext),
    });
  } catch (error) {
    console.error(error);
    throw new Error(`Couldn't generate ${dest}.`);
  }
};
