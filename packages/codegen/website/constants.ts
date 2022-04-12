import path from 'path';
import { arrayToObject } from '@cbhq/cds-utils/array';

export const CDS_DIR = path.resolve(__dirname, '../..');
export const TSCONFIG_PATH = path.resolve(__dirname, '../', 'tsconfig.json');
export const DOCS_DIR = '../apps/website/docs/components';

/**
 * All CDS subdirectories to search for components.
 */
export const CDS_SUB_DIRS = [
  'accordion',
  'animation',
  'buttons',
  'cards',
  'cells',
  'collapsible',
  'controls',
  'dots',
  'icons',
  'illustrations',
  'layout',
  'loaders',
  'media',
  'navigation',
  'overlays',
  'system',
  'tables',
  'tabs',
  'typography',
  'visualizations',
] as const;

export const CDS_SUB_DIRS_MAP = arrayToObject(CDS_SUB_DIRS);

/**
 * Ignore auto generating the components in the list below
 */
export const filesToIgnore = [
  'CheckboxGroup',
  'createText',
  'LogoMark',
  'LogoWordmark',
  'Badge',
  'Overlay',
  'Paddle',
  'Spacer',
  'Divider',
];

/**
 * Use the displayNameMap for any components that you want to rename when displayed on website.
 * For typography components they all have the same API, and we only want to show the docs for one of them.
 * Since we don't want to expose a `Text` component - we use this displayNameMap to rename one of them
 */
export const displayNameMap = { TextBody: 'Text' };
