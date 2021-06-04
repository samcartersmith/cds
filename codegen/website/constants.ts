import { arrayToObject } from '@cbhq/cds-utils';
import path from 'path';

import { SubDir } from './types';

export const CDS_DIR = path.resolve(__dirname, '../..');
export const TSCONFIG_PATH = path.resolve(__dirname, '../../../../../', 'tsconfig.json');
export const DOCS_DIR = 'website/docs/components';

/**
 * All CDS subdirectories to search for components.
 */
export const CDS_SUB_DIRS = [
  'animation',
  'buttons',
  'cells',
  'controls',
  'icons',
  'layout',
  // 'loaders', TODO: Remove MaterialLoader and CircularProgress. Update Spinner to only take allowed size prop.
  // 'navigation', TODO: add usage details and hide internal props
  'overlays',
  'typography',
  'system',
] as const;

export const CDS_SUB_DIRS_MAP = arrayToObject(CDS_SUB_DIRS);

/**
 * Ignore auto generating the components in the list below
 */
export const filesToIgnore = ['CheckboxGroup', 'createText', 'LogoMark', 'LogoWordmark', 'Badge'];

/**
 * Components you only want to use `intro.mdx` and `usage.mdx` templates for. Excludes design/implementation tabs, api table, etc.
 */
export const simpleDocs = ['Spacer', 'Divider', 'Badge'];

/**
 * Use the displayNameMap for any components that you want to rename when displayed on website.
 * For typography components they all have the same API, and we only want to show the docs for one of them.
 * Since we don't want to expose a `Text` component - we use this displayNameMap to rename one of them
 */
export const displayNameMap = { TextBody: 'Text' };

/**
 * Not necessary, but if you don't want a `v-stack.mdx` file you can use the kebabCaseMap to override.
 */
export const kebabCaseMap = { VStack: 'vstack', HStack: 'hstack' };

/**
 * Use the customDocsMap to add any mdx routes which are not auto generated.
 * The key value is the category it should be grouped in.
 * The second value is the path (relative to website folder) that the .mdx file is.
 * */
export const customDocsMap: Partial<Record<SubDir, string[]>> = {
  icons: ['components/icons/logo'],
};
