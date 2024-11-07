import path from 'node:path';
import { Except, TsConfigJson } from 'type-fest';

function removeTrailingSlashAndWildcard(str: string) {
  return str.replace(/\/\*$/, '');
}

export function getTypescriptAliases(rootDir: string, tsconfig?: Except<TsConfigJson, 'extends'>) {
  const absoluteAliases: Record<string, string> = {};
  const relativeAliases: Record<string, string> = {};
  if (tsconfig?.compilerOptions?.paths) {
    // Loop through path aliases and get path
    Object.entries(tsconfig.compilerOptions.paths).forEach(([tsConfigKey, [aliasPath]]) => {
      const key = removeTrailingSlashAndWildcard(tsConfigKey);
      const pathWithoutTrailingSlash = removeTrailingSlashAndWildcard(aliasPath);
      const value = path.join(rootDir, pathWithoutTrailingSlash);
      absoluteAliases[key] = value;
      relativeAliases[key] = pathWithoutTrailingSlash;
    });
  } else {
    absoluteAliases[rootDir] = rootDir;
  }
  return { absoluteAliases, relativeAliases };
}

export function getMatchingDirectory(
  aliases: Record<string, string>,
  pathStartingWithAlias: string,
) {
  if (aliases[pathStartingWithAlias]) {
    return aliases[pathStartingWithAlias];
  }

  for (const alias of Object.keys(aliases)) {
    if (pathStartingWithAlias.startsWith(alias)) {
      const relativePath = pathStartingWithAlias.replace(`${alias}/`, '');
      return path.join(aliases[alias], relativePath);
    }
  }

  return null;
}
