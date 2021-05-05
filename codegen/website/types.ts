import { ComponentDoc } from 'react-docgen-typescript';

import { ComponentDocgen } from './ComponentDocgen';
import { CDS_SUB_DIRS } from './constants';

export type Platform = 'web' | 'mobile';
export type SubDir = typeof CDS_SUB_DIRS[number];
export interface ComponentDocgenParams {
  filePath: string;
  importPath: string;
  componentName: string;
  displayName: string;
  subDir: SubDir;
  slug: string;
}

export interface ComponentDocgenResponse extends ComponentDocgenParams {
  data: ComponentDocgen;
}

export type GetSubDirFilesResponse = { subDir: SubDir; files: string[] };

export type SidebarCategory = {
  type: 'category';
  label: string;
  collapsed: boolean;
  items: string[] | SidebarCategory;
};

export type FilterFn = (value: string, index: number, array: string[]) => boolean;
export type DocgenDataForPlatform = Record<SubDir, ComponentDoc[]>;
export type DocgenData = { web: DocgenDataForPlatform; mobile: DocgenDataForPlatform };
export type FlattenTemplatesMapResponse = { displayName: string; subDir: SubDir; files: string[] };
