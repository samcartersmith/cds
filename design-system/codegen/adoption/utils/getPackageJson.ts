import path from 'path';
import fs from 'fs';

export type PackageJson = {
  dependencies: Record<string, string>;
};

export async function getPackageJson(rootDir: string, reverse?: boolean): Promise<PackageJson> {
  try {
    const packageJsonPath = path.join(rootDir, reverse ? '..' : '', 'package.json');
    const fileContents = await fs.promises.readFile(packageJsonPath, 'utf8');
    return JSON.parse(fileContents) as PackageJson;
  } catch (err) {
    if (err instanceof Error) {
      return getPackageJson(rootDir, true);
    }

    throw err;
  }
}
