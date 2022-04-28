import { withCustomConfig } from 'react-docgen-typescript';
import type { ParentType, PropItem as _PropItem } from 'react-docgen-typescript/lib/parser';
import flattenDeep from 'lodash/flattenDeep';
import path from 'path';

export const rootDir = __dirname.includes('dist')
  ? path.join(__dirname, '../../../..')
  : path.join(__dirname, '../../..');

export type DocgenFileConfig = {
  packageName: string;
  sourceFile: string;
  tsconfigPath: string;
};

export type DocgenParseConfig = {
  parentTypes?: string[];
  propsToForceIncludeIfPresent?: string[];
  aliasesToExtractValuesFor?: string[];
};

type CustomDocgenTag = keyof typeof regexes;

type PropItem = Omit<_PropItem, 'type' | 'defaultValue'> & {
  type: {
    name: string;
    raw?: 'boolean' | 'string' | string;
    value: {
      value: string;
      description?: string;
      fullComment?: string;
      tags?: Record<string, string>;
    }[];
  };
  defaultValue: null | { value: string };
};

export type ParsedProp = {
  name: string;
  required: boolean;
  options: string;
  description: string;
  defaultValue?: string;
  dangerous?: string;
  deprecated?: string;
  internal?: string;
  tags?: PropItem['tags'];
  parent?: string;
};

export type ParsedDoc = {
  name: string;
  description: string;
  props: ParsedProp[];
  extends?: Record<string, string[]>;
  packageName?: string;
};

export type AliasTypes = Record<string, string>;
export type ParentTypes = Record<string, Record<string, ParsedProp>>;

const regexes = {
  internal: /@internal([^\\\n]*)/,
  danger: /@danger([^\\\n]*)/,
  link: /@link([^\\\n]*)/,
  deprecated: /@deprecated([^\\\n]*)/,
  experimental: /@experimental([^\\\n]*)/,
  removeQuotes: /['"]+/g,
};

/**
 * A mapping of props to it's basic info including parent type name.
 * We use kebab-case separator with starting value of parent type to ensure
 * props with same name don't override one another.
 * i.e. 'HTMLAttributes-contentEditable' -> { description: '', options: [], parent: HTMLAttributes }
 */
export const parentTypesMap: Map<string, ParsedProp> = new Map();
export const aliasTypesMap: Map<string, unknown> = new Map();

function removeQuotes(content: string) {
  return content.replace(regexes.removeQuotes, '');
}

function extractDocgen(description: string, regex: CustomDocgenTag) {
  const match = description.match(regexes[regex]);
  return match ? match[1].trim() : undefined;
}

function formatOptions(options: PropItem['type']['value']) {
  const flattenedOptions = options.map((item) => item.value);
  if (flattenedOptions.includes('0')) {
    return flattenedOptions
      .map((item) => Number(item))
      .sort((first, second) => first - second)
      .join(' | ');
  }
  return flattenedOptions
    .filter((item) => item !== 'undefined')
    .map((item) => (typeof item === 'string' ? removeQuotes(item) : `${item}`))
    .sort()
    .join(' | ');
}

function normalizeOptions(
  item: PropItem['type'],
  { aliasesToExtractValuesFor = [] }: DocgenParseConfig,
) {
  /**
   * raw - SpacingScale, IconSize, PaletteForeground etc
   * value - [ { value: 0 }, { value: 1 }]
   */
  const { value, raw: typeAliasOrType = '' } = item;

  if (aliasesToExtractValuesFor.includes(typeAliasOrType)) {
    const formattedValue = formatOptions(value);
    aliasTypesMap.set(typeAliasOrType, formattedValue);
    return typeAliasOrType;
  }
  if (typeAliasOrType === 'boolean' || typeAliasOrType === 'string') {
    return typeAliasOrType;
  }

  if (typeAliasOrType.includes('|')) {
    return removeQuotes(typeAliasOrType);
  }

  if (typeAliasOrType.includes('<any>')) {
    return typeAliasOrType.replace('<any>', '');
  }

  if (typeAliasOrType.includes('Ref')) {
    return typeAliasOrType;
  }

  if (Array.isArray(value) && value.length === 1) {
    return value[0].value;
  }

  return value ? formatOptions(value) : '';
}

function normalizeDescription(description: string) {
  let contentCopy = description;
  for (const regex of Object.values(regexes)) {
    contentCopy = contentCopy.replace(regex, '');
  }
  return contentCopy.replace(/\n/g, ' ').replace(/`/g, '');
}

/**
 * Filter out declarations that are from node_modules or CDS types
 * i.e. HTMLAttributes, AriaAttributes, DOMAttributes, ButtonBaseProps.
 *
 * A prop can extend declarations from multiple types, but we only return a single one.
 * In the rare case a prop extends multiple types, we favor the CDS version first.
 *
 */
function parseDeclarations(
  declarations: ParentType[],
  { name, dangerous, defaultValue, description, options, required }: ParsedProp,
) {
  /**
   * Add info for the prop. Create unique ID by combining it's parent name + prop name.
   */
  function saveToCacheAndReturn(declaration: string) {
    parentTypesMap.set(`${declaration}-${name}`, {
      dangerous,
      defaultValue,
      description,
      name,
      options,
      parent: declaration,
      required,
    });
    return declaration;
  }

  for (const item of declarations) {
    const isCds = item.fileName.startsWith('packages/');
    if (item.name === 'TypeLiteral') {
      if (isCds) {
        const declaration = path.basename(item.fileName, path.extname(item.fileName));
        return saveToCacheAndReturn(declaration);
      }
      if (item.fileName.includes('node_modules')) {
        const [declaration] = item.fileName.replace('cds/node_modules/', '').split('/');
        return saveToCacheAndReturn(declaration);
      }
    } else {
      return saveToCacheAndReturn(item.name);
    }
  }
  return undefined;
}

function formatProp(
  {
    defaultValue: defaultValueProp,
    description: descriptionProp,
    type,
    parent,
    declarations = [],
    name,
    required,
    tags,
  }: PropItem,
  parseConfig: DocgenParseConfig,
): ParsedProp {
  const dangerous = extractDocgen(descriptionProp, 'danger');
  const description = normalizeDescription(descriptionProp);
  const defaultValue = defaultValueProp ? String(defaultValueProp?.value) : undefined;
  const options = normalizeOptions(type, parseConfig);
  const declaration = parseDeclarations(declarations, {
    dangerous,
    description,
    defaultValue,
    options,
    required,
    name,
  });

  return {
    name,
    required,
    tags,
    defaultValue,
    description,
    options,
    dangerous,
    parent: declaration ?? parent?.name,
  };
}

/** React docgen integration */
export function parseTypescript({ sourceFile, tsconfigPath }: DocgenFileConfig) {
  let filePath = sourceFile;
  let tsconfigFilePath = tsconfigPath;
  if (!path.isAbsolute(filePath)) {
    filePath = path.join(rootDir, sourceFile);
  }
  if (!path.isAbsolute(tsconfigFilePath)) {
    tsconfigFilePath = path.join(rootDir, tsconfigPath);
  }

  return withCustomConfig(tsconfigFilePath, {
    savePropValueAsString: true,
    shouldExtractValuesFromUnion: true,
    shouldExtractLiteralValuesFromEnum: true,
    shouldRemoveUndefinedFromOptional: true,
  }).parse(filePath);
}

export function docgenParser(params: DocgenFileConfig, parseConfig: DocgenParseConfig) {
  const { propsToForceIncludeIfPresent = [], parentTypes = [] } = parseConfig;
  const docsMap: Record<string, ParsedDoc> = {};

  const docs = parseTypescript(params);
  flattenDeep(docs).forEach((doc) => {
    const props: ParsedProp[] = [];
    const extendsMap: ParsedDoc['extends'] = {};
    Object.values(doc.props).forEach((prop) => {
      const formattedProp = formatProp(prop as PropItem, parseConfig);
      const { parent = '' } = formattedProp;
      if (parentTypes.includes(parent) && !propsToForceIncludeIfPresent.includes(prop.name)) {
        if (!extendsMap[parent]) {
          extendsMap[parent] = [];
        }
        extendsMap[parent].push(prop.name);
      } else {
        props.push(formattedProp);
      }
    });

    docsMap[doc.displayName] = {
      name: doc.displayName,
      description: normalizeDescription(doc.description),
      props,
      extends: extendsMap,
      packageName: params.packageName,
    };
  });
  return Object.values(docsMap);
}
