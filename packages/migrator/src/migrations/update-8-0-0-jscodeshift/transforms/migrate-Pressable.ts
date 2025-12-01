/**
 * Codemod to add alignItems and justifyContent props to Pressable components. This is not required for all Pressable components.
 *
 * Example transformations:
 * Before:
 * ```
 * <Pressable>
 *   Text
 * </Pressable>
 * <PressableOpacity>
 *   Text
 * </PressableOpacity>
 * ```
 *
 * After:
 * ```
 * <Pressable alignItems="center" justifyContent="center">
 *   Text
 * </Pressable>
 * <PressableOpacity alignItems="center" justifyContent="center">
 *   Text
 * </PressableOpacity>
 * ```
 */

import type {
  API,
  ASTPath,
  Collection,
  FileInfo,
  ImportDeclaration,
  JSXAttribute,
  JSXElement,
  Options,
  VariableDeclarator,
} from 'jscodeshift';

import { DEFAULT_PRINT_OPTIONS } from '../constants';

const CDS_PACKAGES = ['@cbhq/cds-web'];
const PRESSABLE_COMPONENT_NAME = 'Pressable';
const PRESSABLE_OPACITY_COMPONENT_NAME = 'PressableOpacity';

type ComponentReferences = {
  relevantTagNames: Set<string>;
  componentNamespaceNames: Set<string>;
};

function findComponentReferences(
  jsc: API['jscodeshift'],
  rootCol: Collection<unknown>,
  cdsPkgs: string[],
  targetName: string,
): ComponentReferences {
  const importedNames = new Set<string>();
  const namespaceNames = new Set<string>();

  rootCol
    .find(jsc.ImportDeclaration)
    .filter((path: ASTPath<ImportDeclaration>) => {
      const source = path.node.source.value;
      return typeof source === 'string' && cdsPkgs.some((pkg) => source.startsWith(pkg));
    })
    .forEach((path: ASTPath<ImportDeclaration>) => {
      path.node.specifiers?.forEach((spec) => {
        if (spec.type === 'ImportSpecifier' && spec.imported.type === 'Identifier') {
          if (spec.imported.name === targetName) {
            const localName =
              spec.local && spec.local.type === 'Identifier' ? spec.local.name : spec.imported.name;
            importedNames.add(localName);
          }
        } else if (spec.type === 'ImportNamespaceSpecifier' && spec.local) {
          namespaceNames.add(spec.local.name as string);
        }
      });
    });

  const variableNames = new Set<string>();
  rootCol.find(jsc.VariableDeclarator).forEach((path: ASTPath<VariableDeclarator>) => {
    const varId = path.node.id;
    if (varId.type !== 'Identifier') return;
    const varName = varId.name;
    const init = path.node.init;
    if (!init) return;

    let isTargetAssigned = false;
    if (init.type === 'Identifier' && importedNames.has(init.name)) {
      isTargetAssigned = true;
    } else if (init.type === 'ConditionalExpression') {
      const { consequent, alternate } = init;
      if (
        (consequent.type === 'Identifier' && importedNames.has(consequent.name)) ||
        (alternate.type === 'Identifier' && importedNames.has(alternate.name))
      ) {
        isTargetAssigned = true;
      }
    } else if (init.type === 'MemberExpression') {
      if (
        init.object.type === 'Identifier' &&
        namespaceNames.has(init.object.name) &&
        init.property.type === 'Identifier' &&
        init.property.name === targetName
      ) {
        isTargetAssigned = true;
      }
    }

    if (isTargetAssigned) {
      variableNames.add(varName);
    }
  });

  return {
    relevantTagNames: new Set<string>([...importedNames, ...variableNames]),
    componentNamespaceNames: namespaceNames,
  };
}

export default function transformer(file: FileInfo, api: API, options: Options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions || DEFAULT_PRINT_OPTIONS;
  let modified = false;

  const hasCDSImport = root
    .find(j.ImportDeclaration)
    .some((path: ASTPath<ImportDeclaration>) =>
      CDS_PACKAGES.some(
        (pkg) =>
          typeof path.value.source.value === 'string' && path.value.source.value.startsWith(pkg),
      ),
    );

  if (!hasCDSImport) {
    return file.source;
  }

  const pressableRefs = findComponentReferences(j, root, CDS_PACKAGES, PRESSABLE_COMPONENT_NAME);
  const pressableOpacityRefs = findComponentReferences(
    j,
    root,
    CDS_PACKAGES,
    PRESSABLE_OPACITY_COMPONENT_NAME,
  );

  const allRelevantTagNames = new Set<string>([
    ...pressableRefs.relevantTagNames,
    ...pressableOpacityRefs.relevantTagNames,
  ]);
  const allNamespaceNames = new Set<string>([
    ...pressableRefs.componentNamespaceNames,
    ...pressableOpacityRefs.componentNamespaceNames,
  ]);

  root
    .find(j.JSXElement)
    .filter((path: ASTPath<JSXElement>) => {
      const openingElement = path.node.openingElement;
      if (openingElement.name.type === 'JSXIdentifier') {
        const componentName = openingElement.name.name;
        return allRelevantTagNames.has(componentName);
      }

      if (openingElement.name.type === 'JSXMemberExpression') {
        const object = openingElement.name.object;
        const property = openingElement.name.property;
        if (
          object.type === 'JSXIdentifier' &&
          allNamespaceNames.has(object.name as string) &&
          property.type === 'JSXIdentifier' &&
          (property.name === PRESSABLE_COMPONENT_NAME ||
            property.name === PRESSABLE_OPACITY_COMPONENT_NAME)
        ) {
          return true;
        }
      }

      return false;
    })
    .forEach((path: ASTPath<JSXElement>) => {
      const openingElement = path.node.openingElement;
      const attributes = openingElement.attributes ?? (openingElement.attributes = []);

      let hasAlignItems = false;
      let hasJustifyContent = false;

      attributes.forEach((attr) => {
        if (attr.type === 'JSXAttribute' && attr.name.type === 'JSXIdentifier') {
          if (attr.name.name === 'alignItems') {
            hasAlignItems = true;
          }
          if (attr.name.name === 'justifyContent') {
            hasJustifyContent = true;
          }
        }
      });

      if (!hasAlignItems) {
        const alignItemsProp: JSXAttribute = j.jsxAttribute(
          j.jsxIdentifier('alignItems'),
          j.stringLiteral('center'),
        );
        attributes.push(alignItemsProp);
        modified = true;
      }

      if (!hasJustifyContent) {
        const justifyContentProp: JSXAttribute = j.jsxAttribute(
          j.jsxIdentifier('justifyContent'),
          j.stringLiteral('center'),
        );
        attributes.push(justifyContentProp);
        modified = true;
      }
    });

  return modified ? root.toSource(printOptions) : file.source;
}

export const parser = 'tsx';
export const extensions = ['ts', 'tsx'];
