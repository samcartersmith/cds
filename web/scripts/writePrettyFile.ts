import * as fs from 'fs';
import * as prettier from 'prettier';

export async function writePrettyFile(
  prettierConfig: string,
  filename: string,
  contents: string,
  parser?: prettier.BuiltInParserName
): Promise<string> {
  const prettierOptions = prettierConfig ? await prettier.resolveConfig(prettierConfig) : null;
  const prettiered = prettier.format(contents, {
    ...prettierOptions,
    parser: parser || 'typescript',
  });
  fs.writeFileSync(filename, prettiered, { encoding: 'utf8', flag: 'w' });
  return prettiered;
}
