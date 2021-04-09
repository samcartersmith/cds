import * as path from 'path';
import { PropItem, withCustomConfig } from 'react-docgen-typescript';

import { ComponentDocgen } from './ComponentDocgen';

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
  packageName?: string;
  childPath: string;
}) => {
  const webDocgen = getDocgen(path.join(packageName ?? 'web', childPath), componentName);
  const mobileDocgen = getDocgen(path.join(packageName ?? 'mobile', childPath), componentName);

  if (webDocgen && mobileDocgen) {
    return new ComponentDocgen(webDocgen, mobileDocgen, displayName ?? componentName);
  }
};

const prepareDocgens = (
  data: {
    dest: string;
    data: ComponentDocgen | undefined;
  }[]
) => {
  return (data.filter(item => item.data !== undefined) as unknown) as {
    dest: string;
    data: Record<string, unknown>;
  }[];
};

export const docs = prepareDocgens([
  {
    dest: `${WEBSITE_COMPONENT_DOCS_DIR}/box.mdx`,
    data: getDocgenForPackage({ componentName: 'Box', childPath: 'layout/Box.tsx' }),
  },
  {
    dest: `${WEBSITE_COMPONENT_DOCS_DIR}/button.mdx`,
    data: getDocgenForPackage({ componentName: 'Button', childPath: 'buttons/Button.tsx' }),
  },
  {
    dest: `${WEBSITE_COMPONENT_DOCS_DIR}/link-button.mdx`,
    data: getDocgenForPackage({ componentName: 'LinkButton', childPath: 'buttons/LinkButton.tsx' }),
  },
  {
    dest: `${WEBSITE_COMPONENT_DOCS_DIR}/checkbox.mdx`,
    data: getDocgenForPackage({ componentName: 'Checkbox', childPath: 'controls/Checkbox.tsx' }),
  },
  {
    dest: `${WEBSITE_COMPONENT_DOCS_DIR}/radio-group.mdx`,
    data: getDocgenForPackage({
      componentName: 'RadioGroup',
      childPath: 'controls/RadioGroup.tsx',
    }),
  },
  {
    dest: `${WEBSITE_COMPONENT_DOCS_DIR}/switch.mdx`,
    data: getDocgenForPackage({
      componentName: 'Switch',
      childPath: 'controls/Switch.tsx',
    }),
  },
  {
    dest: `${WEBSITE_COMPONENT_DOCS_DIR}/icon.mdx`,
    data: getDocgenForPackage({ componentName: 'Icon', childPath: 'icons/Icon.tsx' }),
  },
  {
    dest: `${WEBSITE_COMPONENT_DOCS_DIR}/icon-button.mdx`,
    data: getDocgenForPackage({
      componentName: 'IconButton',
      childPath: 'buttons/IconButton.tsx',
    }),
  },
  {
    dest: `${WEBSITE_COMPONENT_DOCS_DIR}/lottie.mdx`,
    data: getDocgenForPackage({ componentName: 'Lottie', childPath: 'animation/Lottie.tsx' }),
  },
  {
    dest: `${WEBSITE_COMPONENT_DOCS_DIR}/text.mdx`,
    data: getDocgenForPackage({
      componentName: 'TextDisplay1',
      childPath: 'typography/TextDisplay1.ts',
      displayName: 'Text',
    }),
  },
  {
    dest: `${WEBSITE_COMPONENT_DOCS_DIR}/theme-provider.mdx`,
    data: getDocgenForPackage({
      componentName: 'ThemeProvider',
      childPath: 'system/ThemeProvider.tsx',
    }),
  },
]);

export const docsSimple = prepareDocgens([
  {
    dest: `${WEBSITE_COMPONENT_DOCS_DIR}/hstack.mdx`,
    data: getDocgenForPackage({
      componentName: 'HStack',
      childPath: 'layout/HStack.tsx',
    }),
  },
  {
    dest: `${WEBSITE_COMPONENT_DOCS_DIR}/spacer.mdx`,
    data: getDocgenForPackage({
      componentName: 'Spacer',
      childPath: 'layout/Spacer.tsx',
    }),
  },
  {
    dest: `${WEBSITE_COMPONENT_DOCS_DIR}/vstack.mdx`,
    data: getDocgenForPackage({
      componentName: 'VStack',
      childPath: 'layout/VStack.tsx',
    }),
  },
]);
