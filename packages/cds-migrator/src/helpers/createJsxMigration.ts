import { Tree } from '@nrwl/devkit';

import parseJsxElements, { ParseJsxElementsCbParams } from './parseJsxElements';
import parseSourceFiles, { TransformFnType } from './parseSourceFiles';

type CreateJsxMigrationParams = {
  /** The NX Tree */
  tree: Tree;
  /** The function that will be called for each JSX element. Passes through the NX tree and ts-morph sourceFile */
  callback: (params: ParseJsxElementsCbParams) => void;
  /**
   * Checks `sourceFile` for condition and will gate callback to only fire if true
   * @param path - the absolute path for the current sourceFile
   */
  filterSourceFiles?: (path: string) => boolean;
};

/**
 * Helper script that makes it easy to write new JSX migrations
 * Parses projects that have CDS packages as dependencies
 * @param filterSourceFiles - Parses sourceFiles that meet a conditional
 * @example check if sourceFile path or content includes 'foo' and only parse if true
 * @param callback - The function that will be called for each JSX element. Passes through the NX tree and ts-morph sourceFile
 */
export async function createJsxMigration({
  tree,
  callback,
  filterSourceFiles,
}: CreateJsxMigrationParams) {
  const parseSourceFile = (args: TransformFnType) =>
    parseJsxElements({
      ...args,
      callback,
    });
  await parseSourceFiles(tree, parseSourceFile, filterSourceFiles);
}
