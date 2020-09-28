import * as chalk from 'chalk';
import * as fs from 'fs';
import * as prettier from 'prettier';

export async function writePrettyFile({
  prettierConfig,
  outFile,
  contents,
  parser,
  logInfo,
}: {
  prettierConfig: string;
  outFile: string;
  contents: string;
  parser?: prettier.BuiltInParserName;
  logInfo?: string;
}): Promise<string> {
  const prettierOptions = prettierConfig ? await prettier.resolveConfig(prettierConfig) : null;
  const prettiered = prettier.format(contents, {
    ...prettierOptions,
    parser: parser || 'typescript',
  });
  fs.writeFileSync(outFile, prettiered, { encoding: 'utf8', flag: 'w' });
  console.info(
    `${chalk.greenBright('success')} Generated ${logInfo ? `${logInfo} to` : ''} ${outFile}`
  );

  return prettiered;
}
