import fs from 'node:fs';
import path from 'node:path';
import { existsOrCreateDir } from '@cbhq/script-utils';

import { getImagePath, GetImagePathParams } from './getImagePath';

export type WriteImageParams = GetImagePathParams & {
  writeFile: (filePath: string) => Promise<void>;
};

export async function writeVersionedFile({ writeFile, ...params }: WriteImageParams) {
  const { oldFilePath, newFilePath } = getImagePath(params);
  const exists = fs.existsSync(oldFilePath);
  if (exists) {
    /** Write over old path with new content */
    await writeFile(oldFilePath);
    /** Rename old path to new path which has version incremented version */
    fs.renameSync(oldFilePath, newFilePath);

    console.log(`Updated ${path.basename(oldFilePath)} to ${newFilePath}`);
  } else {
    await existsOrCreateDir(newFilePath);
    await writeFile(newFilePath);
    console.log(`Created ${path.basename(newFilePath)} at ${newFilePath}`);
  }
  return newFilePath;
}
