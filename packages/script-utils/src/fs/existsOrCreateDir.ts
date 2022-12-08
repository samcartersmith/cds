import fs from 'node:fs';
import path from 'node:path';

const createdDirectories: Record<string, true> = {};

export async function existsOrCreateDir(filePath: string) {
  let exists = false;
  const { ext, dir } = path.parse(filePath);
  const isDir = !ext;
  const dirname = isDir ? filePath : dir;

  if (isDir) {
    /** Directory has already been created, so skip creating again */
    if (createdDirectories[dirname]) {
      exists = true;
      /** Directory does not exist, let's create it */
    } else if (fs.existsSync(dirname)) {
      exists = true;
    } else {
      await fs.promises.mkdir(dirname, { recursive: true });
      createdDirectories[dirname] = true;
    }
    /** File does not exist, let the initiator of this fn create it */
  } else if (fs.existsSync(filePath)) {
    exists = true;
  } else {
    await fs.promises.mkdir(dirname, { recursive: true });
  }

  return exists;
}
