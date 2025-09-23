/**
 * Codemod to transform NavigationIconName, UiIconName, and @cbhq/cds-icons types to IconName
 *
 * Example transformations:
 * Before:
 * Case 1:
 * import { NavigationIconName, UiIconName } from '@cbhq/cds-common';
 * type NavigationIconTypes = NavigationIconName;
 * type UiIconTypes = UiIconName;
 * type CombinedTypes = NavigationIconName & UiIconName;
 * type MixedTypes = NavigationIconName & SomeOtherType;
 * type UnionTypes = NavigationIconName | IconName;
 * type DuplicateTypes = NavigationIconName | UiIconName;
 *
 * Case 2:
 * import {NavIconName} from '@cbhq/cds-icons';
 *
 * After:
 * Case 1:
 * import { IconName } from '@cbhq/cds-common';
 * type NavigationIconTypes = IconName;
 * type UiIconTypes = IconName;
 * type CombinedTypes = IconName;
 * type MixedTypes = IconName & SomeOtherType;
 * type UnionTypes = IconName;
 * type DuplicateTypes = IconName;
 *
 * Case 2:
 * import { IconName as NavIconName } from '@cbhq/cds-icons';
 */
import type {
  API,
  ASTPath,
  FileInfo,
  ImportDeclaration,
  ImportDefaultSpecifier,
  ImportNamespaceSpecifier,
  ImportSpecifier,
  Options,
} from 'jscodeshift';

const CDS_PACKAGES = [
  '@cbhq/cds-web',
  '@cbhq/cds-mobile',
  ':rn/cds-wallet/components', // TODO remove this once wallet mobile is migrated
  '@cbhq/react-native-core/components/interactables',
]; // TODO remove this once retail mobile is migrated
const CDS_COMMON_PACKAGE = '@cbhq/cds-common';
const CDS_ICONS_PACKAGE = '@cbhq/cds-icons';

// Icon type names that should be replaced with IconName
export const ICON_TYPE_NAMES = ['NavigationIconName', 'UiIconName'];

// Icon type names from @cbhq/cds-icons that should be replaced with IconName using alias
export const CDS_ICONS_TYPE_NAMES = [
  'NavIconName',
  'NavIconNameInternal',
  'UiIconName',
  'UiIconNameInternal',
];

export default function transformer(file: FileInfo, api: API, options: Options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  let modified = false;

  // Get type from options
  const targetType = options.typeName as string | undefined;

  // All available types for validation
  const allAvailableTypes = [...ICON_TYPE_NAMES, ...CDS_ICONS_TYPE_NAMES];

  // Validate target type if specified
  if (targetType && !allAvailableTypes.includes(targetType)) {
    // If type is specified but not in available types, skip transformation
    return file.source;
  }

  // Create filtered type arrays based on target type
  const getFilteredIconTypeNames = (): string[] => {
    if (!targetType) {
      // If no target type specified, use all types
      return ICON_TYPE_NAMES;
    }

    // Filter ICON_TYPE_NAMES based on target type
    return ICON_TYPE_NAMES.filter((typeName) => typeName === targetType);
  };

  const getFilteredCdsIconsTypeNames = (): string[] => {
    if (!targetType) {
      // If no target type specified, use all types
      return CDS_ICONS_TYPE_NAMES;
    }

    // Filter CDS_ICONS_TYPE_NAMES based on target type
    return CDS_ICONS_TYPE_NAMES.filter((typeName) => typeName === targetType);
  };

  const filteredIconTypeNames = getFilteredIconTypeNames();
  const filteredCdsIconsTypeNames = getFilteredCdsIconsTypeNames();

  // Check if the file has relevant type usage
  const hasIconTypeUsage = root.find(j.Identifier).some((path) => {
    return (
      filteredIconTypeNames.includes(path.value.name) ||
      filteredCdsIconsTypeNames.includes(path.value.name)
    );
  });

  const hasCDSImport = root.find(j.ImportDeclaration).some((path: ASTPath<ImportDeclaration>) => {
    const sourceValue = path.value.source.value;
    return (
      typeof sourceValue === 'string' &&
      (CDS_PACKAGES.some((pkg) => sourceValue.startsWith(pkg)) ||
        sourceValue.includes(CDS_ICONS_PACKAGE) ||
        sourceValue.startsWith(CDS_COMMON_PACKAGE))
    );
  });

  // If target type is specified and no relevant types are available, skip transformation
  if (targetType && filteredIconTypeNames.length === 0 && filteredCdsIconsTypeNames.length === 0) {
    return file.source;
  }

  if (!hasIconTypeUsage && !hasCDSImport) {
    // If no relevant imports or usage, return unchanged
    return file.source;
  }

  // Step 1: Transform NavigationIconName and UiIconName imports and type references
  const iconTypeImportsToProcess = new Set<string>();
  const newIconNameImportNeeded = { needed: false, hasExisting: false };

  // Find and process imports of NavigationIconName and UiIconName
  root.find(j.ImportDeclaration).forEach((path: ASTPath<ImportDeclaration>) => {
    const sourceValue = path.value.source.value;

    if (
      typeof sourceValue === 'string' &&
      (CDS_PACKAGES.some((pkg) => sourceValue.startsWith(pkg)) ||
        sourceValue.startsWith(CDS_ICONS_PACKAGE) ||
        sourceValue.startsWith(CDS_COMMON_PACKAGE))
    ) {
      const specifiersToKeep: ImportSpecifier[] = [];
      let importModified = false;

      path.value.specifiers?.forEach((spec) => {
        if (spec.type === 'ImportSpecifier') {
          const importedName =
            typeof spec.imported.name === 'string'
              ? spec.imported.name
              : (spec.imported.name as any).name;

          if (filteredIconTypeNames.includes(importedName)) {
            // Track that we found an icon type import
            iconTypeImportsToProcess.add(importedName);
            newIconNameImportNeeded.needed = true;
            importModified = true;
            modified = true;
          } else if (importedName === 'IconName') {
            // Track existing IconName import
            newIconNameImportNeeded.hasExisting = true;
            specifiersToKeep.push(spec);
          } else {
            // Keep other imports
            specifiersToKeep.push(spec);
          }
        } else {
          // Keep non-ImportSpecifier imports (default, namespace) - but cast properly
          specifiersToKeep.push(spec as any);
        }
      });

      // Update the import declaration
      if (importModified) {
        if (specifiersToKeep.length > 0) {
          path.value.specifiers = specifiersToKeep;
        } else {
          // Remove the entire import if no specifiers left
          j(path).remove();
        }
      }
    }
  });

  // Add IconName import if needed and not already present
  if (newIconNameImportNeeded.needed && !newIconNameImportNeeded.hasExisting) {
    // Check if IconName is already imported from @cbhq/cds-common before adding
    let iconNameAlreadyExists = false;

    root.find(j.ImportDeclaration).forEach((path: ASTPath<ImportDeclaration>) => {
      const sourceValue = path.value.source.value as string;
      if (sourceValue === '@cbhq/cds-common') {
        const existingSpecifiers = path.value.specifiers || [];
        const hasIconName = existingSpecifiers.some(
          (s: ImportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier) =>
            s.type === 'ImportSpecifier' &&
            (typeof (s as ImportSpecifier).imported.name === 'string'
              ? (s as ImportSpecifier).imported.name
              : ((s as ImportSpecifier).imported.name as any).name) === 'IconName',
        );
        if (hasIconName) {
          iconNameAlreadyExists = true;
        }
      }
    });

    if (!iconNameAlreadyExists) {
      const iconNameImport = j.importDeclaration(
        [j.importSpecifier(j.identifier('IconName'))],
        j.literal('@cbhq/cds-common'),
      );

      // Find the last import to insert after
      const lastImport = root.find(j.ImportDeclaration).at(-1);
      if (lastImport.length > 0) {
        lastImport.insertAfter(iconNameImport);
      } else {
        // If no imports, add at the beginning
        root.get().node.program.body.unshift(iconNameImport);
      }
      modified = true;
    }
  }

  // Step 2: Replace type references in the code
  if (iconTypeImportsToProcess.size > 0) {
    // Replace type references in TSTypeReference nodes
    root.find(j.TSTypeReference).forEach((path) => {
      if (path.value.typeName.type === 'Identifier') {
        const typeName = path.value.typeName.name;
        if (filteredIconTypeNames.includes(typeName)) {
          // Check if we're in a union type context
          const parent = path.parent;
          if (parent && parent.value && parent.value.type === 'TSUnionType') {
            // We're in a union type, check if IconName already exists in this union
            const unionTypes = parent.value.types;
            const hasIconNameInUnion = unionTypes.some(
              (type: any) =>
                type.type === 'TSTypeReference' &&
                type.typeName &&
                type.typeName.type === 'Identifier' &&
                type.typeName.name === 'IconName',
            );

            if (hasIconNameInUnion) {
              // IconName already exists in this union, remove this type instead of replacing
              const currentIndex = unionTypes.indexOf(path.value);
              if (currentIndex !== -1) {
                unionTypes.splice(currentIndex, 1);
                modified = true;
              }
            } else {
              // IconName doesn't exist, safe to replace
              path.value.typeName.name = 'IconName';
              modified = true;
            }
          } else {
            // Not in a union type, safe to replace
            path.value.typeName.name = 'IconName';
            modified = true;
          }
        }
      }
    });

    // Handle intersection types (e.g., IconName & NavigationIconName -> IconName)
    root.find(j.TSIntersectionType).forEach((path) => {
      const types = path.value.types;
      let hasIconName = false;
      let hasIconType = false;

      // Check what types are in the intersection
      types.forEach((type) => {
        if (type.type === 'TSTypeReference' && type.typeName.type === 'Identifier') {
          const typeName = type.typeName.name;
          if (typeName === 'IconName') {
            hasIconName = true;
          } else if (filteredIconTypeNames.includes(typeName)) {
            hasIconType = true;
          }
        }
      });

      // If intersection includes IconName and one of the icon types, replace with just IconName
      if (hasIconName && hasIconType) {
        const iconNameType = j.tsTypeReference(j.identifier('IconName'));
        j(path).replaceWith(iconNameType);
        modified = true;
      } else if (hasIconType && !hasIconName) {
        // If intersection only has icon types (no IconName), replace all with IconName
        const filteredTypes = types.filter((type) => {
          if (type.type === 'TSTypeReference' && type.typeName.type === 'Identifier') {
            return !filteredIconTypeNames.includes(type.typeName.name);
          }
          return true;
        });

        // Add IconName type
        filteredTypes.push(j.tsTypeReference(j.identifier('IconName')));

        if (filteredTypes.length === 1) {
          // If only IconName left, replace intersection with just IconName
          j(path).replaceWith(filteredTypes[0]);
        } else {
          // Update intersection with filtered types
          path.value.types = filteredTypes;
        }
        modified = true;
      }
    });

    // Replace standalone identifier references in type contexts
    root.find(j.Identifier).forEach((path) => {
      const identifierName = path.value.name;
      if (filteredIconTypeNames.includes(identifierName)) {
        const parent = path.parentPath.node;

        // Only replace in type contexts, not in variable declarations or other non-type contexts
        if (
          parent.type === 'TSTypeAnnotation' ||
          parent.type === 'TSTypeAliasDeclaration' ||
          parent.type === 'TSInterfaceDeclaration' ||
          parent.type === 'TSPropertySignature' ||
          parent.type === 'TSMethodSignature' ||
          parent.type === 'TSFunctionType' ||
          parent.type === 'TSTypeParameter' ||
          parent.type === 'TSTypeParameterInstantiation'
        ) {
          // Check if we're in a union type context (walk up to find TSUnionType)
          let currentPath = path.parentPath;
          let unionParent = null;
          while (currentPath) {
            if (currentPath.value && currentPath.value.type === 'TSUnionType') {
              unionParent = currentPath.value;
              break;
            }
            currentPath = currentPath.parent;
          }

          if (unionParent) {
            // We're in a union type, check if IconName already exists
            const hasIconNameInUnion = unionParent.types.some(
              (type: any) =>
                type.type === 'TSTypeReference' &&
                type.typeName &&
                type.typeName.type === 'Identifier' &&
                type.typeName.name === 'IconName',
            );

            if (hasIconNameInUnion) {
              // IconName already exists, remove this identifier's type from union
              const currentIndex = unionParent.types.findIndex(
                (type: any) => type === path.parentPath.value,
              );
              if (currentIndex !== -1) {
                unionParent.types.splice(currentIndex, 1);
                modified = true;
              }
            } else {
              // Safe to replace
              path.value.name = 'IconName';
              modified = true;
            }
          } else {
            // Not in union, safe to replace
            path.value.name = 'IconName';
            modified = true;
          }
        }
      }
    });

    // Clean up union types that might have only one type left after removals
    root.find(j.TSUnionType).forEach((path) => {
      const types = path.value.types;
      if (types.length === 1) {
        // Replace union with single type
        j(path).replaceWith(types[0]);
        modified = true;
      }
    });
  }

  // Step 3: Handle @cbhq/cds-icons type imports to use IconName with alias
  root.find(j.ImportDeclaration).forEach((path: ASTPath<ImportDeclaration>) => {
    const sourceValue = path.value.source.value;

    if (typeof sourceValue === 'string' && sourceValue === CDS_ICONS_PACKAGE) {
      const specifiersToKeep: (
        | ImportSpecifier
        | ImportDefaultSpecifier
        | ImportNamespaceSpecifier
      )[] = [];
      const newIconNameImports: Array<{ originalName: string; aliasName: string }> = [];
      let importModified = false;

      path.value.specifiers?.forEach((spec) => {
        if (spec.type === 'ImportSpecifier') {
          const importedName =
            typeof spec.imported.name === 'string'
              ? spec.imported.name
              : (spec.imported.name as any).name;

          if (filteredCdsIconsTypeNames.includes(importedName)) {
            // This is a type name we want to replace with IconName
            const localName = spec.local
              ? typeof spec.local.name === 'string'
                ? spec.local.name
                : (spec.local.name as any).name || spec.local.name
              : importedName;

            newIconNameImports.push({
              originalName: importedName,
              aliasName: String(localName),
            });

            importModified = true;
            modified = true;
          } else {
            // Keep other imports
            specifiersToKeep.push(spec);
          }
        } else {
          // Keep non-ImportSpecifier imports
          specifiersToKeep.push(spec);
        }
      });

      // Update the import declaration
      if (importModified) {
        // Add new IconName imports with aliases
        newIconNameImports.forEach(({ aliasName }) => {
          // Only add if not already present with the same alias
          const alreadyPresent = specifiersToKeep.some(
            (s) =>
              s.type === 'ImportSpecifier' &&
              s.local &&
              (typeof s.local.name === 'string' ? s.local.name : (s.local.name as any).name) ===
                aliasName,
          );

          if (!alreadyPresent) {
            const importSpec = j.importSpecifier(j.identifier('IconName'), j.identifier(aliasName));
            specifiersToKeep.push(importSpec);
          }
        });

        if (specifiersToKeep.length > 0) {
          path.value.specifiers = specifiersToKeep;
        } else {
          // Remove the entire import if no specifiers left
          j(path).remove();
        }
      }
    }
  });

  return modified ? root.toSource() : file.source;
}

export const parser = 'tsx';
export const extensions = ['ts', 'tsx'];
