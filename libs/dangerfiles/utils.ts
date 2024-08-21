/* eslint-disable import/no-extraneous-dependencies */
import { GitMatchResult, MatchResult, TextDiff } from 'danger';
import * as semver from 'semver';
import simpleGit, { SimpleGit } from 'simple-git';
/* eslint-disable import/no-extraneous-dependencies */
import { ExportedDeclarations, SourceFile, SyntaxKind } from 'ts-morph';

type FindAssociatedFilesWithoutSuffixParams = {
  paths: string[];
  targetPaths: string[];
  suffix: string;
};

/**
 * Check if target paths include an associated file for each path in paths with a desired suffix
 * @example findAssociatedFileWithSuffix({paths: ['foo.tsx', 'bar.tsx'], targetPaths: ['foo.test.tsx', 'baz.test.tsx'], suffix: 'test'})
 * Would return ['bar.tsx'] because it is missing an associated test file
 * Similar to lodash _.difference https://lodash.com/docs/4.17.15#difference
 */
export const findAssociatedFilesWithoutSuffix = ({
  paths,
  targetPaths,
  suffix,
}: FindAssociatedFilesWithoutSuffixParams) =>
  paths.reduce((filesWithoutAssociatedSuffixedFile, file) => {
    const splitFile = file.split('.');
    const beginning = splitFile.slice(0, -1);
    const ending = splitFile.slice(-1)[0];
    const suffixedFile = [...beginning, suffix, ending].join('.');
    const altEnding = ending === 'tsx' ? 'ts' : 'tsx';
    const altSuffixedFile = [...beginning, 'test', altEnding].join('.');
    const associatedTestFile = targetPaths.find((_file) =>
      [suffixedFile, altSuffixedFile].includes(_file),
    );

    return associatedTestFile
      ? filesWithoutAssociatedSuffixedFile
      : [...filesWithoutAssociatedSuffixedFile, file];
  }, [] as string[]);

type Files = MatchResult<GitMatchResult>;

type FindPatternInFileParams = {
  files: Files;
  pattern: RegExp;
  /** You can't import the danger module outside of the dangerFile, so you have to pass it via props */
  diffFn: (filename: string) => Promise<TextDiff | null>;
};

export const getModifiedFiles = (files: Files): string[] =>
  Object.entries(files.getKeyedPaths())
    .filter(([type]) => type === 'modified')
    .map(([, path]) => path)
    .flat();

/**
 * Get created or modified files
 * `modified`, `created`, `edited` = (created + modified + `deleted`)
 */
export const getEditedFiles = (files: Files): string[] =>
  Object.entries(files.getKeyedPaths())
    .filter(([type]) => type !== 'edited')
    .map(([, path]) => path)
    .flat();

type Diff = { modified: string[]; created: string[]; deleted: string[] };

/**
 * Checks git diffs (modified, created, deleted) for a pattern
 */
export const findPatternInGitDiffs = async ({
  files,
  pattern,
  diffFn,
}: FindPatternInFileParams) => {
  const diffs = getEditedFiles(files);

  const diff: Diff = {
    modified: [],
    created: [],
    deleted: [],
  };

  // Iterate over each file, collect a diff and check for the pattern
  await Promise.all(
    diffs.map(async (file) => {
      const fileDiff = await diffFn(file);

      if (fileDiff?.added.match(pattern)) {
        diff.created.push(file);
      }

      if (fileDiff?.removed.match(pattern)) {
        diff.deleted.push(file);
      }

      if (fileDiff?.before.match(pattern)) {
        diff.modified.push(file);
      }
    }),
  );

  return diff;
};

/** @returns  an array of exported variables, functions, and optionally types from a sourceFile */
export const getExportedDeclarations = ({
  sourceFile,
  includeTypes = false,
}: {
  sourceFile: SourceFile;
  /** include exported type declarations */
  includeTypes?: boolean;
}): ExportedDeclarations[] => {
  const declarations: ExportedDeclarations[] = [];
  // get named exports that aren't types
  sourceFile.getExportedDeclarations().forEach((value) => {
    value.forEach((declaration) => {
      if (
        declaration.getKind() === SyntaxKind.VariableDeclaration ||
        declaration.getKind() === SyntaxKind.FunctionDeclaration
      ) {
        declarations.push(declaration);
      }
    });
    if (includeTypes) {
      value.forEach((declaration) => {
        if (declaration.getKind() === SyntaxKind.TypeAliasDeclaration) {
          declarations.push(declaration);
        }
      });
    }
  });
  return declarations;
};

const git: SimpleGit = simpleGit();

export async function getFileContentsOnMaster(filePath: string): Promise<string | null> {
  try {
    // Use "git show" to get the file content on the 'master' branch
    const showOutput = await git.show(`origin/master:${filePath}`);
    return showOutput;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Unable to get file contents for ${filePath} on master branch`);
    return null;
  }
}

export async function fetchOriginMaster() {
  try {
    await git.fetch(['origin', 'master']);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error while fetching origin/master:', error);
    throw error;
  }
}

export const MONOREPO_ROOT = process.env.PROJECT_CWD ?? process.env.NX_MONOREPO_ROOT;

export function getParamsFromExportedDeclaration(declaration: ExportedDeclarations) {
  const name =
    declaration.getKind() === SyntaxKind.TypeAliasDeclaration
      ? declaration.getFirstDescendantByKind(SyntaxKind.Identifier)?.getText()
      : declaration.getFirstDescendantByKind(SyntaxKind.Identifier)?.getText();
  const params: string[] = [];
  declaration.getDescendantsOfKind(SyntaxKind.Parameter).forEach((param) => {
    const props = param.getDescendantsOfKind(SyntaxKind.Identifier);
    // if param is a destructured object, get the keys
    if (props) {
      params.push(...props.map((prop) => prop.getText()));
    } else {
      params.push(param.getName());
    }
  });
  return {
    name,
    params,
  };
}

/**
 * Escapes special characters in a string for use in a regular expression.
 *
 * @param {string} string - The string to be escaped.
 * @returns {string} The escaped string.
 */
export function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Checks if a given dependency version is valid.
 * A valid version is defined as one that is not undefined and does not start with 'workspace:'.
 *
 * @param {string | undefined} version - The version string to check.
 * @returns {boolean} - Returns true if the version is valid, false otherwise.
 */
export function isValidDependencyVersion(version: string | undefined): boolean {
  return version !== undefined && !version.startsWith('workspace:');
}

/**
 * Checks if the major version of a dependency has changed.
 *
 * @param {string} beforeVersion - The version of the dependency before the change.
 * @param {string} afterVersion - The version of the dependency after the change.
 * @returns {boolean} - Returns true if the major version has changed, false otherwise.
 */
export function hasMajorVersionChanged(
  dependencyName: string,
  beforeVersion: string,
  afterVersion: string,
): boolean {
  const beforeSemVer = semver.coerce(beforeVersion);
  const afterSemVer = semver.coerce(afterVersion);

  if (!beforeSemVer || !afterSemVer)
    throw new Error(
      `Invalid version string for dependency ${dependencyName}: before="${beforeVersion}", after="${afterVersion}"`,
    );

  const beforeMajorVersion = semver.major(beforeSemVer);
  const afterMajorVersion = semver.major(afterSemVer);

  return beforeMajorVersion !== afterMajorVersion;
}

/**
 * Filters modified dependencies by comparing before and after dependency versions.
 *
 * @param {Record<string, string>} beforeDependencies - The dependencies before the change.
 * @param {Record<string, string>} afterDependencies - The dependencies after the change.
 * @returns {string[]} - The list of modified dependency names.
 */
export function filterModifiedMajorDependencies(
  beforeDependencies: Record<string, string>,
  afterDependencies: Record<string, string>,
): string[] {
  return Object.keys(beforeDependencies).filter((dependencyName) => {
    const beforeVersion = beforeDependencies[dependencyName];
    const afterVersion = afterDependencies[dependencyName];

    // Ignore dependencies that are not defined or start with 'workspace:'
    if (!isValidDependencyVersion(beforeVersion) || !isValidDependencyVersion(afterVersion)) {
      return false;
    }

    return hasMajorVersionChanged(dependencyName, beforeVersion, afterVersion);
  });
}
