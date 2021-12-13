import { pascalCase, mapValues, AnyObject } from '@cbhq/cds-utils';
import glob from 'fast-glob';
import groupBy from 'lodash/groupBy';
import path from 'path';
import { ComponentDoc, withCustomConfig } from 'react-docgen-typescript';

import { buildTemplates } from '../utils/buildTemplates';
import { getSourcePath } from '../utils/getSourcePath';
import { ComponentDocgen } from './ComponentDocgen';
import {
  CDS_DIR,
  DOCS_DIR,
  TSCONFIG_PATH,
  CDS_SUB_DIRS,
  CDS_SUB_DIRS_MAP,
  customDocsMap,
} from './constants';
import {
  ComponentDocgenParams,
  ComponentDocgenResponse,
  DocgenData,
  FlattenTemplatesMapResponse,
  GetSubDirFilesResponse,
  Platform,
  SidebarCategory,
  SubDir,
} from './types';
import { updateTextStylesTable } from './updateTextStylesTable';
import {
  excludeSimpleFiles,
  includeSimpleFiles,
  getDisplayName,
  getComponentName,
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

const prepareSidebarConfig = (docgenData: ComponentDocgenResponse[]) => {
  const tuple = Object.entries(groupBy(docgenData, 'subDir'));
  const flatten = (
    prev: SidebarCategory[],
    [subDir, files]: [string, ComponentDocgenResponse[]],
  ) => {
    const formatFiles = ({ filePath }: ComponentDocgenResponse) => {
      const displayName = getDisplayName(filePath);
      return `components/${subDir}/${displayName}/${getKebabName(displayName)}`;
    };
    const customFiles = customDocsMap[subDir as SubDir] ?? [];
    const category: SidebarCategory = {
      type: 'category',
      label: pascalCase(subDir),
      collapsed: true,
      items: [...files.map(formatFiles), ...customFiles],
    };
    return [...prev, category];
  };
  return tuple.reduce(flatten, []);
};

const prepareTemplate =
  (template?: string) =>
  ({ subDir, displayName, data }: ComponentDocgenResponse) => {
    const kebabCaseName = getKebabName(displayName);
    const fileName = template ?? kebabCaseName;
    const dest = `${DOCS_DIR}/${subDir}/${displayName}/${fileName}.mdx`;
    return { dest, data };
  };

const getTemplates = async ({ subDir, displayName }: ComponentDocgenResponse) => {
  const subDirPath = await getSourcePath(`${DOCS_DIR}/${subDir}/${displayName}`);
  const files = await glob(`*.mdx`, { absolute: true, cwd: subDirPath, ignore: ['_*.mdx'] });
  return { displayName, subDir, files };
};

const flattenTemplatesMap = (
  prev: AnyObject,
  { displayName, subDir, files }: FlattenTemplatesMapResponse,
) => {
  const flattenMap = (prevMap: AnyObject, nextFile: string) => {
    const nameWithoutExt = getDisplayName(nextFile);
    const lookupRequire = `React.lazy(async () => import(/* webpackChunkName: "cds-component-template", webpackPrefetch: true */ "../docs/components/${subDir}/${displayName}/${nameWithoutExt}.mdx"))`;
    return Object.assign(prevMap, { [nameWithoutExt]: lookupRequire });
  };
  const data = files.reduce(flattenMap, {});
  return { ...prev, [displayName]: data };
};

// This is a list of mobile only directories
const mobileOnlyIncludes: string[] = ['mobile/visualizations/chart'];

async function buildWebsite() {
  const subDirFiles = await Promise.all(
    CDS_SUB_DIRS.map(getSubDirFiles('web', undefined, mobileOnlyIncludes)),
  );

  const docgenData = subDirFiles.reduce(
    prepareDocgen({
      web: getDocgenForPlatform('web'),
      mobile: getDocgenForPlatform('mobile'),
    }),
    [],
  );

  const components = docgenData.filter(excludeSimpleFiles);
  const componentTemplate = components.map(prepareTemplate());
  const implementationTemplate = components.map(prepareTemplate('implementation'));

  const simpleComponents = docgenData.filter(includeSimpleFiles);
  const simpleComponentsTemplate = simpleComponents.map(prepareTemplate());

  await buildTemplates({
    'website/component.ejs': componentTemplate,
    'website/implementationSimple.ejs': simpleComponentsTemplate,
    'website/implementation.ejs': implementationTemplate,
    'objectMap.ejs': [
      {
        dest: 'website/data/sidebar/components.js',
        data: {
          components: prepareSidebarConfig(docgenData),
        },
        config: { commonJS: true },
      },
      // Currently copied and pasted into our Completed Components tab of Roadmap Google Sheet (go/cds-roadmap).
      {
        dest: 'website/data/componentsList.ts',
        data: { components: docgenData.map((item) => item.displayName) },
      },
    ],
  });

  // Lookup all the .mdx file for a component and export a mapping of ComponentName <> path of component's .mdx file.
  const templates = await Promise.all(docgenData.map(getTemplates));
  await buildTemplates({
    'website/templatesMap.ejs': [
      {
        dest: 'website/data/templatesMap.ts',
        data: templates.reduce(flattenTemplatesMap, {}),
        config: { disableStringify: true },
      },
    ],
  });
  await updateTextStylesTable();
}

void buildWebsite();
