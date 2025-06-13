/**
 * Codemod to add specified attributes to Text components from
 * @cbhq/cds-mobile and @cbhq/cds-web.
 *
 * Example: If we want to add `renderEmptyNode="false"`:
 * Before:
 * import { TextBody } from '@cbhq/cds-mobile/typography/TextBody';
 * <TextBody>Hello</TextBody>
 *
 * After:
 * import { TextBody } from '@cbhq/cds-mobile/typography/TextBody';
 * <TextBody renderEmptyNode="false">Hello</TextBody>
 */
import {
  API,
  ASTPath,
  FileInfo,
  ImportDeclaration,
  ImportDefaultSpecifier,
  ImportNamespaceSpecifier,
  ImportSpecifier,
  JSXAttribute,
  JSXElement,
  Options,
} from 'jscodeshift';

const textComponents = [
  'TextBody',
  'TextCaption',
  'TextDisplay1',
  'TextDisplay2',
  'TextDisplay3',
  'TextHeadline',
  'TextInherited',
  'TextLabel1',
  'TextLabel2',
  'TextLegal',
  'TextTitle1',
  'TextTitle2',
  'TextTitle3',
  'TextTitle4',
  'InputLabel',
] as const;
const CDS_PACKAGES = ['@cbhq/cds-web', '@cbhq/cds-mobile'];

const ATTRIBUTES_TO_ADD: Record<string, any> = {
  renderEmptyNode: false,
};

export default function transformer(file: FileInfo, api: API, options: Options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  let modified = false;

  // Check if the file has a CDS import
  const hasCDSImport = root
    .find(j.ImportDeclaration)
    .some((path: ASTPath<ImportDeclaration>) =>
      CDS_PACKAGES.some(
        (pkg) =>
          typeof path.value.source.value === 'string' && path.value.source.value.startsWith(pkg),
      ),
    );

  if (!hasCDSImport) {
    // If no CDS imports are found, return the original source unchanged
    // This avoids the re-parsing/re-printing formatting changes.
    return file.source;
  }

  const relevantLocalComponentNames = new Set<string>();
  const componentNamespaceNames = new Set<string>();

  root
    .find(j.ImportDeclaration)
    .filter((path: ASTPath<ImportDeclaration>) => {
      const source = path.node.source.value;
      return typeof source === 'string' && CDS_PACKAGES.some((pkg) => source.startsWith(pkg));
    })
    .forEach((path: ASTPath<ImportDeclaration>) => {
      if (!path.node.specifiers) return;
      path.node.specifiers.forEach(
        (spec: ImportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier) => {
          if (spec.type === 'ImportSpecifier') {
            // Only add if the *imported* name is in textComponents
            const importedName =
              typeof spec.imported.name === 'string'
                ? spec.imported.name
                : (spec.imported.name as any).name;

            if (textComponents.includes(importedName as (typeof textComponents)[number])) {
              const localName = spec.local
                ? typeof spec.local.name === 'string'
                  ? spec.local.name
                  : (spec.local.name as any).name
                : importedName;
              relevantLocalComponentNames.add(localName);
            }
          } else if (
            spec.type === 'ImportDefaultSpecifier' &&
            spec.local &&
            spec.local.type === 'Identifier'
          ) {
            relevantLocalComponentNames.add(spec.local.name);
          } else if (
            spec.type === 'ImportNamespaceSpecifier' &&
            spec.local &&
            spec.local.type === 'Identifier'
          ) {
            componentNamespaceNames.add(spec.local.name);
          }
        },
      );
    });

  // If no relevant named components (matching textComponents) AND no CDS namespaces are imported, exit.
  if (relevantLocalComponentNames.size === 0 && componentNamespaceNames.size === 0) {
    return file.source;
  }

  root
    .find(j.JSXElement)
    .filter((path: ASTPath<JSXElement>) => {
      const openingElement = path.node.openingElement;
      if (openingElement.name.type === 'JSXIdentifier') {
        // Check if the local name of the component is one we've identified as relevant
        return relevantLocalComponentNames.has(openingElement.name.name);
      } else if (openingElement.name.type === 'JSXMemberExpression') {
        const object = openingElement.name.object;
        const property = openingElement.name.property;
        // Check if it's via a known CDS namespace and the member is a target textComponent
        if (object.type === 'JSXIdentifier' && componentNamespaceNames.has(object.name)) {
          return (
            property.type === 'JSXIdentifier' &&
            textComponents.includes(property.name as (typeof textComponents)[number])
          );
        }
      }
      return false;
    })
    .forEach((path: ASTPath<JSXElement>) => {
      const { openingElement } = path.node;
      let elementModified = false;

      Object.entries(ATTRIBUTES_TO_ADD).forEach(([attrName, attrValue]) => {
        const attributeExists = openingElement.attributes?.some(
          (attr: JSXAttribute | any) => attr.type === 'JSXAttribute' && attr.name.name === attrName,
        );

        if (!attributeExists) {
          const newAttribute = j.jsxAttribute(
            j.jsxIdentifier(attrName),
            typeof attrValue === 'string'
              ? j.literal(attrValue)
              : typeof attrValue === 'boolean'
              ? attrValue
                ? null // For true boolean attribute (e.g., <Component disabled />)
                : j.jsxExpressionContainer(j.booleanLiteral(false)) // For false (e.g., <Component disabled={false} />)
              : typeof attrValue === 'number'
              ? j.jsxExpressionContainer(j.numericLiteral(attrValue))
              : j.jsxExpressionContainer(j.identifier(String(attrValue))),
          );

          if (!openingElement.attributes) {
            openingElement.attributes = [];
          }
          openingElement.attributes.push(newAttribute);
          elementModified = true;
        }
      });

      if (elementModified) {
        modified = true;
      }
    });

  return modified ? root.toSource() : file.source;
}

export const parser = 'tsx';
export const extensions = ['ts', 'tsx'];
