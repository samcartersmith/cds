import glob from 'fast-glob';
import fs from 'node:fs';
import path from 'node:path';

import { codegen } from '../codegen';

const MONOREPO_ROOT = process.env.PROJECT_CWD ?? process.env.NX_MONOREPO_ROOT;

// gets package name from file structure
function getPkgName(filePath: string) {
  const pkgPath = path.dirname(filePath);
  return path.basename(pkgPath);
}

async function updateWebsiteChangelogs() {
  const pkgJsonPaths = await glob(`packages/*/package.json`, {
    absolute: true,
    cwd: MONOREPO_ROOT,
    onlyFiles: true,
  });

  const packagesArray = await Promise.all(
    pkgJsonPaths.map(async (pkgJsonPath) => {
      const pkg = JSON.parse(await fs.promises.readFile(pkgJsonPath, 'utf8')) as {
        private: boolean;
      };

      if (!pkg.private) {
        return getPkgName(pkgJsonPath);
      }
      return '';
    }),
  );

  await Promise.all(
    packagesArray
      .filter((pkgName) => pkgName !== '')
      .map(async (name) => codegen('website/package-release', { name })),
  );
}

void updateWebsiteChangelogs();
