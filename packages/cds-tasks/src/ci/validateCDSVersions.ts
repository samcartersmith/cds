import chalk from 'chalk';
import glob from 'fast-glob';
import fs from 'fs';
import path from 'path';

const MONOREPO_ROOT = process.env.PROJECT_CWD ?? process.env.NX_MONOREPO_ROOT;

async function getPkgVersion(pkgJsonPath: string) {
  const pkgPath = path.dirname(pkgJsonPath);
  const pkgName = path.basename(pkgPath);
  const pkg = JSON.parse(await fs.promises.readFile(pkgJsonPath, 'utf8')) as {
    version: string;
    name: string;
  };

  console.info(chalk.gray(`${pkgName} version is ${pkg.version}.`));

  return pkg.version;
}

async function validateCDSVersions() {
  const pkgJsonPaths = await glob(`packages/(web|mobile|common)/package.json`, {
    absolute: true,
    cwd: MONOREPO_ROOT,
    onlyFiles: true,
  });

  const versions = await Promise.all(
    pkgJsonPaths.map(async (pkgJsonPath) =>
      getPkgVersion(pkgJsonPath).catch((error) => {
        console.error(chalk.red(`FAIL: ${error}`));
        return '';
      }),
    ),
  );

  if (versions.length) {
    const versionsAligned = !versions.find((v) => versions[0] !== v);

    if (!versionsAligned) {
      throw new Error(
        chalk.red(
          `cds-web, cds-mobile, cds-common versions are not aligned. These versions need to be the same.`,
        ),
      );
    }

    console.info(chalk.green(`cds-web, cds-mobile, cds-common versions are aligned!`));
  } else {
    console.info(chalk.red(`No versions found.`));
  }
}

void validateCDSVersions();
