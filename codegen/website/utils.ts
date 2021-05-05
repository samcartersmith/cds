import { kebabCase } from '@cbhq/cds-utils';
import glob from 'fast-glob';
import path from 'path';

import { getSourcePath } from '../utils/getSourcePath';
import { displayNameMap, filesToIgnore, kebabCaseMap, simpleDocs } from './constants';
import { SubDir, ComponentDocgenResponse } from './types';

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

export const getSubDirFiles = (startPath: string | undefined = 'web', extension = '.tsx') => async (
  subDir: SubDir
) => {
  const subDirPath = await getSourcePath(`${startPath}/${subDir}`);
  const files = await glob(`*${extension}`, { absolute: true, cwd: subDirPath });
  return { subDir, files: files.filter(excludeIgnored) };
};

export const sortNames = (prev: string, next: string) => prev.localeCompare(next);
