import prettier from 'prettier';

export type PrettierParser = prettier.Options['parser'];

export async function prettify(contents: string, parser: PrettierParser) {
  const prettierOptions = await prettier.resolveConfig('@cbhq/eslint-plugin/prettierConfig.json');
  return prettier.format(contents, {
    ...prettierOptions,
    parser,
  });
}
