import chalk from 'chalk';
import fs from 'fs';
// eslint-disable-next-line import/no-extraneous-dependencies
import prettier from 'prettier';

export async function writePrettyFile({
  outFile,
  contents,
  parser,
  logInfo,
}: {
  outFile: string;
  contents: string;
  parser?: prettier.BuiltInParserName;
  logInfo?: string | boolean;
}): Promise<string> {
  const prettierOptions = await prettier.resolveConfig('@cbhq/eslint-plugin/prettierConfig.json');
  const prettiered = prettier.format(contents, {
    ...prettierOptions,
    parser: parser ?? 'typescript',
  });

  await fs.promises.writeFile(outFile, prettiered, { encoding: 'utf8', flag: 'w' });

  if (logInfo !== false) {
    // eslint-disable-next-line no-console
    console.info(
      `${chalk.greenBright('success')} Wrote ${logInfo ? ` ${logInfo} to` : ''} ${outFile}`,
    );
  }

  return prettiered;
}
