import { exec } from 'child_process';
import * as path from 'path';
import { promisify } from 'util';

export const sh = promisify(exec);

export const getSourcePath = async (dest: string) => {
  //const { stdout: absoluteFilePath } = await sh(`readlink ${__filename}`);
  const absoluteFilePath = __filename;
  return path.join(absoluteFilePath, '../../..', dest);
};
