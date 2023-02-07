import { createRenameScript } from '../../helpers/createRenameScript';

import { iconRenames } from './data/iconRenames';

function oldImportCheck(str: string) {
  return ['web', 'mobile'].some((platform) => str.includes(`@cbhq/cds-${platform}/icons`));
}

export default createRenameScript({
  renameMap: iconRenames,
  packageNameToLog: `@cbhq/cds-icons`,
  oldImportCheck,
});
