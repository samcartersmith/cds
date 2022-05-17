import path from 'path';
import type { PackageJson } from 'type-fest';

const cache: Record<string, PackageJson> = {};

export function getPackageJsonFromTsconfig(tsconfigPath: string) {
  if (cache[tsconfigPath]) {
    return cache[tsconfigPath];
  }
  const packageDirname = path.dirname(tsconfigPath);
  const packageJsonPath = path.resolve(packageDirname, 'package.json');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const packageJson: PackageJson = require(packageJsonPath);
  cache[tsconfigPath] = packageJson;
  return packageJson;
}
