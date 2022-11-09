import fs from 'node:fs';

import { adoptionDocsDir, tempDir } from '../config';

export async function preGenerateCleanup() {
  const removeDirPromises = [];

  if (fs.existsSync(tempDir)) {
    removeDirPromises.push(fs.promises.rm(tempDir, { recursive: true }));
  }

  if (fs.existsSync(adoptionDocsDir)) {
    removeDirPromises.push(fs.promises.rm(adoptionDocsDir, { recursive: true }));
  }

  // Clear directories so we don't keep around any data we want to remove
  return Promise.all(removeDirPromises);
}
