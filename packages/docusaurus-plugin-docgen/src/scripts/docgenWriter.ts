import ejs from 'ejs';
import fs from 'fs';
import { camelCase, kebabCase, startCase } from 'lodash';
import path from 'path';
import prettier from 'prettier';

export type Template =
  | 'shared/objectMap'
  | 'doc/component'
  | 'doc/implementation'
  | 'doc-item/api'
  | 'doc-item/example'
  | 'doc-item/import-block';

export type WriteFileConfig = {
  dest: string;
  data: unknown;
  template: Template;
};

type WriteFileParams<T> = {
  dest: string;
  data: T;
};

const writeConfig = { encoding: 'utf8', flag: 'w' } as const;

const helpers = {
  camelCase,
  kebabCase,
  pascalCase: (str: string) => startCase(str).split(' ').join(''),
  startCase,
};

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
  const prettierOptions = await prettier.resolveConfig('@cbhq/eslint-plugin/prettierConfig.json');
  const prettiered = prettier.format(content, {
    ...prettierOptions,
    parser: getParser(dest),
  });
  return fs.promises.writeFile(dest, prettiered, writeConfig);
}

const templatesDir = path.join(__dirname, '../templates');

/**
 * Writes the content passed from docgenRunner to disk based on plugin config.
 */
export async function docgenWriter(files: WriteFileConfig[]) {
  return Promise.all(
    files.map(async (item) => {
      const contents = await ejs.renderFile(path.join(templatesDir, `${item.template}.ejs.t`), {
        data: item.data,
        h: helpers,
      });
      return writeFile({
        dest: item.dest,
        data: contents,
      });
    }),
  );
}
