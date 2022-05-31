import { ComponentDoc, withCustomConfig } from 'react-docgen-typescript';
import fs from 'fs';
import startCase from 'lodash/startCase';
import path from 'path';
import { mapValues, pascalCase } from '@cbhq/cds-utils/index';

import { buildTemplates } from '../utils/buildTemplates';

import { ComponentDocgen } from './ComponentDocgen';
import { CDS_DIR, CDS_SUB_DIRS, CDS_SUB_DIRS_MAP, DOCS_DIR, TSCONFIG_PATH } from './constants';
import {
  ComponentDocgenParams,
  ComponentDocgenResponse,
  DocgenData,
  GetSubDirFilesResponse,
  Platform,
  SubDir,
} from './types';
import { updateTextStylesTable } from './updateTextStylesTable';
import {
  getComponentName,
  getDisplayName,
  getFileName,
  getKebabName,
  getSubDirFiles,
} from './utils';

export const parseTypescript = (filepath: string) => {
  return withCustomConfig(TSCONFIG_PATH, {
    savePropValueAsString: true,
    shouldExtractValuesFromUnion: true,
    shouldExtractLiteralValuesFromEnum: true,
    shouldRemoveUndefinedFromOptional: true,
  }).parse(path.resolve(CDS_DIR, filepath));
};

const getDocgenForPlatform = (platform: Platform) =>
  mapValues(CDS_SUB_DIRS_MAP, (subDir) => parseTypescript(`${platform}/${subDir}/index.ts`));

const lookupDocgen =
  (docgenData: DocgenData, subDir: SubDir) =>
  (prev: ComponentDocgenResponse[], next: ComponentDocgenParams) => {
    const findData = (data: ComponentDoc[], name: string) =>
      data.find((item) => item.displayName === name);
    const web = findData(docgenData.web[subDir], next.componentName);
    const mobile = findData(docgenData.mobile[subDir], next.componentName);
    if (web || mobile) {
      // Temporary hack to ensure deprecated card doesn't overwrite new card.
      if (subDir === 'layout' && next.componentName === 'Card') {
        return prev;
      }
      const data = new ComponentDocgen({
        web,
        mobile,
        ...next,
      });
      return [...prev, { ...next, data }];
    }
    return prev;
  };

const prepareDocgen =
  (docgenData: DocgenData) =>
  (prev: ComponentDocgenResponse[], { subDir, files }: GetSubDirFilesResponse) => {
    const transformArray = (filePath: string) => ({
      subDir,
      filePath,
      importPath: `${subDir}/${getFileName(filePath)}`,
      componentName: getComponentName(filePath),
      displayName: getDisplayName(filePath),
      id: getKebabName(filePath),
      slug: `/components/${getKebabName(filePath)}`,
    });
    return [...prev, ...files.map(transformArray).reduce(lookupDocgen(docgenData, subDir), [])];
  };

const prepareTemplate =
  (template: 'props' | 'component') =>
  ({ subDir, displayName, data }: ComponentDocgenResponse) => {
    const kebabCaseName = getKebabName(displayName);
    const [, sourceFileWithExt] = data.docgen.filePath.split(subDir);
    const sourceFile = path.join(subDir, sourceFileWithExt).replace(/\.(ts|tsx)$/, '');
    const fileName = template === 'component' ? kebabCaseName : '_implementation';

    const destDir = `${DOCS_DIR}/${subDir}/${displayName}`;
    const absoluteDir = path.join(__dirname, '../..', destDir);
    const dest = `${destDir}/${fileName}.mdx`;
    if (template === 'component') {
      const hasIntro = fs.existsSync(`${absoluteDir}/_intro.mdx`);
      const hasA11y = fs.existsSync(`${absoluteDir}/_a11y.mdx`);
      const hasDesign = fs.existsSync(`${absoluteDir}/_design.mdx`);
      const hasImplementation = fs.existsSync(`${absoluteDir}/_implementation.mdx`);
      const hasUsage = fs.existsSync(`${absoluteDir}/_usage.mdx`);
      return {
        dest,
        data: {
          ...data,
          sourceFile,
          title: startCase(data.displayName),
          displayName: data.displayName,
          slug: data.slug,
          importPath: data.importPath,
          sourceUrl: data.sourceUrl,
          hasIntro,
          hasA11y,
          hasDesign,
          hasImplementation,
          hasUsage,
          pascalCase,
        },
      };
    }
    return { dest, data };
  };

// This is a list of mobile only directories
const mobileOnlyIncludes: string[] = ['mobile/overlays/Drawer', 'mobile/overlays/Tray'];

async function buildWebsite() {
  const subDirFiles = await Promise.all(
    CDS_SUB_DIRS.map(getSubDirFiles('web', undefined, mobileOnlyIncludes)),
  );

  const allDocgenData = subDirFiles.reduce(
    prepareDocgen({
      web: getDocgenForPlatform('web'),
      mobile: getDocgenForPlatform('mobile'),
    }),
    [],
  );

  /*
   removes duplicates by id.
   This only currently happens if you have a mobile only component that has a corresponding web version that has not been exported yet
   */
  const ids = new Set<string>();
  const components = [];
  for (const item of allDocgenData) {
    const { id } = item;
    if (!ids.has(id)) {
      ids.add(item.id);
      components.push(item);
    }
  }

  const componentTemplate = components.map(prepareTemplate('component'));
  const implementationTemplate = components.map(prepareTemplate('props'));

  await buildTemplates({
    'website/component.ejs': componentTemplate,
    'website/implementation.ejs': implementationTemplate,
    'objectMap.ejs': [
      // TODO: figure out another way to generate master list
      // {
      //   dest: '../apps/website/data/componentsList.ts',
      //   data: { components: components.map((item) => item.displayName) },
      // },
    ],
  });
  await updateTextStylesTable();
}

void buildWebsite();
