/**
 * Codemod to transform icon import paths from __generated__ paths to new simplified paths
 *
 * Example transformations:
 * Before:
 * import DescriptionMap from '@cbhq/cds-icons/__generated__/nav/data/descriptionMap';
 * import {NavIconName} from '@cbhq/cds-icons/__generated__/nav/types/NavIconName';
 * const iconNames = '@cbhq/cds-icons/__generated__/ui/data/names';
 *
 * After:
 * import { descriptionMap as DescriptionMap } from '@cbhq/cds-icons/descriptionMap';
 * import {IconName as NavIconName} from '@cbhq/cds-icons/IconName';
 * const iconNames = '@cbhq/cds-icons/names';
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
  StringLiteral,
} from 'jscodeshift';

const CDS_ICONS_PACKAGE = '@cbhq/cds-icons';

export const iconImportPathMap: Record<string, string> = {
  '@cbhq/cds-icons/v7/__generated__/glyphMap': '@cbhq/cds-icons/glyphMap',
  '@cbhq/cds-icons/v7/__generated__/nav/data/descriptionMap': '@cbhq/cds-icons/descriptionMap',
  '@cbhq/cds-icons/v7/__generated__/nav/data/names': '@cbhq/cds-icons/names',
  '@cbhq/cds-icons/v7/__generated__/ui/data/descriptionMap': '@cbhq/cds-icons/descriptionMap',
  '@cbhq/cds-icons/v7/__generated__/ui/data/names': '@cbhq/cds-icons/names',
  '@cbhq/cds-icons/v7/__generated__/nav/types/NavIconName': '@cbhq/cds-icons/IconName',
  '@cbhq/cds-icons/v7/__generated__/ui/types/UiIconName': '@cbhq/cds-icons/IconName',
};

export default function transformer(file: FileInfo, api: API, options: Options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  let modified = false;

  const importPath = options.importPath as string | undefined;
  let activeIconImportPathMap = iconImportPathMap;

  if (importPath) {
    if (Object.prototype.hasOwnProperty.call(iconImportPathMap, importPath)) {
      activeIconImportPathMap = {
        [importPath]: iconImportPathMap[importPath],
      };
    } else {
      // If the provided importPath is not a migratable path, do nothing
      return file.source;
    }
  }

  // Check if the file has relevant icon import paths
  const hasIconImportPaths = root
    .find(j.ImportDeclaration)
    .some((path: ASTPath<ImportDeclaration>) => {
      const sourceValue = path.value.source.value;
      return (
        typeof sourceValue === 'string' &&
        sourceValue.includes(CDS_ICONS_PACKAGE) &&
        sourceValue.includes('__generated__')
      );
    });

  const hasIconPathStrings = root.find(j.StringLiteral).some((path: ASTPath<StringLiteral>) => {
    const value = path.value.value;
    return (
      typeof value === 'string' &&
      Object.keys(activeIconImportPathMap).some((oldPath) => value.includes(oldPath))
    );
  });

  const hasIconPathTemplates = root.find(j.TemplateLiteral).some((path) => {
    return path.value.quasis.some((quasi) => {
      if (quasi.value && quasi.value.raw) {
        return Object.keys(activeIconImportPathMap).some((oldPath) =>
          quasi.value.raw.includes(oldPath),
        );
      }
      return false;
    });
  });

  if (!hasIconImportPaths && !hasIconPathStrings && !hasIconPathTemplates) {
    // If no relevant imports or usage, return unchanged
    return file.source;
  }

  // Step 1: Transform import paths and convert default imports to named imports
  root.find(j.ImportDeclaration).forEach((path: ASTPath<ImportDeclaration>) => {
    const sourceValue = path.value.source.value;
    if (typeof sourceValue === 'string' && activeIconImportPathMap[sourceValue]) {
      const newPath = activeIconImportPathMap[sourceValue];
      path.value.source.value = newPath;

      // Handle default import to named import conversion
      if (path.value.specifiers) {
        const newSpecifiers: (
          | ImportSpecifier
          | ImportDefaultSpecifier
          | ImportNamespaceSpecifier
        )[] = [];

        path.value.specifiers.forEach((specifier) => {
          if (specifier.type === 'ImportDefaultSpecifier') {
            // Convert default import to named import with alias
            // Extract the file name from the new path as the named import
            const pathSegments = newPath.split('/');
            const fileName = pathSegments[pathSegments.length - 1];
            const namedImportName = fileName;
            const aliasName =
              specifier.local && typeof specifier.local.name === 'string'
                ? specifier.local.name
                : 'DefaultImport';

            // Create named import specifier with alias
            const namedSpecifier = j.importSpecifier(
              j.identifier(namedImportName),
              j.identifier(aliasName),
            );
            newSpecifiers.push(namedSpecifier);
          } else {
            // Keep other specifiers as-is
            newSpecifiers.push(specifier);
          }
        });

        path.value.specifiers = newSpecifiers;
      }

      modified = true;
    }
  });

  // Step 2: Transform string literals that contain icon paths
  root.find(j.StringLiteral).forEach((path: ASTPath<StringLiteral>) => {
    const value = path.value.value;
    if (typeof value === 'string') {
      // Check for exact matches in iconImportPathMap
      if (activeIconImportPathMap[value]) {
        path.value.value = activeIconImportPathMap[value];
        modified = true;
      } else {
        // Check for partial matches and replace path segments
        let newValue = value;
        for (const [oldPath, newPath] of Object.entries(activeIconImportPathMap)) {
          if (value.includes(oldPath)) {
            newValue = value.replace(oldPath, newPath);
            break;
          }
        }
        if (newValue !== value) {
          path.value.value = newValue;
          modified = true;
        }
      }
    }
  });

  // Step 3: Transform template literals that contain icon paths
  root.find(j.TemplateLiteral).forEach((path) => {
    const templateLiteral = path.value;
    templateLiteral.quasis.forEach((quasi) => {
      if (quasi.value && quasi.value.raw) {
        let newValue = quasi.value.raw;
        for (const [oldPath, newPath] of Object.entries(activeIconImportPathMap)) {
          if (quasi.value.raw.includes(oldPath)) {
            newValue = quasi.value.raw.replace(oldPath, newPath);
            break;
          }
        }
        if (newValue !== quasi.value.raw) {
          quasi.value.raw = newValue;
          quasi.value.cooked = newValue;
          modified = true;
        }
      }
    });
  });

  return modified ? root.toSource() : file.source;
}

export const parser = 'tsx';
export const extensions = ['ts', 'tsx'];
