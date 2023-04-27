import { Tree } from '@nrwl/devkit';
import fs from 'node:fs';

import { updateJsxAttributeValue } from '../../helpers/componentMigrationHelpers/updateJsxAttributeValue';
import { createJsxMigration } from '../../helpers/createJsxMigration';
import { fileIncludesRenamedValue } from '../../helpers/fileIncludesRenamedValue';
import { findReplaceInFile } from '../../helpers/findReplaceInFile';
import { getComponentFromJsx } from '../../helpers/getComponentFromJsx';
import { logNote } from '../../helpers/loggingHelpers';
import { ParseJsxElementsCbParams } from '../../helpers/parseJsxElements';
import { replaceKey } from '../../helpers/replaceKey';
import { searchAndProcessComponent } from '../../helpers/searchAndProcessComponent';
import { writeMigrationToFile } from '../../helpers/writeMigrationToFile';

import { illustrationRenames } from './data/illustrationRenames';

function oldImportCheck(str: string) {
  return ['web', 'mobile'].some((platform) => str.includes(`@cbhq/cds-${platform}/illustrations`));
}

const renamedIllos = Object.keys(Object.values(illustrationRenames).map((val) => val.valueMap));

const filterSourceFiles = (path: string) => {
  const sourceContent = fs.readFileSync(path, 'utf-8');
  if (oldImportCheck(sourceContent) || fileIncludesRenamedValue(sourceContent, renamedIllos)) {
    return true;
  }
  return false;
};

const callback = (args: ParseJsxElementsCbParams) => {
  const { jsx, tree, sourceFile } = args;
  const { component, actualComponentName } = getComponentFromJsx({
    jsx,
    componentNames: Object.keys(illustrationRenames),
  });
  let renameMap = illustrationRenames;
  if (actualComponentName) {
    renameMap = replaceKey({
      obj: illustrationRenames,
      oldKey: component,
      newKey: actualComponentName,
    });
  }
  const updateMap = renameMap[actualComponentName ?? component];

  // gate for components that are not migratable
  let isMigratable = false;
  if (updateMap) {
    const migratableValues = Object.keys(updateMap.valueMap);
    const attributeToMigrate = updateMap.attribute;
    searchAndProcessComponent({
      jsx,
      componentName: component,
      callback: (propName, propValue) => {
        if (
          typeof propValue === 'string' &&
          attributeToMigrate.includes(propName) &&
          migratableValues.includes(propValue)
        ) {
          isMigratable = true;
        }
      },
    });
  }

  if (isMigratable) {
    const { oldValue, newValue } = updateJsxAttributeValue({
      attribute: updateMap.attribute,
      updateMap: updateMap.valueMap,
      jsx,
    });
    if (oldValue && newValue) {
      writeMigrationToFile({ oldValue, newValue, jsx, sourceFile, tree });
    } else {
      const path = sourceFile.getFilePath();
      // else manually find/replace the text in the file and save to file system
      findReplaceInFile({ renameMap: updateMap.valueMap, path, jsx });
    }
  }
};

export default async function migrations(tree: Tree) {
  logNote('Migrating Illustrations');
  await createJsxMigration({
    tree,
    filterSourceFiles,
    callback,
  });
}
