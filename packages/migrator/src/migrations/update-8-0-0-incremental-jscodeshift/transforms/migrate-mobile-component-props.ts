/**
 * Codemod to transform specific mobile component props for CDS mobile components.
 *
 * Example transformations:
 * Before:
 * ```
 * <TextBody align="center">Test</TextBody>
 * const TextComponent = isTitle ? TextTitle3 : TextLabel1;
 * <TextComponent align="center">Test</TextComponent>
 * ```
 *
 * After:
 * ```
 * <TextBody textAlign="center">Test</TextBody>
 * const TextComponent = isTitle ? TextTitle3 : TextLabel1;
 * <TextComponent textAlign="center">Test</TextComponent>
 * ```
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
  JSXSpreadAttribute,
  Options,
  VariableDeclarator,
} from 'jscodeshift';

import { getCustomPackages } from '../helpers/get-custom-packages';

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

const textPropMapping = {
  transform: 'textTransform',
  selectable: 'userSelect',
} as const;

const tooltipComponents = ['Tooltip'] as const;

const tooltipPropMapping = {
  invertSpectrum: 'invertColorScheme',
} as const;

const linkComponents = ['Link'] as const;

const linkPropMapping = {
  variant: 'font',
} as const;

const CDS_PACKAGES = ['@cbhq/cds-mobile'];

// Create component prop mappings for all text components and tooltip components
const componentPropMapping = Object.fromEntries([
  ...textComponents.map((component) => [component, textPropMapping]),
  ...tooltipComponents.map((component) => [component, tooltipPropMapping]),
  ...linkComponents.map((component) => [component, linkPropMapping]),
]) as Record<
  | (typeof textComponents)[number]
  | (typeof tooltipComponents)[number]
  | (typeof linkComponents)[number],
  typeof textPropMapping | typeof tooltipPropMapping | typeof linkPropMapping
>;

const ALL_TARGETED_COMPONENTS = [...textComponents, ...tooltipComponents, ...linkComponents];

export default function transformer(file: FileInfo, api: API, options: Options) {
  const j = api.jscodeshift;
  const root = j(file.source);

  // Get target component from options
  const targetComponent = options.component as string | undefined;

  const customPackages = getCustomPackages(options);
  const PACKAGE_PATHS = [...CDS_PACKAGES, ...customPackages];

  // Validate target component if specified
  if (targetComponent && !ALL_TARGETED_COMPONENTS.includes(targetComponent as any)) {
    // If component is specified but not in ALL_TARGETED_COMPONENTS, skip transformation
    return file.source;
  }

  // Check if the file has a CDS import
  const hasCDSImport = root
    .find(j.ImportDeclaration)
    .some((path: ASTPath<ImportDeclaration>) =>
      PACKAGE_PATHS.some(
        (pkg) =>
          typeof path.node.source.value === 'string' && path.node.source.value.startsWith(pkg),
      ),
    );

  if (!hasCDSImport) {
    // If no CDS imports are found, return the original source unchanged
    // This avoids the re-parsing/re-printing formatting changes.
    return file.source;
  }

  // 1. Find all imported component names from @cbhq/cds-mobile*
  const importedComponentNames = new Set<string>();
  root
    .find(j.ImportDeclaration)
    .filter((path: ASTPath<ImportDeclaration>) => {
      const source = path.node.source.value;
      return typeof source === 'string' && PACKAGE_PATHS.some((pkg) => source.startsWith(pkg));
    })
    .forEach((path: ASTPath<ImportDeclaration>) => {
      if (!path.node.specifiers) return;
      path.node.specifiers.forEach(
        (spec: ImportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier) => {
          if (spec.type === 'ImportSpecifier' && spec.imported.type === 'Identifier') {
            const localName =
              spec.local && spec.local.type === 'Identifier' ? spec.local.name : spec.imported.name;

            // Filter by target component if specified, otherwise include all components
            const shouldInclude = targetComponent ? localName === targetComponent : true;

            if (shouldInclude) {
              importedComponentNames.add(localName);
            }
          } else if (
            spec.type === 'ImportDefaultSpecifier' &&
            spec.local &&
            spec.local.type === 'Identifier'
          ) {
            const localName = spec.local.name;

            // Filter by target component if specified, otherwise include all components
            const shouldInclude = targetComponent ? localName === targetComponent : true;

            if (shouldInclude) {
              importedComponentNames.add(localName);
            }
          } else if (
            spec.type === 'ImportNamespaceSpecifier' &&
            spec.local &&
            spec.local.type === 'Identifier'
          ) {
            importedComponentNames.add(spec.local.name);
          }
        },
      );
    });

  // If target component is specified but not found in imports, skip transformation
  if (targetComponent && importedComponentNames.size === 0) {
    return file.source;
  }

  // 2. Find variables that are assigned CDS components via ternary or other expressions
  const componentVariableNames = new Set<string>();
  root.find(j.VariableDeclarator).forEach((path: ASTPath<VariableDeclarator>) => {
    const node = path.node;
    if (node.id.type === 'Identifier' && node.init) {
      const variableName = node.id.name;

      // Handle ternary expressions: const Component = condition ? ComponentA : ComponentB
      if (node.init.type === 'ConditionalExpression') {
        const consequent = node.init.consequent;
        const alternate = node.init.alternate;

        // Check if both branches are CDS components
        const isConsequentCDS =
          consequent.type === 'Identifier' &&
          (importedComponentNames.has(consequent.name) || consequent.name in componentPropMapping);
        const isAlternateCDS =
          alternate.type === 'Identifier' &&
          (importedComponentNames.has(alternate.name) || alternate.name in componentPropMapping);

        if (isConsequentCDS && isAlternateCDS) {
          componentVariableNames.add(variableName);
        }
      }

      // Handle direct assignment: const Component = SomeComponent
      if (node.init.type === 'Identifier') {
        const assignedComponent = node.init.name;
        if (
          importedComponentNames.has(assignedComponent) ||
          assignedComponent in componentPropMapping
        ) {
          componentVariableNames.add(variableName);
        }
      }
    }
  });

  // 3. Find all JSX elements whose name matches a target component (either imported, known CDS component, or component variable)
  const elements = root.find(j.JSXElement).filter((path: ASTPath<JSXElement>) => {
    const openingElement = path.node.openingElement;
    let componentName: string | undefined;

    if (openingElement.name.type === 'JSXIdentifier') {
      componentName = openingElement.name.name;
    } else if (openingElement.name.type === 'JSXMemberExpression') {
      const object = openingElement.name.object;
      const property = openingElement.name.property;
      if (
        object.type === 'JSXIdentifier' &&
        property.type === 'JSXIdentifier' &&
        importedComponentNames.has(object.name)
      ) {
        componentName = property.name;
      }
    }

    // Filter by target component if specified
    if (targetComponent && componentName !== targetComponent) {
      return false;
    }

    // Check if it's a known CDS component that we want to transform
    return Boolean(
      componentName &&
        (componentName in componentPropMapping || componentVariableNames.has(componentName)) &&
        (importedComponentNames.has(componentName) ||
          componentVariableNames.has(componentName) ||
          importedComponentNames.size === 0),
    );
  });

  let modified = false;

  // 4. For each matching element, map old prop names to new prop names or remove them
  elements.forEach((path: ASTPath<JSXElement>) => {
    const openingElement = path.node.openingElement;
    let componentName: string | undefined;

    // Get component name (either direct or from namespace)
    if (openingElement.name.type === 'JSXIdentifier') {
      componentName = openingElement.name.name;
    } else if (openingElement.name.type === 'JSXMemberExpression') {
      componentName =
        openingElement.name.property.type === 'JSXIdentifier'
          ? openingElement.name.property.name
          : undefined;
    }

    if (!componentName) return;

    // Determine the appropriate prop mapping for this component
    let propMapping: Record<string, string> = {};

    if (componentVariableNames.has(componentName)) {
      // For component variables, determine the mapping based on the component type
      if (textComponents.includes(componentName as any)) {
        propMapping = { ...propMapping, ...textPropMapping };
      }
      if (tooltipComponents.includes(componentName as any)) {
        propMapping = { ...propMapping, ...tooltipPropMapping };
      }
      if (linkComponents.includes(componentName as any)) {
        propMapping = { ...propMapping, ...linkPropMapping };
      }
    } else if (componentName in componentPropMapping) {
      propMapping = componentPropMapping[componentName as keyof typeof componentPropMapping];
    } else {
      return;
    }

    const attributes = openingElement.attributes || [];

    const originalLength = attributes.length;
    openingElement.attributes = attributes.filter((attr: JSXAttribute | JSXSpreadAttribute) => {
      if (
        attr.type === 'JSXAttribute' &&
        attr.name.type === 'JSXIdentifier' &&
        attr.name.name in propMapping
      ) {
        const oldName = attr.name.name as keyof typeof propMapping;
        const newName = propMapping[oldName];
        if (newName === '') {
          // If the new name is an empty string, remove the attribute
          modified = true;
          return false;
        }
        // Otherwise, replace the prop name with its new equivalent
        attr.name.name = newName;
        modified = true;
      }
      return true; // Keep other attributes
    });

    // If attributes were removed, mark as modified
    if (attributes.length !== originalLength) {
      modified = true;
    }
  });

  return modified ? root.toSource() : file.source;
}

export const parser = 'tsx';
export const extensions = ['ts', 'tsx'];
