import chalk from 'chalk';
import glob from 'fast-glob';
import fs from 'fs';
import path from 'path';

const MONOREPO_ROOT = process.env.PROJECT_CWD ?? process.env.NX_MONOREPO_ROOT;

function getPkgName(pkgJsonPath: string) {
  const pkgPath = path.dirname(pkgJsonPath);
  return path.basename(pkgPath);
}

async function getPkgVersion(pkgJsonPath: string) {
  const pkgName = getPkgName(pkgJsonPath);
  const pkg = JSON.parse(await fs.promises.readFile(pkgJsonPath, 'utf8')) as {
    version: string;
    name: string;
  };

  console.info(chalk.gray(`${pkgName} version is ${pkg.version}.`));

  return pkg.version;
}

async function findPkgVersionInChangelog(changelogPath: string, version: string) {
  const changelog = await fs.promises.readFile(changelogPath, 'utf8');

  return changelog.includes(version);
}

async function generateVersionMap(pkgJsonPaths: string[]) {
  const versionMap: Record<string, string> = {};
  await Promise.all(
    pkgJsonPaths.map(async (pkgJsonPath) => {
      const name = getPkgName(pkgJsonPath);
      const version = await getPkgVersion(pkgJsonPath).catch((error) => {
        console.error(chalk.red(`FAIL: ${error}`));
        return '';
      });

      versionMap[name] = version;
    }),
  );

  return versionMap;
}

async function validateWebsiteChangelogUpdates() {
  const pkgJsonPaths = await glob(
    `packages/(web|mobile|common|d3|fonts|icons|illustrations|lottie-files|ui-mobile-playground|utils)/package.json`,
    {
      absolute: true,
      cwd: MONOREPO_ROOT,
      onlyFiles: true,
    },
  );

  const versionMap = await generateVersionMap(pkgJsonPaths);

  if (Object.keys(versionMap).length) {
    Object.keys(versionMap).forEach(async (pkgName) => {
      // get website changelog
      const changelogGlob = await glob(`apps/website/docs/changelog/${pkgName}.mdx`, {
        absolute: true,
        cwd: MONOREPO_ROOT,
        onlyFiles: true,
      });

      // verify only one changelog has been returned
      if (changelogGlob.length === 1) {
        const changelogPath = changelogGlob[0];
        const pkgVersion = versionMap[pkgName];

        // check that the version number exists in the website changelog file
        const hasVersion = await findPkgVersionInChangelog(changelogPath, pkgVersion);

        if (hasVersion) {
          console.info(chalk.gray(`${pkgName} website changelog has been updated.`));
        } else {
          throw new Error(
            chalk.red(
              `Website changelog is out of date for ${pkgName}. Please run yarn release to update.`,
            ),
          );
        }
      } else {
        throw new Error(
          chalk.red(`Cannot correctly find website changelog for package ${pkgName}`),
        );
      }
    });

    console.info(chalk.green(`All website package changelogs are up to date.`));
  } else {
    console.info(chalk.red(`No versions found.`));
  }
}

void validateWebsiteChangelogUpdates();
