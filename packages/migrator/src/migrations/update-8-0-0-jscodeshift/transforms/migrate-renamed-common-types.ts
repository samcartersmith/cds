/**
 * Codemod to migrate common types from @cbhq/cds-common/types/* that were renamed or moved in v8.
 *
 * Example transformations:
 * Before:
 * ```
 * import { ToastRefBaseProps } from '@cbhq/cds-common/types/ToastRefBaseProps';
 * ```
 *
 * After:
 * ```
 * import { ToastRefHandle } from '@cbhq/cds-common/overlays/ToastProvider';
 * ```
 */
import { API, ASTPath, FileInfo, ImportDeclaration, ImportSpecifier, Options } from 'jscodeshift';

const typesWithNewPathOrRenamed: Record<string, { name?: string; path?: string }> = {
  ToastRefBaseProps: {
    name: 'ToastRefHandle',
    path: '@cbhq/cds-common/overlays/ToastProvider',
  },
  ToastDuration: {
    path: '@cbhq/cds-common/overlays/ToastProvider',
  },
  ToastAction: {
    path: '@cbhq/cds-common/overlays/ToastProvider',
  },
  BannerVariant: {
    path: '@cbhq/cds-common/types/BannerBaseProps',
  },
  BannerStyleVariant: {
    path: '@cbhq/cds-common/types/BannerBaseProps',
  },
  FallbackColor: {
    name: 'AvatarFallbackColor',
  },
  DotBaseProps: {
    name: 'DotStatusColorBaseProps',
    path: 'dots/DotStatusColor',
  },
  ColorScheme: {
    name: 'TagColorScheme',
  },
  StackBaseProps: {
    name: 'BoxBaseProps',
    path: 'layout/Box',
  },
};

const CDS_COMMON_TYPES_PREFIX = '@cbhq/cds-common/types';
const CDS_COMMON_PACKAGE = '@cbhq/cds-common';

export default function transformer(file: FileInfo, api: API, options: Options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  let modified = false;

  const cliPlatform = options.platform as string | undefined;
  let isWebTarget = false;
  let isMobileTarget = false;

  if (cliPlatform && ['web', 'mobile'].includes(cliPlatform)) {
    console.log(
      `INFO (migrate-renamed-common-types) [${file.path}]: Using platform='${cliPlatform}' from CLI options.`,
    );
    if (cliPlatform === 'web') isWebTarget = true;
    if (cliPlatform === 'mobile') isMobileTarget = true;
  } else {
    console.warn(
      `WARN (migrate-renamed-common-types) [${file.path}]: Missing or invalid --platform option (expected 'web' or 'mobile', received '${cliPlatform}'). Skipping file. `,
    );
    return file.source; // Strict: require platform if types need platform-specific paths
  }

  const newDeclarationsToAdd: ImportDeclaration[] = [];

  root
    .find(j.ImportDeclaration)
    .filter((path: ASTPath<ImportDeclaration>) => {
      const sourceValue = path.value.source.value;
      return (
        typeof sourceValue === 'string' &&
        (sourceValue.startsWith(CDS_COMMON_TYPES_PREFIX) || sourceValue === CDS_COMMON_PACKAGE)
      );
    })
    .forEach((importPath: ASTPath<ImportDeclaration>) => {
      const specifiersToKeep: (ImportSpecifier | any)[] = []; // Allow other specifier types for keeping
      let importAltered = false;

      importPath.value.specifiers?.forEach((spec) => {
        if (spec.type !== 'ImportSpecifier') {
          specifiersToKeep.push(spec); // Keep non-ImportSpecifiers like ImportDefaultSpecifier
          return;
        }

        const originalImportedName =
          typeof spec.imported.name === 'string'
            ? spec.imported.name
            : (spec.imported.name as any).name;
        const originalLocalName = spec.local
          ? typeof spec.local.name === 'string'
            ? spec.local.name
            : (spec.local.name as any).name
          : originalImportedName;
        const wasAliased = !!spec.local && spec.local.name !== spec.imported.name;

        if (Object.prototype.hasOwnProperty.call(typesWithNewPathOrRenamed, originalImportedName)) {
          importAltered = true;
          modified = true;

          const config = typesWithNewPathOrRenamed[originalImportedName];
          const newTargetImportedName = config.name || originalImportedName;
          let finalLocalName = originalLocalName;

          if (!wasAliased && config.name) {
            finalLocalName = newTargetImportedName;

            console.log(
              `DEBUG [${file.path}]: Renaming type usages of '${originalLocalName}' to '${finalLocalName}'`,
            );

            // --- TYPE-FOCUSED Usage Renaming ---
            // 1. Rename TSTypeReference identifiers
            root
              .find(j.TSTypeReference, {
                typeName: { type: 'Identifier', name: originalLocalName },
              })
              .forEach((path) => {
                j(path.get('typeName')).replaceWith(j.identifier(finalLocalName));
              });

            // 2. Rename Identifiers used as types in other contexts (e.g., Heritage clauses, instanceof)
            root
              .find(j.Identifier, { name: originalLocalName })
              .filter((idPath) => {
                const parent = idPath.parentPath.node;
                // Check heritage clauses (extends/implements for classes/interfaces)
                if (parent.type === 'ClassDeclaration' || parent.type === 'ClassExpression') {
                  if (parent.superClass === idPath.node) return true;
                  if (
                    parent.implements &&
                    parent.implements.some((imp: any) => imp.expression === idPath.node)
                  )
                    return true;
                }
                if (
                  parent.type === 'TSInterfaceDeclaration' &&
                  parent.extends &&
                  parent.extends.some((ext: any) => ext.expression === idPath.node)
                )
                  return true;
                // Check instanceof operator
                if (
                  parent.type === 'BinaryExpression' &&
                  parent.operator === 'instanceof' &&
                  parent.right === idPath.node
                )
                  return true;

                // Add other specific type contexts here if needed

                return false; // Only rename if it's explicitly in a type context identified above
              })
              .forEach((idPath) => {
                j(idPath).replaceWith(j.identifier(finalLocalName));
              });
            // --- End TYPE-FOCUSED Usage Renaming ---
          }

          const newSpecifierNode = j.importSpecifier(
            j.identifier(newTargetImportedName),
            wasAliased || finalLocalName !== newTargetImportedName
              ? j.identifier(finalLocalName)
              : null,
          );

          if (config.path) {
            let resolvedNewPath = config.path;
            if (!resolvedNewPath.startsWith('@')) {
              const platformPrefix = isWebTarget ? '@cbhq/cds-web/' : '@cbhq/cds-mobile/';
              resolvedNewPath = platformPrefix + resolvedNewPath;
            }

            newDeclarationsToAdd.push(
              j.importDeclaration(
                [newSpecifierNode],
                j.literal(resolvedNewPath),
                importPath.value.importKind,
              ),
            );
            // Do not add to specifiersToKeep, it's being moved
          } else {
            // Only name changed, path stays the same (relative to original import)
            specifiersToKeep.push(newSpecifierNode);
          }
        } else {
          // Specifier not in map, keep it as is
          specifiersToKeep.push(spec);
        }
      });

      // Update or remove the original import declaration
      if (importAltered) {
        if (specifiersToKeep.length > 0) {
          importPath.node.specifiers = specifiersToKeep as ImportSpecifier[];
        } else {
          j(importPath).remove();
        }
      }
    });

  // Logic for merging/adding newDeclarationsToAdd
  // Using the robust merging logic from migrate-base-props-path.ts
  if (newDeclarationsToAdd.length > 0) {
    modified = true; // Ensure modified is true if we collected potential new imports
    const importsToActuallyCreate: ImportDeclaration[] = [];
    const processedSpecifiers = new Set<string>(); // path|kind|importedName

    newDeclarationsToAdd.forEach((candidateImportDeclaration) => {
      const sourcePath = (candidateImportDeclaration.source as any).value as string; // Use any temporarily
      const specifierToAdd = candidateImportDeclaration.specifiers![0] as ImportSpecifier;
      const importKind = candidateImportDeclaration.importKind || 'value';
      const specifierKey = `${sourcePath}|${importKind}|${specifierToAdd.imported.name}`;

      if (processedSpecifiers.has(specifierKey)) {
        return;
      }

      let merged = false;
      root
        .find(j.ImportDeclaration, {
          source: { value: sourcePath },
          importKind: importKind,
        })
        .forEach((existingAstImportPath: ASTPath<ImportDeclaration>) => {
          if (merged) return;

          const existingSpecifiers = existingAstImportPath.value.specifiers || [];
          const alreadyPresent = existingSpecifiers.some(
            (s) => s.type === 'ImportSpecifier' && s.imported.name === specifierToAdd.imported.name,
          );

          if (!alreadyPresent) {
            existingAstImportPath.value.specifiers = [...existingSpecifiers, specifierToAdd];
            existingAstImportPath.value.specifiers.sort((a, b) => {
              const aName =
                typeof (a as ImportSpecifier).imported.name === 'string'
                  ? (a as ImportSpecifier).imported.name
                  : ((a as ImportSpecifier).imported.name as any).name;
              const bName =
                typeof (b as ImportSpecifier).imported.name === 'string'
                  ? (b as ImportSpecifier).imported.name
                  : ((b as ImportSpecifier).imported.name as any).name;
              return aName.localeCompare(bName);
            });
            merged = true;
            processedSpecifiers.add(specifierKey);
            console.log(
              `DEBUG [${file.path}]: Merged specifier '${specifierToAdd.imported.name}' into existing '${sourcePath}'`,
            );
          } else {
            merged = true;
            processedSpecifiers.add(specifierKey);
          }
        });

      if (!merged) {
        const targetNewImport = importsToActuallyCreate.find(
          (imp) => (imp.source as any).value === sourcePath && imp.importKind === importKind,
        );

        if (targetNewImport) {
          if (
            !targetNewImport.specifiers!.some(
              (s) => (s as ImportSpecifier).imported.name === specifierToAdd.imported.name,
            )
          ) {
            targetNewImport.specifiers!.push(specifierToAdd);
          }
        } else {
          const freshImport = j.importDeclaration([specifierToAdd], j.literal(sourcePath));
          freshImport.importKind = importKind;
          importsToActuallyCreate.push(freshImport);
        }
        processedSpecifiers.add(specifierKey);
      }
    });

    if (importsToActuallyCreate.length > 0) {
      importsToActuallyCreate.forEach((imp) => {
        imp.specifiers?.sort((a, b) => {
          const aName =
            typeof (a as ImportSpecifier).imported.name === 'string'
              ? (a as ImportSpecifier).imported.name
              : ((a as ImportSpecifier).imported.name as any).name;
          const bName =
            typeof (b as ImportSpecifier).imported.name === 'string'
              ? (b as ImportSpecifier).imported.name
              : ((b as ImportSpecifier).imported.name as any).name;
          return aName.localeCompare(bName);
        });
      });
      importsToActuallyCreate.sort((a, b) =>
        ((a.source as any).value as string).localeCompare((b.source as any).value as string),
      );

      const lastExistingImport = root.find(j.ImportDeclaration).at(-1);
      if (lastExistingImport.length > 0) {
        lastExistingImport.insertAfter(importsToActuallyCreate);
      } else {
        root.get().node.program.body.unshift(...importsToActuallyCreate);
      }
    }
  }

  return modified ? root.toSource() : file.source;
}

export const parser = 'tsx';
export const extensions = ['ts', 'tsx'];
