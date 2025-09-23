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
import type {
  API,
  ASTPath,
  FileInfo,
  ImportDeclaration,
  ImportSpecifier,
  Options,
} from 'jscodeshift';

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
  SpectrumAlias: 'ThemeVars.SpectrumColor',
  BorderRadius: 'ThemeVars.BorderRadius',
  SpacingScale: 'ThemeVars.Space',
  Typography: 'ThemeVars.FontFamily',
  PartialPaletteConfig: 'Partial<Theme["color"]>',
};

const CDS_COMMON_PACKAGE = '@cbhq/cds-common';
const CDS_WEB_PACKAGE = '@cbhq/cds-web';
const CDS_MOBILE_PACKAGE = '@cbhq/cds-mobile';
const THEME_IMPORT_PATH = '@cbhq/cds-common/core/theme';
const WEB_THEME_IMPORT_PATH = '@cbhq/cds-web/core/theme';
const MOBILE_THEME_IMPORT_PATH = '@cbhq/cds-mobile/core/theme';

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

  // Step 2: Check for non-type usages before we start replacing types
  // This will help us determine which imports can be safely removed
  const nonTypeUsages = new Set<string>();

  paletteImports.forEach(({ localName }) => {
    // Check for usage as values, not just types
    const valueUsages = root.find(j.Identifier, { name: localName }).filter((idPath) => {
      const parent = idPath.parentPath?.node;
      const grandParent = idPath.parentPath?.parentPath?.node;

      // Skip import statements - this is the key fix
      if (parent?.type === 'ImportSpecifier') return false;

      // Skip if this identifier is part of an import declaration
      let currentPath = idPath.parentPath;
      while (currentPath) {
        if (currentPath.node.type === 'ImportDeclaration') return false;
        currentPath = currentPath.parentPath;
      }

      // Skip type references - these will be replaced
      if (parent?.type === 'TSTypeReference') return false;

      // Skip type annotations - these will be replaced
      if (parent?.type === 'TSTypeAnnotation') return false;

      // Skip type parameters - these will be replaced
      if (parent?.type === 'TSTypeParameterInstantiation') return false;

      // Skip union/intersection types - these will be replaced
      if (parent?.type === 'TSUnionType' || parent?.type === 'TSIntersectionType') return false;

      // Skip array types - these will be replaced
      if (parent?.type === 'TSArrayType') return false;

      // Skip qualified names that are part of type references
      if (parent?.type === 'TSQualifiedName') return false;

      // Skip property signatures in type literals - these will be replaced
      if (parent?.type === 'TSPropertySignature') return false;

      // Skip type assertions - these will be replaced but logged
      if (parent?.type === 'TSAsExpression' || parent?.type === 'TSTypeAssertion') return false;

      // Skip if inside a type literal that's used as a type parameter
      if (grandParent?.type === 'TSTypeLiteral') return false;

      // Skip if this is part of a type parameter declaration
      if (parent?.type === 'TSTypeParameter') return false;

      // Skip if this is part of a mapped type
      if (parent?.type === 'TSMappedType') return false;

      // Skip if this is part of a conditional type
      if (parent?.type === 'TSConditionalType') return false;

      // Skip if this is part of an index signature
      if (parent?.type === 'TSIndexSignature') return false;

      // Count everything else as non-type usage
      return true;
    });

    if (valueUsages.length > 0) {
      nonTypeUsages.add(localName);
    }
  });

  // Step 3: Check usage and replace palette types with their mapped types
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

    // 4a. Handle type annotations in variable declarations (e.g., const x: SpacingScale[] = ...)
    root.find(j.TSTypeAnnotation).forEach((path) => {
      const typeAnnotation = path.node.typeAnnotation;

      // Direct type reference in type annotation
      if (
        typeAnnotation.type === 'TSTypeReference' &&
        typeAnnotation.typeName.type === 'Identifier' &&
        typeAnnotation.typeName.name === localName
      ) {
        path.node.typeAnnotation = createTypeReference(originalName);
        foundUsages = true;
      }

      // Array type in type annotation (e.g., const x: SpacingScale[] = ...)
      if (
        typeAnnotation.type === 'TSArrayType' &&
        typeAnnotation.elementType.type === 'TSTypeReference' &&
        typeAnnotation.elementType.typeName.type === 'Identifier' &&
        typeAnnotation.elementType.typeName.name === localName
      ) {
        typeAnnotation.elementType = createTypeReference(originalName);
        foundUsages = true;
      }

      // Union type in type annotation (e.g., const x: SpacingScale | undefined = ...)
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
        if (unionChanged) foundUsages = true;
      }
    });

    // 4b. Handle type annotations on variable declarators (e.g., const [x, y]: SpacingScale[] = ...)
    root.find(j.VariableDeclarator).forEach((path) => {
      const declarator = path.node;
      if (
        declarator.id &&
        'typeAnnotation' in declarator.id &&
        declarator.id.typeAnnotation &&
        declarator.id.typeAnnotation.type === 'TSTypeAnnotation'
      ) {
        const typeAnnotation = declarator.id.typeAnnotation.typeAnnotation;

        // Direct type reference in variable declarator type annotation
        if (
          typeAnnotation.type === 'TSTypeReference' &&
          typeAnnotation.typeName.type === 'Identifier' &&
          typeAnnotation.typeName.name === localName
        ) {
          declarator.id.typeAnnotation.typeAnnotation = createTypeReference(originalName);
          foundUsages = true;
        }

        // Array type in variable declarator type annotation (e.g., const [x, y]: SpacingScale[] = ...)
        if (
          typeAnnotation.type === 'TSArrayType' &&
          typeAnnotation.elementType.type === 'TSTypeReference' &&
          typeAnnotation.elementType.typeName.type === 'Identifier' &&
          typeAnnotation.elementType.typeName.name === localName
        ) {
          typeAnnotation.elementType = createTypeReference(originalName);
          foundUsages = true;
        }

        // Union type in variable declarator type annotation
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
          if (unionChanged) foundUsages = true;
        }
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

  // Helper function to add type-only imports
  function addTypeImport(specifierName: string, importPath: string) {
    const existingImport = root.find(j.ImportDeclaration, {
      source: { value: importPath },
    });

    if (existingImport.length > 0) {
      // Check if the specifier already exists
      const hasSpecifier = existingImport.some((path) => {
        return (
          path.node.specifiers?.some(
            (spec: any) =>
              spec.type === 'ImportSpecifier' &&
              spec.imported &&
              spec.imported.name === specifierName,
          ) ?? false
        );
      });

      if (!hasSpecifier) {
        // Add to existing import
        existingImport.forEach((path) => {
          if (path.node.specifiers) {
            path.node.specifiers.push(j.importSpecifier(j.identifier(specifierName)));
          }
        });
      }
    } else {
      // Create new type-only import declaration
      const typeImport = j.importDeclaration(
        [j.importSpecifier(j.identifier(specifierName))],
        j.literal(importPath),
      );

      // Set as type-only import - this is the correct way for TypeScript
      typeImport.importKind = 'type';

      const lastImport = root.find(j.ImportDeclaration).at(-1);
      if (lastImport.length > 0) {
        lastImport.insertAfter(typeImport);
      } else {
        root.get().node.program.body.unshift(typeImport);
      }
    }
  }

  // Step 4: Add new type imports if they don't exist
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
  const needsThemeImport = paletteImports.some(
    ({ originalName }) =>
      PALETTE_TYPES_TO_MIGRATE[originalName as keyof typeof PALETTE_TYPES_TO_MIGRATE] ===
      'Partial<Theme["color"]>',
  );

  if (needsThemeVarsImport) {
    addTypeImport('ThemeVars', THEME_IMPORT_PATH);
  }

  if (needsColorSchemeImport) {
    addTypeImport('ColorScheme', THEME_IMPORT_PATH);
  }

  if (needsThemeImport) {
    const platform = options.platform as string | undefined;
    const isMobilePlatform = platform === 'mobile';
    addTypeImport('Theme', isMobilePlatform ? MOBILE_THEME_IMPORT_PATH : WEB_THEME_IMPORT_PATH);
  }

  // Step 5: Remove imports for types that were successfully replaced and have no non-type usages
  paletteImports.forEach(({ localName, specifier, importPath }) => {
    // Only remove imports for types that:
    // 1. Had their type usages successfully replaced (in typesWithUsage)
    // 2. Have no remaining non-type usages (not in nonTypeUsages)
    const shouldRemoveImport = typesWithUsage.has(localName) && !nonTypeUsages.has(localName);

    if (shouldRemoveImport) {
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

  // Step 6: Log types used in assertions for manual review
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
