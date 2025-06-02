import { getChangedFiles } from './getChangedFiles';
import { getCurrentCIBranch } from './getCurrentCIBranch';
import { getPublishableProjects } from './getPublishableProjects';
import { LogParam, logInfo as logInfoBase, logSuccess } from './logging';

// WARNING: This list is not comprehensive and may be missing configuration files
const BUMP_REGEX =
  /\/(android|assets|ios|src|templates|package\.json|linaria\.config\.js|babel\.config\.js)/;

// NOTE: project.json technically may have changes to the build artifacts, but unrelated configuration changes are more common
const IGNORE_CHANGED_FILES_REGEX =
  /^((CHANGELOG|README|MIGRATION|CONTRIBUTING)(\.md)?|[^/]+\.yml|OWNERS|project\.json|[^/]+\.[dD]ockerfile|tsconfig\.json|jest\.config\.js|\.?eslint.*)$/;

const TEST_REGEX = /\.(spec|test)\.[jt]sx?(\.snap)?$/;

type PackageVersionCheckOptions = {
  projectsWithNoSrcFolder: string[];
  exclude: string[];
  onlyPublishable: boolean;
  changedFiles?: string[];
};

export async function getAffectedPackages(options: Partial<PackageVersionCheckOptions> = {}) {
  if (getCurrentCIBranch() === 'master') {
    return {};
  }

  const projectsWithNoSrcFolder: string[] = options.projectsWithNoSrcFolder ?? [];
  const excludedProjects: string[] = options.exclude ?? [];

  const [changedFiles, projects] = await Promise.all([
    options.changedFiles ?? getChangedFiles(false),
    getPublishableProjects(),
  ]);

  // Filter projects down to only those that have changed:
  return Object.fromEntries(
    Object.entries(projects).filter(([project, projectConfig]) => {
      // Ignore excluded projects
      if (excludedProjects.includes(project)) {
        return false;
      }

      return changedFiles.some((file) => {
        // Ignore unrelated code changes and test files
        if (!file.startsWith(`${projectConfig.data.root}/`) || TEST_REGEX.test(file)) {
          return false;
        }

        // Specific list of patterns to check
        if (BUMP_REGEX.test(file)) {
          return true;
        }

        // If the package has no src/ folder, filter out non-src code changes
        if (projectsWithNoSrcFolder.includes(project)) {
          const relativeFilePath = file.substr(projectConfig.data.root.length + 1);
          if (!IGNORE_CHANGED_FILES_REGEX.test(relativeFilePath)) {
            return true;
          }
        }
        return false;
      });
    }),
  );
}

export async function projectsNeedingVersion(
  logInfo: typeof logInfoBase,
  options: Partial<PackageVersionCheckOptions> = {},
) {
  if (getCurrentCIBranch() === 'master') {
    logInfo('Skipping version check on master branch');
    return [];
  }

  logInfo('Checking for packages that need versioning');

  const changedFiles = await getChangedFiles(false);
  const changedPackages = await getAffectedPackages({
    ...options,
    onlyPublishable: true,
    changedFiles,
  });

  if (Object.keys(changedPackages).length === 0) {
    logSuccess('No changes within packages');
    return [];
  }

  const unversionedPackages = Object.keys(changedPackages).filter((projectName) => {
    const changelogPath = `${changedPackages[projectName].data.root}/CHANGELOG.md`;
    // Already bumped!
    return !changedFiles.includes(changelogPath);
  });

  if (unversionedPackages.length > 0) {
    logInfo(
      `Found ${
        unversionedPackages.length
      } package(s) that need versioning: ${unversionedPackages.join(', ')}`,
    );
  }

  return unversionedPackages;
}
