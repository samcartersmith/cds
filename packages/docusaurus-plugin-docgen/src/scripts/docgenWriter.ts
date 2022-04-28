import ejs from 'ejs';
import fs from 'fs';
import path from 'path';
import prettier from 'prettier';

import { ParsedDoc } from './docgenParser';

export type DocgenWriterParams = {
  alias: string;
  files: WriteFileConfig[];
  outputDir: string;
};

export type WriteFileConfig = {
  dest: string;
  data: ParsedDoc | Record<string, unknown>;
  template: string;
};

type WriteFileParams<T> = {
  dest: string;
  data: T;
};

const writeConfig = { encoding: 'utf8', flag: 'w' } as const;

function getParser(dest: string): prettier.BuiltInParserName {
  const ext = path.extname(dest);
  switch (ext) {
    case '.mdx':
      return 'mdx';
    case '.js':
      return 'babel';
    case '.json':
      return 'json';
    case '.ts':
    default:
      return 'typescript';
  }
}

export async function writeFile<T>({ dest, data }: WriteFileParams<T>) {
  const content = typeof data === 'string' ? data : JSON.stringify(data);
  const dirForFile = path.dirname(dest);
  // If directory doesn't already exist, create it.
  await fs.promises.mkdir(dirForFile, { recursive: true });
  const prettiered = prettier.format(content, {
    parser: getParser(dest),
  });
  return fs.promises.writeFile(dest, prettiered, writeConfig);
}

/**
 * Writes the content passed from docgenRunner to disk based on plugin config.
 */
export async function docgenWriter({ alias, files }: DocgenWriterParams) {
  return Promise.all(
    files.map(async (item) => {
      const contents = await ejs.renderFile(item.template, {
        data: item.data,
        alias,
      });
      await writeFile({
        dest: item.dest,
        data: contents,
      });
    }),
  );
}
