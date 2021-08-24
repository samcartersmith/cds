import path from 'path';
import { TypescriptConfig } from './getTypescriptConfig';

function removeTrailingSlashAndWildcard(str: string) {
  return str.replace(/\/\*$/, '');
}

export function getTypescriptAliases(rootDir: string, tsconfig?: TypescriptConfig) {
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
