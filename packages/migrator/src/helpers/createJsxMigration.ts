import { Tree } from '@nx/devkit';
import { SourceFile } from 'ts-morph';

import parseJsxElements, { ParseJsxElementsCbParams } from './parseJsxElements';
import { parseSourceFiles } from './parseSourceFiles';
import { CreateMigrationParams, PackageName } from './types';

type CreateJsxMigrationParams = {
  /** The NX Tree */
  tree: Tree;
  /** The function that will be called for each JSX element. Passes through the NX tree, path, ts-morph sourceFile, and the JSX element */
  callback: (params: ParseJsxElementsCbParams) => void;
  /**
   * Prevents unnecessary parsing of sourceFiles that don't meet a conditional
   * @param path - the absolute path for the current sourceFile
   * @example check if sourceFile path or content includes 'foo' and gates the callback to only fire if true
   */
  filterSourceFiles?: (path: string) => boolean;
  /**
   * Checks a ts-morph `sourceFile` instance for condition and will gate callback to only fire if true
   * This is useful if you want to parse the JSX in as sourceFile, as filterSourceFiles only allows you to parse the string content of a file or path
   * @param sourceFile - the ts-morph sourceFile instance
   */
  checkSourceFile?: (sourceFile: SourceFile) => boolean;
  /** @param excludeOpeningElements - If true, will only parse self enclosed JSX elements */
  excludeOpeningElements?: boolean;
  /** Checks if a project has specific CDS package(s) as a dependency */
  packageNames?: PackageName[];
};

/**
 * Helper script that makes it easy to write new JSX migrations
 * Parses projects that have CDS packages as dependencies
 * @tree - The NX Tree
 * @param callback - The function that will be called for each JSX element. Passes through the NX tree and ts-morph sourceFile
 * @param filterSourceFiles - Prevents unnecessary parsing of sourceFiles that don't meet a conditional
 * @example check if sourceFile path or content includes 'foo' and gates the callback to only fire if true
 * @param checkSourceFile - Checks a ts-morph `sourceFile` instance for condition and will gate callback to only fire if true
 * This is useful if you want to parse the JSX in as sourceFile, as filterSourceFiles only allows you to parse the string content of a file or path
 * @param packageNames - Checks if a project has specific CDS package(s) as a dependency
 */
export async function createJsxMigration({
  tree,
  callback,
  filterSourceFiles,
  checkSourceFile,
  excludeOpeningElements,
  packageNames,
}: CreateJsxMigrationParams) {
  const parseSourceFile = (args: CreateMigrationParams) => {
    return parseJsxElements({
      ...args,
      callback,
      checkSourceFile,
      excludeOpeningElements,
    });
  };
  await parseSourceFiles(tree, parseSourceFile, filterSourceFiles, packageNames);
}
