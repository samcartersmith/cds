import { ComponentDoc } from 'react-docgen-typescript';

import type { ComponentDocgen } from './ComponentDocgen';
import type { CDS_SUB_DIRS } from './constants';

export type Platform = 'web' | 'mobile';
export type SubDir = typeof CDS_SUB_DIRS[number];
export type ComponentDocgenParams = {
  filePath: string;
  importPath: string;
  componentName: string;
  displayName: string;
  subDir: SubDir;
  slug: string;
  id: string;
};

export type ComponentDocgenResponse = {
  data: ComponentDocgen;
} & ComponentDocgenParams;

export type GetSubDirFilesResponse = { subDir: SubDir; files: string[] };

export type FilterFn = (value: string, index: number, array: string[]) => boolean;
export type DocgenDataForPlatform = Record<SubDir, ComponentDoc[]>;
export type DocgenData = { web: DocgenDataForPlatform; mobile: DocgenDataForPlatform };
