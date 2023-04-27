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

import { iconRenames } from './data/iconRenames';

function oldImportCheck(str: string) {
  return ['web', 'mobile'].some((platform) => str.includes(`@cbhq/cds-${platform}/icons`));
}

const renamedIcons = Object.keys(Object.values(iconRenames).map((val) => val.valueMap));

const filterSourceFiles = (path: string) => {
  const sourceContent = fs.readFileSync(path, 'utf-8');
  if (oldImportCheck(sourceContent) || fileIncludesRenamedValue(sourceContent, renamedIcons)) {
    return true;
  }
  return false;
};

function callback(args: ParseJsxElementsCbParams) {
  const { tree, jsx, sourceFile } = args;
  const { component, actualComponentName } = getComponentFromJsx({
    jsx,
    componentNames: Object.keys(iconRenames),
  });
  let renameMap = iconRenames;
  if (actualComponentName) {
    renameMap = replaceKey({
      obj: iconRenames,
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
}

export default async function migrations(tree: Tree) {
  logNote('Migrating Icons');
  await createJsxMigration({
    tree,
    filterSourceFiles,
    callback,
  });
}
