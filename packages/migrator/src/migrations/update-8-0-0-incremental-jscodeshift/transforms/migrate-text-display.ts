/**
 * Codemod to add a `display` attribute to Text components from
 * @cbhq/cds-web based on the `as` prop.
 *
 * If `as="li"`, it adds `display="list-item"`.
 * If `as="p"` or a heading (`h1`-`h6`), it adds `display="block"`.
 *
 * Example:
 * Before:
 * import { TextBody } from '@cbhq/cds-web/typography/TextBody';
 * <TextBody as="li">Hello</TextBody>
 * <TextBody as="p">World</TextBody>
 *
 * After:
 * import { TextBody } from '@cbhq/cds-web/typography/TextBody';
 * <TextBody as="li" display="list-item">Hello</TextBody>
 * <TextBody as="p" display="block">World</TextBody>
 */
import type {
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
const CDS_PACKAGES = ['@cbhq/cds-web'];

export default function transformer(file: FileInfo, api: API, options: Options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  let modified = false;

  // Get target component from options
  const targetComponent = options.component as string | undefined;

  // Validate target component if specified
  if (
    targetComponent &&
    !textComponents.includes(targetComponent as (typeof textComponents)[number])
  ) {
    // If component is specified but not in textComponents, skip transformation
    return file.source;
  }

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

              // Filter by target component if specified, otherwise include all text components
              const shouldInclude = targetComponent ? localName === targetComponent : true;

              if (shouldInclude) {
                relevantLocalComponentNames.add(localName);
              }
            }
          } else if (
            spec.type === 'ImportDefaultSpecifier' &&
            spec.local &&
            spec.local.type === 'Identifier'
          ) {
            const localName = spec.local.name;

            // Filter by target component if specified, otherwise include all text components
            const shouldInclude = targetComponent ? localName === targetComponent : true;

            if (shouldInclude) {
              relevantLocalComponentNames.add(localName);
            }
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

  // If target component is specified but not found in imports, skip transformation
  if (
    targetComponent &&
    relevantLocalComponentNames.size === 0 &&
    componentNamespaceNames.size === 0
  ) {
    return file.source;
  }

  if (relevantLocalComponentNames.size === 0 && componentNamespaceNames.size === 0) {
    return file.source;
  }

  root
    .find(j.JSXElement)
    .filter((path: ASTPath<JSXElement>) => {
      const openingElement = path.node.openingElement;
      if (openingElement.name.type === 'JSXIdentifier') {
        const componentName = openingElement.name.name;

        // Filter by target component if specified
        if (targetComponent) {
          return (
            componentName === targetComponent && relevantLocalComponentNames.has(componentName)
          );
        }

        return relevantLocalComponentNames.has(componentName);
      } else if (openingElement.name.type === 'JSXMemberExpression') {
        const object = openingElement.name.object;
        const property = openingElement.name.property;
        if (object.type === 'JSXIdentifier' && componentNamespaceNames.has(object.name)) {
          if (property.type === 'JSXIdentifier') {
            const componentName = property.name;

            // Filter by target component if specified
            if (targetComponent) {
              return (
                componentName === targetComponent &&
                textComponents.includes(componentName as (typeof textComponents)[number])
              );
            }

            return textComponents.includes(componentName as (typeof textComponents)[number]);
          }
        }
      }
      return false;
    })
    .forEach((path: ASTPath<JSXElement>) => {
      const { openingElement } = path.node;
      let elementModified = false;

      const asAttribute = openingElement.attributes?.find(
        (attr: JSXAttribute | any): attr is JSXAttribute =>
          attr.type === 'JSXAttribute' && attr.name.name === 'as',
      );

      const displayAttribute = openingElement.attributes?.find(
        (attr: JSXAttribute | any): attr is JSXAttribute =>
          attr.type === 'JSXAttribute' && attr.name.name === 'display',
      );

      if (asAttribute && !displayAttribute) {
        let displayValue: string | null = null;
        if (asAttribute.value?.type === 'StringLiteral') {
          if (asAttribute.value.value === 'li') {
            displayValue = 'list-item';
          } else if (asAttribute.value.value === 'p' || /^h[1-6]$/.test(asAttribute.value.value)) {
            displayValue = 'block';
          }
        }

        if (displayValue) {
          const newAttribute = j.jsxAttribute(j.jsxIdentifier('display'), j.literal(displayValue));

          if (!openingElement.attributes) {
            openingElement.attributes = [];
          }
          openingElement.attributes.push(newAttribute);
          elementModified = true;
        }
      }

      if (elementModified) {
        modified = true;
      }
    });

  return modified ? root.toSource() : file.source;
}

export const parser = 'tsx';
export const extensions = ['ts', 'tsx'];
