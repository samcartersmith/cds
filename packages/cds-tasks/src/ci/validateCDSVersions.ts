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

async function getChangelogVersion(changelogPath: string) {
  const changelogContent = fs.readFileSync(changelogPath, 'utf8');
  const versionHeaderRegex = /##\s+(\d+\.\d+\.\d+(?:-rc\.\d*)?)\b/;
  const versionHeaderMatch = changelogContent.match(versionHeaderRegex);

  if (versionHeaderMatch) {
    const versionNumber = versionHeaderMatch[1];
    console.info(chalk.gray(`${changelogPath} latest version is ${versionNumber}.`));

    return versionNumber;
  }
  throw new Error(chalk.red(`Could not find any versions in ${changelogPath}`));
}

async function validateCDSVersions() {
  const pkgJsonPaths = await glob(`packages/(web|mobile|common)/package.json`, {
    absolute: true,
    cwd: MONOREPO_ROOT,
    onlyFiles: true,
  });

  const changelogPaths = await glob(`packages/(web|mobile|common)/CHANGELOG.md`, {
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

  const changelogVersions = await Promise.all(
    changelogPaths.map(async (changelogPath) =>
      getChangelogVersion(changelogPath).catch((error) => {
        console.error(chalk.red(`FAIL: ${error}`));
        return '';
      }),
    ),
  );

  if (versions.length && changelogVersions) {
    const combinedVersions = [...versions, ...changelogVersions];
    const versionsAligned = !combinedVersions.find((v) => combinedVersions[0] !== v);

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
