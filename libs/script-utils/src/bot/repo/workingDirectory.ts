import { existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';

export const ROOT_WORKING_DIRECTORY = path.resolve(process.cwd(), 'temp');

let workingDirectory = ROOT_WORKING_DIRECTORY;

export const setWorkingDirectory = (directoryPath = '') => {
  workingDirectory = path.resolve(ROOT_WORKING_DIRECTORY, directoryPath);
  if (!existsSync(workingDirectory)) mkdirSync(workingDirectory, { recursive: true });
};

export const resolveWorkingDirectoryPath = (directoryPath = '') =>
  path.resolve(workingDirectory, directoryPath);
