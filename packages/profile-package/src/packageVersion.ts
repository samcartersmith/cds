import fs from 'node:fs';
import path from 'node:path';

import { dirname } from './dirname';

const getPackageJsonPath = () => {
  let currentDir = dirname;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const packageJsonPath = path.join(currentDir, 'package.json');
    if (fs.existsSync(packageJsonPath)) return packageJsonPath;
    const parentDir = path.dirname(currentDir);
    // Stop searching if we have reached the root directory
    if (parentDir === currentDir) break;
    currentDir = parentDir;
  }
  throw Error('No package.json found');
};

const pkgFilepath = getPackageJsonPath();
const pkgContents = fs.readFileSync(pkgFilepath, 'utf8');
const pkg = JSON.parse(pkgContents) as { version?: string };
if (!pkg.version) throw Error('No version found in package.json');
export const packageVersion = pkg.version;
