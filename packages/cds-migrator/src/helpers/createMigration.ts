import { Tree } from '@nrwl/devkit';
import fs from 'node:fs';
import { SourceFile } from 'ts-morph';

import { CdsPackages } from './checkHasCdsPackage';
import parseSourceFiles, { TransformFnType } from './parseSourceFiles';

export type CreateMigrationParams = TransformFnType & {
  sourceFile: SourceFile;
};

/**
 * Helper script that makes it easy to write new cds-migrator scripts
 * Parses projects that have CDS packages as dependencies
 * @tree - The NX Tree
 * @param callback - he function that will be called for each sourceFile. Passes through the NX tree, path, project instance, and ts-morph sourceFile
 * @param filterSourceFiles - Prevents unnecessary parsing of sourceFiles that don't meet a conditional
 * @example check if sourceFile path or content includes 'foo' and gates the callback to only fire if true
 * @param packageNames - Checks if a project has specific CDS package(s) as a dependency
 */
export const createMigration = async ({
  tree,
  callback,
  filterSourceFiles,
  packageNames,
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
}) => {
  const createSourceFile = (args: TransformFnType) => {
    const sourceContent = fs.readFileSync(args.path, 'utf-8');
    // we want to always overwrite this to ensure if there are multiple scripts updating a single file the subsequent scripts will have the latest changes
    const sourceFile = args.project.createSourceFile(args.path, sourceContent, {
      overwrite: true,
    });
    callback({ ...args, sourceFile });
  };

  const parseSourceFile = (args: TransformFnType) => createSourceFile(args);
  await parseSourceFiles(tree, parseSourceFile, filterSourceFiles, packageNames);
};
