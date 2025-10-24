/**
 * Transform goals:
 * 1) Detect CDS imports that contain a `/v7` subpath (e.g., `@cbhq/cds-mobile/v7/layout`).
 * 2) Detect any imported specifiers that use an alias with a V7 suffix (e.g., `Box as BoxV7`).
 * 3) If found, rename all references from the alias (e.g., `BoxV7`) to the base name (e.g., `Box`).
 * 4) Update the import declaration:
 *    - Replace aliased specifier `Box as BoxV7` with `Box` (remove alias).
 *    - Remove `/v7` segment from the import source path.
 *
 * Example:
 * Before: import { Box as BoxV7 } from '@cbhq/cds-mobile/v7/layout';
 * After:  import { Box } from '@cbhq/cds-mobile/layout';
 */

import type {
  API,
  ASTPath,
  FileInfo,
  Identifier,
  ImportDeclaration,
  ImportDefaultSpecifier,
  ImportNamespaceSpecifier,
  ImportSpecifier,
  JSXIdentifier,
  Options,
} from 'jscodeshift';

const CDS_PACKAGE_PREFIXES = ['@cbhq/cds-mobile', '@cbhq/cds-web'];

function isCdsV7Path(sourceValue: unknown): sourceValue is string {
  return (
    typeof sourceValue === 'string' &&
    CDS_PACKAGE_PREFIXES.some((pkg) => sourceValue.startsWith(pkg + '/v7'))
  );
}

function removeV7FromPath(path: string): string {
  // Only remove the first occurrence of '/v7' immediately after the package name
  // Example: '@cbhq/cds-mobile/v7/layout' -> '@cbhq/cds-mobile/layout'
  return path.replace('/v7', '');
}

export default function transformer(file: FileInfo, api: API, _options: Options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  void _options;

  // Check if the file has a CDS import
  const hasCDSImport = root
    .find(j.ImportDeclaration)
    .some(
      (path: ASTPath<ImportDeclaration>) =>
        path.value.source &&
        typeof path.value.source.value === 'string' &&
        CDS_PACKAGE_PREFIXES.some(
          (pkg) =>
            typeof path.value.source.value === 'string' &&
            (path.value.source.value as string).startsWith(pkg),
        ),
    );

  if (!hasCDSImport) {
    // Avoid re-printing when unrelated
    return file.source;
  }

  // Collect base component names already imported from non-v7 CDS paths
  const nonV7ImportedBaseNames = new Set<string>();
  root
    .find(j.ImportDeclaration)
    .filter((path: ASTPath<ImportDeclaration>) => {
      const src = path.node.source.value;
      return (
        typeof src === 'string' &&
        CDS_PACKAGE_PREFIXES.some((pkg) => src.startsWith(pkg)) &&
        !/\/v7(\/|$)/.test(src)
      );
    })
    .forEach((path: ASTPath<ImportDeclaration>) => {
      const specifiers = path.node.specifiers || [];
      specifiers.forEach((spec) => {
        if (spec.type === 'ImportSpecifier') {
          const imported = spec.imported as Identifier;
          // Consider base imported if imported name matches (alias does not matter)
          nonV7ImportedBaseNames.add(imported.name);
        }
      });
    });

  let fileModified = false;

  root
    .find(j.ImportDeclaration)
    .filter((path: ASTPath<ImportDeclaration>) => isCdsV7Path(path.node.source.value))
    .forEach((importPath: ASTPath<ImportDeclaration>) => {
      const importDecl = importPath.node;
      if (!importDecl.specifiers || importDecl.specifiers.length === 0) {
        // No specifiers -> no aliases to fix; do not change path
        return;
      }

      // Map of alias identifier -> base identifier (e.g., BoxV7 -> Box)
      const aliasToBaseName = new Map<string, string>();
      // Track which alias base names we keep on this import after processing
      const keptAliasBaseNames = new Set<string>();
      // Track indices/specifiers to remove due to existing non-v7 import
      const specifiersToRemove = new Set<ImportSpecifier>();

      importDecl.specifiers.forEach(
        (spec: ImportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier) => {
          if (spec.type === 'ImportSpecifier') {
            const imported = spec.imported as Identifier;
            const local = (spec.local || imported) as Identifier;

            if (local.name !== imported.name && /V7$/.test(local.name)) {
              // Found a V7 alias
              aliasToBaseName.set(local.name, imported.name);
              if (nonV7ImportedBaseNames.has(imported.name)) {
                // Base is already imported elsewhere (non-v7). Drop this specifier.
                specifiersToRemove.add(spec);
              } else {
                // Keep here without alias
                spec.local = null; // prints as `{ Box }`
                keptAliasBaseNames.add(imported.name);
              }
              fileModified = true;
            }
          }
        },
      );

      if (specifiersToRemove.size > 0) {
        importDecl.specifiers = importDecl.specifiers!.filter((s) =>
          s.type !== 'ImportSpecifier' ? true : !specifiersToRemove.has(s as ImportSpecifier),
        );
      }

      // If there are aliases to rewrite, rename references throughout the file
      if (aliasToBaseName.size > 0) {
        // Rename in value positions (identifiers)
        aliasToBaseName.forEach((baseName, aliasName) => {
          root.find(j.Identifier, { name: aliasName }).forEach((idPath) => {
            // Avoid touching import specifiers or type-only identifiers in TS import type positions
            const parent = idPath.parent?.value;
            if (
              parent &&
              (parent.type === 'ImportSpecifier' ||
                parent.type === 'ImportDefaultSpecifier' ||
                parent.type === 'ImportNamespaceSpecifier')
            ) {
              return;
            }
            (idPath.node as Identifier).name = baseName;
            fileModified = true;
          });

          // Rename in JSX identifiers
          root
            .find(j.JSXIdentifier, { name: aliasName })
            .forEach((jsxIdPath: ASTPath<JSXIdentifier>) => {
              jsxIdPath.node.name = baseName;
              fileModified = true;
            });
        });
        // If import became empty, remove the declaration entirely
        if (!importDecl.specifiers || importDecl.specifiers.length === 0) {
          j(importPath).remove();
          fileModified = true;
        } else {
          // Update the import path to drop '/v7' only when all remaining specifiers are kept alias bases
          const remainingSpecifiers = importDecl.specifiers.filter(
            (s): s is ImportSpecifier => s.type === 'ImportSpecifier',
          );
          const allRemainingAreKeptAliases =
            remainingSpecifiers.length > 0 &&
            remainingSpecifiers.every((s) =>
              keptAliasBaseNames.has((s.imported as Identifier).name),
            );
          if (allRemainingAreKeptAliases) {
            importDecl.source.value = removeV7FromPath(importDecl.source.value as string);
            fileModified = true;
          }
        }
      }
    });

  return fileModified ? root.toSource() : file.source;
}

export const parser = 'tsx';
export const extensions = ['ts', 'tsx'];
