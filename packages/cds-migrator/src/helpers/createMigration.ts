import { Tree } from '@nrwl/devkit';

import { CdsPackages } from './checkHasCdsPackage';
import { parseSourceFiles } from './parseSourceFiles';
import { CreateMigrationParams } from './types';

/**
 * Helper script that makes it easy to write new cds-migrator scripts
 * Parses projects that have CDS packages as dependencies
 * @tree - The NX Tree
 * @param callback - the function that will be called for each sourceFile. Passes through the NX tree, path, project instance, and ts-morph sourceFile
 * @param filterSourceFiles - Prevents unnecessary parsing of sourceFiles that don't meet a conditional
 * @example check if sourceFile path or content includes 'foo' and gates the callback to only fire if true
 * @param packageNames - Checks if a project has specific CDS package(s) as a dependency
 */
export const createMigration = async ({
  tree,
  callback,
  filterSourceFiles,
  packageNames,
  onlyTestFiles,
}: {
  /** The NX tree */
  tree: Tree;
  /** The function that will be called for each sourceFile. Passes through the NX tree, path, project instance, and ts-morph sourceFile */
  callback: (args: CreateMigrationParams) => void;
  /**
   * Prevents unnecessary parsing of sourceFiles that don't meet a conditional
   * @param path - the absolute path for the current sourceFile
   * @example check if sourceFile path or content includes 'foo' and gates the callback to only fire if true
   */
  filterSourceFiles?: (path: string) => boolean;
  /** Checks if a project has specific CDS package(s) as a dependency */
  packageNames?: CdsPackages[];
  /** Only include test files */
  onlyTestFiles?: boolean;
}) => {
  await parseSourceFiles(tree, callback, filterSourceFiles, packageNames, onlyTestFiles);
};
