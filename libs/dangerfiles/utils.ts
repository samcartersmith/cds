/* eslint-disable import/no-extraneous-dependencies */
import { GitMatchResult, MatchResult, TextDiff } from 'danger';
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
    throw new Error(`Unable to get file contents for ${filePath} on master branch`);
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

// eslint-disable-next-line no-restricted-globals
export const MONOREPO_ROOT = process.env.PROJECT_CWD ?? process.env.NX_MONOREPO_ROOT ?? '';

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
