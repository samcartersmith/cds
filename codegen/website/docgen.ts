import * as path from 'path';
import { PropItem, withCustomConfig } from 'react-docgen-typescript';

import { ComponentDocgen } from './ComponentDocgen';

type PackageName = 'theme' | 'icons';

const TSCONFIG_PATH = path.resolve(__dirname, '../../../../../', 'tsconfig.json');
const CDS_DIR = path.resolve(__dirname, '../..');
const WEBSITE_COMPONENT_DOCS_DIR = 'website/docs/components';

const parse = (fileName: string) => {
  return withCustomConfig(TSCONFIG_PATH, {
    savePropValueAsString: true,
    shouldExtractValuesFromUnion: true,
    shouldExtractLiteralValuesFromEnum: true,
    shouldRemoveUndefinedFromOptional: true,
    // Props need to be filtered since react-docgen shows all the props including
    // inherited native props or React built-in props.
    propFilter: (prop: PropItem) => {
      return !prop.parent?.fileName.includes('node_modules');
    },
  }).parse(path.resolve(CDS_DIR, fileName));
};

const getDocgen = (pathName: string, componentName: string) =>
  parse(pathName).find(item => item.displayName === componentName);

const getDocgenForPackage = ({
  componentName,
  displayName,
  packageName,
  childPath = '/index.ts',
}: {
  componentName: string;
  displayName?: string;
  packageName?: PackageName;
  childPath?: string;
}) => {
  const webDocgen = getDocgen(`${packageName ?? 'web'}${childPath}`, componentName);
  const mobileDocgen = getDocgen(`${packageName ?? 'mobile'}${childPath}`, componentName);

  if (webDocgen && mobileDocgen) {
    return new ComponentDocgen(webDocgen, mobileDocgen, displayName ?? componentName);
  }
};

export const docgen = ([
  {
    dest: `${WEBSITE_COMPONENT_DOCS_DIR}/lottie.mdx`,
    data: getDocgenForPackage({ componentName: 'Lottie', childPath: '/Lottie/Lottie.tsx' }),
  },
  {
    dest: `${WEBSITE_COMPONENT_DOCS_DIR}/text.mdx`,
    data: getDocgenForPackage({ componentName: 'TextDisplay1', displayName: 'Text' }),
  },
  {
    dest: `${WEBSITE_COMPONENT_DOCS_DIR}/box.mdx`,
    data: getDocgenForPackage({ componentName: 'Box' }),
  },
  {
    dest: `${WEBSITE_COMPONENT_DOCS_DIR}/button.mdx`,
    data: getDocgenForPackage({ componentName: 'Button' }),
  },
  {
    dest: `${WEBSITE_COMPONENT_DOCS_DIR}/icon-button.mdx`,
    data: getDocgenForPackage({ componentName: 'IconButton' }),
  },
  {
    dest: `${WEBSITE_COMPONENT_DOCS_DIR}/pin.mdx`,
    data: getDocgenForPackage({ componentName: 'Pin' }),
  },
  {
    dest: `${WEBSITE_COMPONENT_DOCS_DIR}/theme-provider.mdx`,
    data: getDocgenForPackage({ componentName: 'ThemeProvider', packageName: 'theme' }),
  },
  {
    dest: `${WEBSITE_COMPONENT_DOCS_DIR}/icon.mdx`,
    data: getDocgenForPackage({ componentName: 'Icon' }),
  },
].filter(item => item.data !== undefined) as unknown) as {
  dest: string;
  data: Record<string, unknown>;
}[];
