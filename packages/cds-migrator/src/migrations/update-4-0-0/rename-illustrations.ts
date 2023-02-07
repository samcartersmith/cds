import { createRenameScript } from '../../helpers/createRenameScript';

import { illustrationRenames } from './data/illustrationRenames';

function oldImportCheck(str: string) {
  return ['web', 'mobile'].some((platform) => str.includes(`@cbhq/cds-${platform}/illustrations`));
}

export default createRenameScript({
  renameMap: illustrationRenames,
  packageNameToLog: `@cbhq/cds-illustrations`,
  oldImportCheck,
});
