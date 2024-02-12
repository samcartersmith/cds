import { Tree } from '@nrwl/devkit';
import { SyntaxKind } from 'ts-morph';

import {
  checkFileIncludesImport,
  commonPackage,
  createMigration,
  CreateMigrationParams,
  logDebug,
  mobilePackage,
  saveChangesToFile,
} from '../../helpers';

import { hasFrontierFunctions } from './data/hasFrontierMigrations';

// mobile reexports palette from common
const oldPaths = [`${mobilePackage}/utils/palette`, `${commonPackage}/palette`];

const callback = (args: CreateMigrationParams) => {
  const { sourceFile } = args;

  if (!checkFileIncludesImport(sourceFile, oldPaths)) return;

  hasFrontierFunctions?.forEach((func) => {
    // Find all the function calls by name
    const calls = sourceFile.getDescendantsOfKind(SyntaxKind.CallExpression);

    calls.forEach((call) => {
      // Get the name of the function being called
      const callExpression = call.getFirstChildByKind(SyntaxKind.Identifier);

      // If the function name matches and has three or more arguments
      if (callExpression?.getText() === func && call.getArguments().length >= 3) {
        // Remove the third argument
        call.removeArgument(2); // Arguments are zero-indexed
        const successMessage = `Removed hasFrontier argument from ${func} function calls`;
        saveChangesToFile(sourceFile, successMessage);
      }
    });
  });
};

export default async function migration(tree: Tree) {
  logDebug('Migrating deprecated functions');
  await createMigration({
    tree,
    callback,
  });
}
