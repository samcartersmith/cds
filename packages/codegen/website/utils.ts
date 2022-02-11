import glob from 'fast-glob';
import path from 'path';
import { kebabCase } from '@cbhq/cds-utils';

import { getSourcePath } from '../utils/getSourcePath';

import { displayNameMap, filesToIgnore, kebabCaseMap, simpleDocs } from './constants';
import { ComponentDocgenResponse, SubDir } from './types';

export const getFileName = (filePath: string) => path.basename(filePath);
export const getComponentName = (filePath: string) =>
  path.basename(filePath, path.extname(filePath));
export const getDisplayName = (filePath: string) => {
  const name = getComponentName(filePath);
  if (name in displayNameMap) return displayNameMap[name as keyof typeof displayNameMap];
  return name;
};
export const getKebabName = (filePath: string) => {
  const name = getDisplayName(filePath);
  if (name in kebabCaseMap) return kebabCaseMap[name as keyof typeof kebabCaseMap];
  return kebabCase(name);
};

export const excludeIgnored = (filePath: string) =>
  !filesToIgnore.includes(getDisplayName(filePath));
export const includeSimpleFiles = ({ filePath }: ComponentDocgenResponse) =>
  simpleDocs.includes(getDisplayName(filePath));
export const excludeSimpleFiles = (res: ComponentDocgenResponse) => !includeSimpleFiles(res);

export const getSubDirFiles =
  (startPath: string | undefined = 'web', extension = '.tsx', fullPaths?: string[]) =>
  async (subDir: SubDir) => {
    const subDirPath = await getSourcePath(`${startPath}/${subDir}`);
    const fullFilePaths: string[] = fullPaths
      ? await Promise.all(fullPaths.map(async (fullPath: string) => getSourcePath(fullPath)))
      : [];

    const allPaths: string[] = [subDirPath, ...fullFilePaths];

    const files: string[][] = await Promise.all(
      allPaths.map(async (filePath: string) =>
        glob(`**/*${extension}`, { absolute: true, cwd: filePath }),
      ),
    );
    return { subDir, files: files.flat().filter(excludeIgnored) };
  };

export const sortNames = (prev: string, next: string) => prev.localeCompare(next);
