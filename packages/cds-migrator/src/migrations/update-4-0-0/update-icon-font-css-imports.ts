import { Tree } from '@nrwl/devkit';

import {
  logStartTask,
  parseSourceFiles,
  TransformFnType,
  updateImportPath,
} from '../../helpers/index';

const OLD_IMPORT = '@cbhq/cds-web/styles/icon-font.css';
const NEW_IMPORT = '@cbhq/cds-icons/fonts/web/icon-font.css';

function updateIconImportPaths({ path }: TransformFnType) {
  updateImportPath({ filePath: path, oldImport: OLD_IMPORT, newImport: NEW_IMPORT });
}

export default async function updateIconImports(tree: Tree) {
  logStartTask(`Updating icon-font.css usages`);

  await parseSourceFiles(tree, updateIconImportPaths);
}
