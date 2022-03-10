import * as ejs from 'ejs';
import * as fs from 'fs';
import * as path from 'path';
import * as prettier from 'prettier';
import { argv } from 'yargs';
import { writePrettyFile } from '@cbhq/cds-web-utils';

import { formatTemplateType } from './formatTemplateType';
import { getSourcePath } from './getSourcePath';

const prettierConfig = argv.prettierConfig as string;

export type TemplateConfig<T = unknown> = {
  dest: string;
  data: T;
  types?: Record<string, string>;
  config?: {
    defaultExport?: boolean;
    commonJS?: boolean;
    disableAsConst?: boolean;
    disableStringify?: boolean;
    disablePrettier?: boolean;
    imports?: string[];
    sort?: boolean;
  };
  header?: string;
};

export type TemplateMap = Record<string, TemplateConfig[]>;
type WriteFileParams = {
  template?: string;
} & TemplateConfig;

const getParser = (ext: string): prettier.BuiltInParserName => {
  switch (ext) {
    case '.mdx':
      return 'mdx';
    case '.js':
      return 'babel';
    case '.json':
      return 'json';
    case '.css':
      return 'css';
    default:
      return 'typescript';
  }
};

const getFileDocString = (ext: string) => {
  switch (ext) {
    case '.json':
    case '.mdx':
    case '.md':
    case '.css': {
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

export const writeFile = async ({
  template,
  data,
  types = {},
  dest,
  config = {},
  header = '',
}: WriteFileParams) => {
  try {
    let contents = data as string;
    const outFile = await getSourcePath(dest);
    const ext = path.extname(outFile);

    if (template) {
      const templatePath = path.join(__dirname, '../templates', template);
      const code = await ejs.renderFile(templatePath, {
        data,
        format: formatTemplateType,
        config,
        types,
      });
      contents = getFileDocString(ext) + header + code;
    }

    const dirForFile = path.dirname(outFile);
    // If directory doesn't already exist, create it.
    fs.mkdirSync(dirForFile, { recursive: true });

    if (config?.disablePrettier) {
      await fs.promises.writeFile(outFile, contents, { encoding: 'utf8', flag: 'w' });
    } else {
      await writePrettyFile({
        prettierConfig,
        outFile,
        contents,
        logInfo: dest,
        parser: getParser(ext),
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      throw new Error(`Couldn't generate ${dest}.`);
    } else {
      throw error;
    }
  }
};
