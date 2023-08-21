// eslint-disable-next-line import/no-extraneous-dependencies
import { SyntaxKind } from 'ts-morph';

import { getExportedDeclarations, getFileContentsOnMaster } from '../utils';

import { CheckFnParams } from './checkForBreakingChanges';

export default async function checkFilesForRemovedExports({
  project,
  warningMessage,
}: CheckFnParams) {
  project.getSourceFiles().forEach(async (sourceFile) => {
    const modifiedFunctions = new Set<string>();
    const originalFunctions = new Set<string>();

    const exportedFunctions = getExportedDeclarations({ sourceFile, includeTypes: true });

    exportedFunctions.forEach((fn) => {
      const fnName = fn.getFirstDescendantByKind(SyntaxKind.Identifier)?.getText();
      if (fnName) {
        modifiedFunctions.add(fnName);
      }
    });

    const path = sourceFile.getFilePath();
    // remove the first / from the absolute path
    const diff = await getFileContentsOnMaster(path.replace('/', ''));

    // do the same thing for the previous version of the file
    if (diff) {
      project.createSourceFile(path, diff, { overwrite: true });
      const beforeSourceFile = project.getSourceFileOrThrow(path);

      const exportedFunctionsBefore = getExportedDeclarations({
        sourceFile: beforeSourceFile,
        includeTypes: true,
      });
      exportedFunctionsBefore.forEach((fn) => {
        const fnName = fn.getFirstDescendantByKind(SyntaxKind.Identifier)?.getText();
        if (fnName) {
          originalFunctions.add(fnName);
        }
      });
    }

    // check if any exports were removed
    originalFunctions.forEach((originalFunction) => {
      // check to see if the original function is in the modified functions
      if (!modifiedFunctions.has(originalFunction)) {
        // @ts-expect-error danger methods are in global scope
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        warn(
          [
            '## 💔 Breaking change detected',
            `An export (${originalFunction}) was removed from ${path}`,
            warningMessage,
          ].join('\n'),
        );
      }
    });
  });
}
