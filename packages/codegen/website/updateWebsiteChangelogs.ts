import { argv } from 'yargs';

import { codegen } from '../codegen';

const PACKAGES = argv.packages as string;

async function updateWebsiteChangelogs() {
  const packagesArray = PACKAGES.split('|');

  await Promise.all(
    packagesArray.map(async (name) => codegen('website/package-release', { name })),
  );
}

void updateWebsiteChangelogs();
