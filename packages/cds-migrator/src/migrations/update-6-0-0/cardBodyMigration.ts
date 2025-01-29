import { Tree } from '@nx/devkit';
import { SourceFile } from 'ts-morph';

import {
  addNewProp,
  checkFileIncludesImportedModule,
  createJsxMigration,
  getComponentFromJsx,
  logDebug,
  mobilePackage,
  ParseJsxElementsCbParams,
  saveChangesToFile,
  webPackage,
} from '../../helpers';

const paths = [`${mobilePackage}/cards`, `${webPackage}/cards`];

const checkSourceFile = (sourceFile: SourceFile): boolean => {
  let hasImport = false;
  paths.forEach((path) => {
    const checkHasImport = checkFileIncludesImportedModule({
      sourceFile,
      path,
      module: 'CardBody',
    });
    if (checkHasImport) {
      hasImport = true;
    }
  });
  return hasImport;
};

const callback = (args: ParseJsxElementsCbParams) => {
  const { jsx, sourceFile } = args;

  // find component
  const { component, actualComponentName } = getComponentFromJsx({
    jsx,
    componentNames: ['CardBody'],
  });
  if (actualComponentName ?? component !== 'CardBody') {
    return;
  }

  // check  if component has an orientation prop
  const hasOrientationProp = jsx.getAttribute('orientation');
  if (!hasOrientationProp) {
    addNewProp({
      jsx,
      attribute: 'mediaPlacement',
      value: 'above',
    });
    const successMessage = `CardBody component has been migrated successfully`;

    // path will get migrated in pathMigrations script
    saveChangesToFile(sourceFile, successMessage);
  }
};

export default async function migration(tree: Tree) {
  logDebug('Migrating CardBody components');
  await createJsxMigration({
    tree,
    callback,
    checkSourceFile,
  });
}
