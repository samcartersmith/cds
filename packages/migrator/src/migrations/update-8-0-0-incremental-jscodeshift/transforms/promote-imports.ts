import type { API, FileInfo, Options } from 'jscodeshift';

const V7_PACKAGES = [
  '@cbhq/cds-common',
  '@cbhq/cds-icons',
  '@cbhq/cds-illustrations',
  '@cbhq/cds-mobile-visualization',
  '@cbhq/cds-mobile',
  '@cbhq/cds-web-visualization',
  '@cbhq/cds-web',
  '@cbhq/cds-lottie-files',
  '@cbhq/ui-mobile-playground',
  '@cbhq/cds-utils',
];

const MIGRATION_MAP: Record<string, string[]> = {
  // from migrate-renamed-common-types
  renamedCommonTypes: [
    'ToastRefBaseProps',
    'ToastDuration',
    'ToastAction',
    'BannerVariant',
    'BannerStyleVariant',
    'WebBannerProps',
    'FallbackColor',
    'DotBaseProps',
    'ColorScheme',
    'StackBaseProps',
    'SpacingProps',
    'spacingHorizontal',
    'spacingVertical',
    'maxWidth',
    'OffsetProps',
    'horizontalSpacing',
    'FlexAlignCommon',
  ],
  // from migrate-icon-types
  iconTypes: ['IconName'],
  // from migrate-palette-types
  paletteTypes: [
    'PaletteAlias',
    'PaletteForeground',
    'PaletteBackground',
    'PaletteBorder',
    'PaletteOrTransparentColor',
    'PaletteValue',
    'Spectrum',
    'SpectrumAlias',
    'BorderRadius',
    'SpacingScale',
    'Typography',
    'PartialPaletteConfig',
  ],
  // from migrate-paletteValueToCssVar
  paletteValueToCssVar: ['paletteValueToCssVar'],
  // from migrate-web-tokens
  webTokens: ['borderRadius', 'borderWidth', 'spacing', 'palette', 'control', 'fontFamily'],
};

export default function transformer(file: FileInfo, api: API, options: Options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  let modified = false;

  const componentName = options.component as string | undefined;
  const hookName = options.hook as string | undefined;
  const typeName = options.type as string | undefined;
  const miscName = options.misc as string | undefined;
  const transformType = options['transform-type'] as string | undefined;

  const singleSpecifierName = componentName || hookName;
  const multiSpecifierKey = typeName || miscName;

  root
    .find(j.ImportDeclaration)
    .filter((path) => {
      const source = path.node.source.value as string;
      // Check if the import source is one of our target v7 packages
      return V7_PACKAGES.some((pkg) => source.startsWith(`${pkg}/v7`));
    })
    .forEach((path) => {
      const specifiersToPromote = transformType ? MIGRATION_MAP[transformType] || [] : [];
      const getExistingImportFor = (sourceValue: string, excludePath?: any) => {
        const matches = root
          .find(j.ImportDeclaration)
          .filter((p) => p.node.source.value === sourceValue && p !== excludePath);
        return matches.size() > 0 ? matches.get(0) : null;
      };
      const ensureImportSpecifiers = (targetImport: any, newSpecs: any[]) => {
        const existing = (targetImport.node.specifiers || []).filter(
          (s: any) => s.type === 'ImportSpecifier',
        );
        const hasImported = (name: string) =>
          existing.some((s: any) => (s.imported as any).name === name);
        for (const spec of newSpecs) {
          const importedName = (spec.imported as any).name as string;
          const localName = spec.local ? (spec.local as any).name : undefined;
          if (!hasImported(importedName)) {
            targetImport.node.specifiers = [
              ...(targetImport.node.specifiers || []),
              j.importSpecifier(
                j.identifier(importedName),
                localName ? j.identifier(localName) : null,
              ),
            ];
          }
        }
      };

      if (componentName) {
        // --component flag is present, so we do targeted promotion
        const specifiers = path.node.specifiers || [];
        const relevantSpecifiers = specifiers.filter(
          (spec) =>
            spec.type === 'ImportSpecifier' &&
            (spec.imported.name === componentName ||
              spec.imported.name === `${componentName}Props`),
        );

        if (relevantSpecifiers.length > 0) {
          const originalSource = path.node.source.value as string;
          const newSource = originalSource.replace('/v7', '');
          const existing = getExistingImportFor(newSource, path);
          const remainingSpecifiers = specifiers.filter(
            (spec) => !relevantSpecifiers.includes(spec),
          );

          if (remainingSpecifiers.length === 0) {
            // All specifiers are being promoted
            if (existing) {
              // Merge into existing import and remove this one
              ensureImportSpecifiers(existing, relevantSpecifiers);
              j(path).remove();
            } else {
              // Update the path directly
              path.node.source = j.stringLiteral(newSource);
            }
          } else {
            // Some specifiers are being promoted, split the import
            path.node.specifiers = remainingSpecifiers;
            if (existing) {
              ensureImportSpecifiers(existing, relevantSpecifiers);
            } else {
              const newImport = j.importDeclaration(relevantSpecifiers, j.literal(newSource));
              j(path).insertAfter(newImport);
            }
          }
          modified = true;
        }
      } else if (multiSpecifierKey) {
        // --type or --misc flag is present, so we do targeted promotion for multiple specifiers
        const specifiersToPromote = MIGRATION_MAP[multiSpecifierKey] || [];
        const allSpecifiers = path.node.specifiers || [];
        const relevantSpecifiers = allSpecifiers.filter(
          (spec) =>
            spec.type === 'ImportSpecifier' &&
            specifiersToPromote.includes(spec.imported.name as string),
        );
        const remainingSpecifiers = allSpecifiers.filter(
          (spec) => !relevantSpecifiers.includes(spec),
        );

        if (relevantSpecifiers.length > 0) {
          const originalSource = path.node.source.value as string;
          const newSource = originalSource.replace('/v7', '');
          const existing = getExistingImportFor(newSource, path);

          if (remainingSpecifiers.length === 0) {
            // All specifiers are being promoted
            if (existing) {
              ensureImportSpecifiers(existing, relevantSpecifiers);
              j(path).remove();
            } else {
              path.node.source = j.stringLiteral(newSource);
            }
          } else {
            // Some specifiers are being promoted, split the import
            path.node.specifiers = remainingSpecifiers;
            if (existing) {
              ensureImportSpecifiers(existing, relevantSpecifiers);
            } else {
              const newImport = j.importDeclaration(relevantSpecifiers, j.literal(newSource));
              j(path).insertAfter(newImport);
            }
          }
          modified = true;
        }
      } else if (!transformType || transformType === 'everything') {
        // No component or specific type, so we promote the entire import path
        const originalSource = path.node.source.value as string;
        path.node.source = j.stringLiteral(originalSource.replace('/v7', ''));
        modified = true;
      }
    });

  return modified ? root.toSource() : file.source;
}
