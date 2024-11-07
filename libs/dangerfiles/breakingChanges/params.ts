import {
  getExportedDeclarations,
  getFileContentsOnMaster,
  getParamsFromExportedDeclaration,
} from '../utils';

import { CheckFnParams } from './checkForBreakingChanges';

type FnWithParams = { name: string; params: string[] };

export default async function checkFilesForRemovedParams({
  project,
  warningMessage,
}: CheckFnParams) {
  project.getSourceFiles().forEach(async (sourceFile) => {
    const modifiedFunctions = new Map<string, FnWithParams>();
    const originalFunctions = new Map<string, FnWithParams>();

    const exportedDeclarations = getExportedDeclarations({ sourceFile, includeTypes: true });

    exportedDeclarations.forEach((fn) => {
      const { name, params } = getParamsFromExportedDeclaration(fn);
      if (name && params) {
        modifiedFunctions.set(name, { name, params });
      }
    });

    const path = sourceFile.getFilePath();
    // remove the first / from the absolute path
    const diff = await getFileContentsOnMaster(path.replace('/', ''));

    // do the same thing for the previous version of the file
    if (diff) {
      project.createSourceFile(path, diff, { overwrite: true });
      const beforeSourceFile = project.getSourceFileOrThrow(path);

      const exportedDeclarationsBefore = getExportedDeclarations({
        sourceFile: beforeSourceFile,
        includeTypes: true,
      });

      exportedDeclarationsBefore.forEach((fn) => {
        const { name, params } = getParamsFromExportedDeclaration(fn);
        if (name && params) {
          originalFunctions.set(name, { name, params });
        }
      });
    }

    // check if any params were removed
    originalFunctions.forEach((originalFunction) => {
      const originalFunctionParams = originalFunctions.get(originalFunction.name)?.params;
      const modifiedFunctionParams = modifiedFunctions.get(originalFunction.name)?.params;

      if (!modifiedFunctionParams) {
        return;
      }

      originalFunctionParams?.forEach((originalParam) => {
        // check to see if the original function is in the modified functions
        if (!modifiedFunctionParams?.includes(originalParam)) {
          // @ts-expect-error danger methods are in global scope
          warn(
            [
              '## 💔 Breaking change detected',
              `The ${originalParam} parameter or prop was removed from ${originalFunction.name}, at ${path}`,
              warningMessage,
            ].join('\n'),
          );
        }
      });
    });
  });
}
