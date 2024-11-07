import chalk from 'chalk';
import glob from 'fast-glob';
import fs from 'node:fs';
import path from 'node:path';

type PkgData = {
  version: string;
  private?: boolean;
};

const MONOREPO_ROOT = process.env.PROJECT_CWD ?? process.env.NX_MONOREPO_ROOT;

if (!MONOREPO_ROOT) throw Error('MONOREPO_ROOT is undefined');

// gets package name from file structure
function getPkgName(filePath: string) {
  const pkgPath = path.dirname(filePath);
  return path.basename(pkgPath);
}

// gets pkg version from package.json
async function getPkgData(pkgJsonPath: string): Promise<PkgData> {
  const pkgName = getPkgName(pkgJsonPath);
  const pkg = JSON.parse(await fs.promises.readFile(pkgJsonPath, 'utf8')) as {
    version: string;
    name: string;
    private: boolean;
  };

  console.info(chalk.gray(`${pkgName} version is ${pkg.version}.`));

  return {
    version: pkg.version,
    private: pkg.private,
  };
}

// Return content in a file as a string
async function getFileContent(filePath: string) {
  return fs.promises.readFile(filePath, 'utf8');
}

/*
 Confirms that latest pkg version is in the website changelog.
*/
async function findPkgVersionInChangelog(changelogPath: string, version: string) {
  const changelogContent = await getFileContent(changelogPath);

  return changelogContent.includes(version);
}

/*
Maps pkgName: {pkgVersion, isPublished}
*/
async function generateVersionMap(pkgJsonPaths: string[]) {
  const versionMap: Record<string, PkgData | undefined> = {};
  await Promise.all(
    pkgJsonPaths.map(async (pkgJsonPath) => {
      const name = getPkgName(pkgJsonPath);
      const pkgData = await getPkgData(pkgJsonPath).catch((error) => {
        console.error(chalk.red(`FAIL: ${error}`));
        return undefined;
      });

      versionMap[name] = pkgData;
    }),
  );

  return versionMap;
}

/*
Maps pkgName: changelog/file/path.md
*/
async function generateChangelogMap(changelogPaths: string[]) {
  const changelogMap: Record<string, string> = {};
  await Promise.all(
    changelogPaths.map(async (changelogPath) => {
      const name = getPkgName(changelogPath);
      changelogMap[name] = changelogPath;
    }),
  );

  return changelogMap;
}

/* 
Confirms that the website changelog and CHANGELOG.md files are in sync
*/
async function compareChangelogContent(
  websiteChangelogFilePath: string,
  changelogFilePath: string,
) {
  const websiteContent = await getFileContent(websiteChangelogFilePath);
  const changelogContent = await getFileContent(changelogFilePath);

  return websiteContent.includes(changelogContent);
}

async function validateWebsiteChangelogUpdates() {
  const pkgJsonPaths = await glob(`packages/*/package.json`, {
    absolute: true,
    cwd: MONOREPO_ROOT,
    onlyFiles: true,
  });

  const changelogPaths = await glob(`packages/*/CHANGELOG.md`, {
    absolute: true,
    cwd: MONOREPO_ROOT,
    onlyFiles: true,
  });

  const versionMap = await generateVersionMap(pkgJsonPaths);
  const changelogMap = await generateChangelogMap(changelogPaths);

  if (Object.keys(versionMap).length) {
    await Promise.all(
      Object.keys(versionMap).map(async (pkgName) => {
        // verify that the package is not private
        if (versionMap[pkgName]?.private) {
          return;
        }

        // get website changelog
        const changelogGlob = await glob(`apps/website/docs/changelog/${pkgName}.mdx`, {
          absolute: true,
          cwd: MONOREPO_ROOT,
          onlyFiles: true,
        });

        // verify only one changelog has been returned
        if (changelogGlob.length === 1) {
          const websiteChangelogPath = changelogGlob[0];
          const pkgVersion = versionMap[pkgName]?.version;
          const changelogFilePath = changelogMap[pkgName];

          // check that the version number exists in the website changelog file
          const hasVersion = await findPkgVersionInChangelog(
            websiteChangelogPath,
            pkgVersion ?? '',
          );
          const inSyncWithCHANGELOG = await compareChangelogContent(
            websiteChangelogPath,
            changelogFilePath,
          );

          if (hasVersion) {
            if (inSyncWithCHANGELOG) {
              console.info(chalk.gray(`${pkgName} website changelog has been updated.`));
            } else {
              throw new Error(
                chalk.red(
                  `Website changelog is out of sync for ${pkgName} and does not match its CHANGELOG.md file. Please run yarn release to update.`,
                ),
              );
            }
          } else {
            throw new Error(
              chalk.red(
                `Website changelog does not have the latest package version for ${pkgName}. Please run yarn release to update.`,
              ),
            );
          }
        } else {
          throw new Error(
            chalk.red(`Cannot correctly find website changelog for package ${pkgName}`),
          );
        }
      }),
    );

    console.info(chalk.green(`All website package changelogs are up to date.`));
  } else {
    console.info(chalk.red(`No versions found.`));
  }
}

void validateWebsiteChangelogUpdates();
