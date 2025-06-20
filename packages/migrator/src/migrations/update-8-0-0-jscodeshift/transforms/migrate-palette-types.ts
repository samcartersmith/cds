/**
 * Codemod to migrate the palette types to the new ThemeVars.Color type.
 *
 * Example transformations:
 * Before:
 * import { PaletteAlias, PaletteForeground, PaletteBackground, PaletteBorder, PaletteOrTransparentColor } from '@cbhq/cds-common';
 * type Props = {
 *   baseColor: PaletteAlias;
 *   baseColorForeground: PaletteForeground;
 *   baseColorBackground: PaletteBackground;
 *   baseColorBorder: PaletteBorder;
 *   baseColorOrTransparent: PaletteOrTransparentColor;
 *   cellColor?: PaletteAlias | ((data: T) => PaletteAlias);
 *   color?: AdditionalColorKeys | PaletteAlias;
 * };
 *
 * const useColors = <AdditionalColorKeys extends string>(
 *   additionalPalette: AdditionalPalette<AdditionalColorKeys>,
 *   ...colorKeys: (PaletteAlias | AdditionalColorKeys)[]
 * ) => {
 *   const palette = usePalette();
 *
 *   return useMemo(() => {
 *     return colorKeys.map(
 *       colorKey =>
 *         palette[colorKey as PaletteAlias] ?? // This will be replaced and logged for review
 *         additionalPalette[colorKey]
 *     );
 *   }, [palette, colorKeys, additionalPalette]);
 * };
 *
 * const Wrapper = styled.div<{
 *   backgroundColor?: PaletteBackground;
 * }>`
 *   display: flex;
 * `
 *
 * After:
 * import type { ThemeVars } from '@cbhq/cds-common/core/theme';
 * type Props = {
 *   baseColor: ThemeVars.Color;
 *   baseColorForeground: ThemeVars.Color;
 *   baseColorBackground: ThemeVars.Color;
 *   baseColorBorder: ThemeVars.Color;
 *   baseColorOrTransparent: ThemeVars.Color;
 *   cellColor?: ThemeVars.Color | ((data: T) => ThemeVars.Color);
 *   color?:  AdditionalColorKeys | ThemeVars.Color;
 * };
 *
 * const useColors = <AdditionalColorKeys extends string>(
 *   additionalPalette: AdditionalPalette<AdditionalColorKeys>,
 *   ...colorKeys: (ThemeVars.Color | AdditionalColorKeys)[]
 * ) => {
 *   const palette = usePalette();
 *
 *   return useMemo(() => {
 *     return colorKeys.map(
 *       colorKey =>
 *         palette[colorKey as ThemeVars.Color] ?? // Type assertion replaced and logged for review
 *         additionalPalette[colorKey]
 *     );
 *   }, [palette, colorKeys, additionalPalette]);
 * };
 *
 *  const Wrapper = styled.div<{
 *   backgroundColor?: ThemeVars.Color;
 * }>`
 *   display: flex;
 * `
 *
 * Note: Type assertions are automatically replaced but logged to manual-migration-log.txt
 * for manual review to ensure the assertion is still valid.
 *
 */
import { API, ASTPath, FileInfo, ImportDeclaration, ImportSpecifier, Options } from 'jscodeshift';

import { logManualMigration } from '../helpers/manual-migration-logger';

// Palette types that should be migrated to ThemeVars.Color
const PALETTE_TYPES_TO_MIGRATE = {
  PaletteAlias: 'ThemeVars.Color',
  PaletteForeground: 'ThemeVars.Color',
  PaletteBackground: 'ThemeVars.Color',
  PaletteBorder: 'ThemeVars.Color',
  PaletteOrTransparentColor: 'ThemeVars.Color',
  PaletteValue: 'ThemeVars.SpectrumColor',
  Spectrum: 'ColorScheme',
};

const CDS_COMMON_PACKAGE = '@cbhq/cds-common';
const CDS_WEB_PACKAGE = '@cbhq/cds-web';
const CDS_MOBILE_PACKAGE = '@cbhq/cds-mobile';
const THEME_VARS_IMPORT_PATH = '@cbhq/cds-common/core/theme';
const COLOR_SCHEME_IMPORT_PATH = '@cbhq/cds-common/core/theme';

function getIdentifierName(node: any): string {
  if (typeof node === 'string') return node;
  if (typeof node?.name === 'string') return node.name;
  return '';
}

export default function transformer(file: FileInfo, api: API, options: Options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  let hasChanges = false;

  function createTypeReference(oldTypeName: string) {
    const newTypeName =
      PALETTE_TYPES_TO_MIGRATE[oldTypeName as keyof typeof PALETTE_TYPES_TO_MIGRATE];
    if (newTypeName === 'ColorScheme') {
      return j.tsTypeReference(j.identifier('ColorScheme'));
    } else if (newTypeName.startsWith('ThemeVars.')) {
      const propertyName = newTypeName.split('.')[1];
      return j.tsTypeReference(
        j.tsQualifiedName(j.identifier('ThemeVars'), j.identifier(propertyName)),
      );
    }
    return j.tsTypeReference(j.identifier(newTypeName));
  }

  // Step 1: Find all palette type imports
  const paletteImports: Array<{
    localName: string;
    originalName: string;
    specifier: ImportSpecifier;
    importPath: ASTPath<ImportDeclaration>;
  }> = [];

  root
    .find(j.ImportDeclaration)
    .filter((path) => {
      const sourceValue = path.node.source.value;
      return (
        typeof sourceValue === 'string' &&
        (sourceValue.startsWith(CDS_COMMON_PACKAGE) ||
          sourceValue.startsWith(CDS_WEB_PACKAGE) ||
          sourceValue.startsWith(CDS_MOBILE_PACKAGE))
      );
    })
    .forEach((importPath) => {
      importPath.node.specifiers?.forEach((specifier) => {
        if (specifier.type === 'ImportSpecifier') {
          const importedName = getIdentifierName(specifier.imported);
          if (Object.keys(PALETTE_TYPES_TO_MIGRATE).includes(importedName)) {
            const localName = getIdentifierName(specifier.local) || importedName;
            paletteImports.push({
              localName,
              originalName: importedName,
              specifier,
              importPath,
            });
          }
        }
      });
    });

  if (paletteImports.length === 0) {
    return file.source;
  }

  // Step 2: Check usage and replace palette types with their mapped types
  const typesWithUsage = new Set<string>();
  const typesInAssertions = new Set<string>();

  paletteImports.forEach(({ localName, originalName }) => {
    let foundUsages = false;

    // 1. Handle direct TSTypeReference nodes (e.g., color: PaletteForeground)
    const directUsages = root.find(j.TSTypeReference).filter((path) => {
      return path.node.typeName.type === 'Identifier' && path.node.typeName.name === localName;
    });

    if (directUsages.length > 0) {
      // Check if any of these are in type assertions
      directUsages.forEach((path) => {
        let parent = path.parentPath;
        while (parent) {
          if (parent.node.type === 'TSAsExpression' || parent.node.type === 'TSTypeAssertion') {
            typesInAssertions.add(localName);
            break;
          }
          parent = parent.parentPath;
        }
      });

      directUsages.replaceWith(() => createTypeReference(originalName));
      foundUsages = true;
    }

    // 2. Handle union types (e.g., PaletteForeground | undefined)
    root.find(j.TSUnionType).forEach((path) => {
      let unionChanged = false;
      path.node.types = path.node.types.map((type) => {
        if (
          type.type === 'TSTypeReference' &&
          type.typeName.type === 'Identifier' &&
          type.typeName.name === localName
        ) {
          // Check if this union type is in a type assertion
          let parent = path.parentPath;
          while (parent) {
            if (parent.node.type === 'TSAsExpression' || parent.node.type === 'TSTypeAssertion') {
              typesInAssertions.add(localName);
              break;
            }
            parent = parent.parentPath;
          }

          unionChanged = true;
          return createTypeReference(originalName);
        }
        return type;
      });
      if (unionChanged) foundUsages = true;
    });

    // 3. Handle intersection types (e.g., PaletteForeground & SomeOtherType)
    root.find(j.TSIntersectionType).forEach((path) => {
      let intersectionChanged = false;
      path.node.types = path.node.types.map((type) => {
        if (
          type.type === 'TSTypeReference' &&
          type.typeName.type === 'Identifier' &&
          type.typeName.name === localName
        ) {
          // Check if this intersection type is in a type assertion
          let parent = path.parentPath;
          while (parent) {
            if (parent.node.type === 'TSAsExpression' || parent.node.type === 'TSTypeAssertion') {
              typesInAssertions.add(localName);
              break;
            }
            parent = parent.parentPath;
          }

          intersectionChanged = true;
          return createTypeReference(originalName);
        }
        return type;
      });
      if (intersectionChanged) foundUsages = true;
    });

    // 4. Handle array types (e.g., PaletteForeground[])
    root.find(j.TSArrayType).forEach((path) => {
      if (
        path.node.elementType.type === 'TSTypeReference' &&
        path.node.elementType.typeName.type === 'Identifier' &&
        path.node.elementType.typeName.name === localName
      ) {
        // Check if this array type is in a type assertion
        let parent = path.parentPath;
        while (parent) {
          if (parent.node.type === 'TSAsExpression' || parent.node.type === 'TSTypeAssertion') {
            typesInAssertions.add(localName);
            break;
          }
          parent = parent.parentPath;
        }

        path.node.elementType = createTypeReference(originalName);
        foundUsages = true;
      }
    });

    // 5. Handle generic type arguments in function calls (e.g., useState<PaletteForeground | undefined>)
    root.find(j.CallExpression).forEach((path) => {
      // Cast to any to access both possible properties
      const callNode = path.node as any;
      const typeParams = callNode.typeParameters || callNode.typeArguments;
      if (typeParams && typeParams.params) {
        let argsChanged = false;
        typeParams.params = typeParams.params.map((typeArg: any) => {
          // Handle direct type reference in generic
          if (
            typeArg.type === 'TSTypeReference' &&
            typeArg.typeName &&
            typeArg.typeName.type === 'Identifier' &&
            typeArg.typeName.name === localName
          ) {
            argsChanged = true;
            return createTypeReference(originalName);
          }

          // Handle union type in generic (e.g., useState<PaletteForeground | undefined>)
          if (typeArg.type === 'TSUnionType' && typeArg.types) {
            let unionChanged = false;
            typeArg.types = typeArg.types.map((unionMember: any) => {
              if (
                unionMember.type === 'TSTypeReference' &&
                unionMember.typeName &&
                unionMember.typeName.type === 'Identifier' &&
                unionMember.typeName.name === localName
              ) {
                unionChanged = true;
                return createTypeReference(originalName);
              }
              return unionMember;
            });
            if (unionChanged) argsChanged = true;
          }

          // Handle object type literals in generic (e.g., createContext<{ colorMode: Spectrum }>)
          if (typeArg.type === 'TSTypeLiteral' && typeArg.members) {
            let objectChanged = false;
            typeArg.members = typeArg.members.map((member: any) => {
              if (
                member.type === 'TSPropertySignature' &&
                member.typeAnnotation &&
                member.typeAnnotation.typeAnnotation
              ) {
                const typeAnnotation = member.typeAnnotation.typeAnnotation;

                // Direct type reference in object property
                if (
                  typeAnnotation.type === 'TSTypeReference' &&
                  typeAnnotation.typeName &&
                  typeAnnotation.typeName.type === 'Identifier' &&
                  typeAnnotation.typeName.name === localName
                ) {
                  member.typeAnnotation.typeAnnotation = createTypeReference(originalName);
                  objectChanged = true;
                }

                // Union type in object property (e.g., { color: PaletteForeground | undefined })
                if (typeAnnotation.type === 'TSUnionType' && typeAnnotation.types) {
                  let unionChanged = false;
                  typeAnnotation.types = typeAnnotation.types.map((unionType: any) => {
                    if (
                      unionType.type === 'TSTypeReference' &&
                      unionType.typeName &&
                      unionType.typeName.type === 'Identifier' &&
                      unionType.typeName.name === localName
                    ) {
                      unionChanged = true;
                      return createTypeReference(originalName);
                    }
                    return unionType;
                  });
                  if (unionChanged) objectChanged = true;
                }
              }
              return member;
            });
            if (objectChanged) argsChanged = true;
          }

          return typeArg;
        });
        if (argsChanged) foundUsages = true;
      }
    });

    // 6. Handle type parameter instantiation (e.g., styled.div<{ color: PaletteForeground }>)
    root.find(j.TSTypeParameterInstantiation).forEach((path) => {
      let instantiationChanged = false;
      path.node.params = path.node.params.map((param: any) => {
        // Handle direct type reference in type parameter
        if (
          param.type === 'TSTypeReference' &&
          param.typeName &&
          param.typeName.type === 'Identifier' &&
          param.typeName.name === localName
        ) {
          instantiationChanged = true;
          return createTypeReference(originalName);
        }

        // Handle object types with palette type properties (e.g., { color: PaletteForeground })
        if (param.type === 'TSTypeLiteral' && param.members) {
          let objectChanged = false;
          param.members = param.members.map((member: any) => {
            if (
              member.type === 'TSPropertySignature' &&
              member.typeAnnotation &&
              member.typeAnnotation.typeAnnotation
            ) {
              const typeAnnotation = member.typeAnnotation.typeAnnotation;

              // Direct type reference
              if (
                typeAnnotation.type === 'TSTypeReference' &&
                typeAnnotation.typeName &&
                typeAnnotation.typeName.type === 'Identifier' &&
                typeAnnotation.typeName.name === localName
              ) {
                member.typeAnnotation.typeAnnotation = createTypeReference(originalName);
                objectChanged = true;

                // Log styled-components usage for manual review
                typesInAssertions.add(localName);
              }

              // Union type with palette type
              if (typeAnnotation.type === 'TSUnionType' && typeAnnotation.types) {
                let unionChanged = false;
                typeAnnotation.types = typeAnnotation.types.map((unionType: any) => {
                  if (
                    unionType.type === 'TSTypeReference' &&
                    unionType.typeName &&
                    unionType.typeName.type === 'Identifier' &&
                    unionType.typeName.name === localName
                  ) {
                    unionChanged = true;
                    typesInAssertions.add(localName);
                    return createTypeReference(originalName);
                  }
                  return unionType;
                });
                if (unionChanged) objectChanged = true;
              }
            }
            return member;
          });
          if (objectChanged) instantiationChanged = true;
        }

        return param;
      });
      if (instantiationChanged) foundUsages = true;
    });

    if (foundUsages) {
      typesWithUsage.add(localName);
      hasChanges = true;
    }
  });

  if (!hasChanges) {
    return file.source;
  }

  // Step 3: Add new type imports if they don't exist
  const needsThemeVarsImport = paletteImports.some(({ originalName }) =>
    PALETTE_TYPES_TO_MIGRATE[originalName as keyof typeof PALETTE_TYPES_TO_MIGRATE].startsWith(
      'ThemeVars.',
    ),
  );
  const needsColorSchemeImport = paletteImports.some(
    ({ originalName }) =>
      PALETTE_TYPES_TO_MIGRATE[originalName as keyof typeof PALETTE_TYPES_TO_MIGRATE] ===
      'ColorScheme',
  );

  if (needsThemeVarsImport) {
    const existingThemeVarsImport = root.find(j.ImportDeclaration, {
      source: { value: THEME_VARS_IMPORT_PATH },
    });

    if (existingThemeVarsImport.length === 0) {
      const themeVarsImport = j.importDeclaration(
        [j.importSpecifier(j.identifier('ThemeVars'))],
        j.literal(THEME_VARS_IMPORT_PATH),
      );
      themeVarsImport.importKind = 'type';

      const lastImport = root.find(j.ImportDeclaration).at(-1);
      if (lastImport.length > 0) {
        lastImport.insertAfter(themeVarsImport);
      } else {
        root.get().node.program.body.unshift(themeVarsImport);
      }
    }
  }

  if (needsColorSchemeImport) {
    const existingColorSchemeImport = root.find(j.ImportDeclaration, {
      source: { value: COLOR_SCHEME_IMPORT_PATH },
    });

    if (existingColorSchemeImport.length === 0) {
      const colorSchemeImport = j.importDeclaration(
        [j.importSpecifier(j.identifier('ColorScheme'))],
        j.literal(COLOR_SCHEME_IMPORT_PATH),
      );
      colorSchemeImport.importKind = 'type';

      const lastImport = root.find(j.ImportDeclaration).at(-1);
      if (lastImport.length > 0) {
        lastImport.insertAfter(colorSchemeImport);
      } else {
        root.get().node.program.body.unshift(colorSchemeImport);
      }
    }
  }

  // Step 4: Remove imports only for types that have no remaining usage in the file
  paletteImports.forEach(({ localName, specifier, importPath }) => {
    // Check if there are any remaining TSTypeReference nodes using this palette type
    // (This excludes the new type references we just created)
    const remainingTypeUsages = root.find(j.TSTypeReference).filter((path) => {
      return path.node.typeName.type === 'Identifier' && path.node.typeName.name === localName;
    });

    // Also check for other kinds of usage (like in expressions, variable names, etc.)
    const remainingIdentifierUsages = root
      .find(j.Identifier, { name: localName })
      .filter((idPath) => {
        const parent = idPath.parentPath?.node;
        // Exclude the import statement itself
        if (parent?.type === 'ImportSpecifier') return false;
        // Exclude TSTypeReference (we already checked those above)
        if (parent?.type === 'TSTypeReference') return false;
        // Count everything else as usage
        return true;
      });

    // Only remove the import if there are NO remaining usages of any kind
    if (remainingTypeUsages.length === 0 && remainingIdentifierUsages.length === 0) {
      const specifiers = importPath.node.specifiers;
      if (specifiers) {
        const index = specifiers.indexOf(specifier);
        if (index > -1) {
          specifiers.splice(index, 1);
        }
        // Remove entire import if no specifiers left
        if (specifiers.length === 0) {
          j(importPath).remove();
        }
      }
    }
  });

  // Step 5: Log types used in assertions for manual review
  if (typesInAssertions.size > 0) {
    const assertionTypes = Array.from(typesInAssertions).join(', ');
    logManualMigration(
      file.path,
      assertionTypes,
      'Type assertions found. Please verify these assertions are still valid after migration to new types.',
    );
  }

  return root.toSource();
}

export const parser = 'tsx';
export const extensions = ['ts', 'tsx'];
