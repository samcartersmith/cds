import { Tree } from '@nrwl/devkit';
import fs from 'node:fs';
import { SourceFile } from 'ts-morph';

import parseSourceFiles, { TransformFnType } from './parseSourceFiles';

export type CreateMigrationParams = TransformFnType & {
  sourceFile: SourceFile;
};

export const createMigration = async ({
  tree,
  callback,
  filterSourceFiles,
}: {
  tree: Tree;
  callback: (args: CreateMigrationParams) => void;
  filterSourceFiles?: (path: string) => boolean;
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
  await parseSourceFiles(tree, parseSourceFile, filterSourceFiles);
};
