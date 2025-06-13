/**
 * Codemod to migrate base prop import paths from @cbhq/cds-common/types/* to their new locations in cds-web and cds-mobile.
 *
 * Example transformations:
 * Before:
 * ```
 * import { VisualizationContainerBaseProps } from '@cbhq/cds-common/types/VisualizationContainerBaseProps';
 * ```
 *
 * After:
 * ```
 * import { VisualizationContainerBaseProps } from '@cbhq/cds-web/visualizations/VisualizationContainer';
 * ```
 */
import {
  API,
  ASTPath,
  FileInfo,
  ImportDeclaration,
  ImportSpecifier,
  Options,
  StringLiteral,
} from 'jscodeshift';

const basePropToComponentPathMap: Record<string, string> = {
  // shared types
  VisualizationContainerBaseProps: 'visualizations/VisualizationContainer',
  VisualizationContainerDimension: 'visualizations/VisualizationContainer',
  UpsellCardBaseProps: 'cards/UpsellCard',
  ToastBaseProps: 'overlays/Toast',
  TabsProps: 'tabs/Tabs',
  TabProps: 'tabs/TabNavigation',
  TabLabelProps: 'tabs/TabLabel',
  TabIndicatorProps: 'tabs/TabIndicator',
  CustomTabProps: 'tabs/TabNavigation',
  TabNavigationProps: 'tabs/TabNavigation',
  TextInputBaseProps: 'controls/TextInput',
  TabbedChipsBaseProps: 'chips/TabbedChips',
  SparklinePathBaseProps: 'sparkline/SparklinePath',
  SparklineInteractiveBaseProps: 'sparkline/sparkline-interactive/SparklineInteractive',
  SparklineInteractiveAnimatedPathProps:
    'sparkline/sparkline-interactive/SparklineInteractiveAnimatedPath',
  SparklineInteractiveMarkerDatesProps:
    'sparkline/sparkline-interactive/SparklineInteractiveMarkerDates',
  SparklineAreaBaseProps: 'sparkline/SparklineArea',
  SparklineAreaPatternBaseProps: 'sparkline/SparklineAreaPattern',
  SparklineBaseProps: 'sparkline/Sparkline',
  SpacerBaseProps: 'layout/Spacer',
  ShakeBaseProps: 'motion/Shake',
  ShakeRefBaseProps: 'motion/Shake',
  SelectOptionBaseProps: 'controls/SelectOption',
  SelectBaseProps: 'controls/Select',
  SearchInputBaseProps: 'controls/SearchInput',
  RemoteImageGroupBaseProps: 'media/RemoteImageGroup',
  RemoteImageBaseProps: 'media/RemoteImage',
  RadioGroupBaseProps: 'controls/RadioGroup',
  ProgressCircleBaseProps: 'visualizations/ProgressCircle',
  ProgressCircleTextBaseProps: 'visualizations/ProgressCircle',
  ProgressInnerCircleBaseProps: 'visualizations/ProgressCircle',
  ProgressBaseProps: 'visualizations/ProgressBar',
  ProgressBarLabel: 'visualizations/getProgressBarLabelParts',
  ProgressBarWithFixedLabelsProps: 'visualizations/ProgressBarWithFixedLabels',
  ProgressBarWithFloatLabelProps: 'visualizations/ProgressBarWithFloatLabel',
  ProgressBarFloatLabelProps: 'visualizations/ProgressBarWithFloatLabel',
  ProgressBarFixedLabelContainerProps: 'visualizations/ProgressBarWithFixedLabels',
  ProgressBarFixedLabelBesideProps: 'visualizations/ProgressBarWithFixedLabels',
  ProgressBarFixedLabelProps: 'visualizations/ProgressBarWithFixedLabels',
  ProgressTextLabelProps: 'visualizations/ProgressTextLabel',
  PageHeaderBaseProps: 'page/PageHeader',
  PageFooterBaseProps: 'page/PageFooter',
  NudgeCardBaseProps: 'cards/NudgeCard',
  MultiContentModuleBaseProps: 'multi-content-module/MultiContentModule',
  HintMotionBaseProps: 'motion/types',
  ModalBaseProps: 'overlays/modal/Modal',
  ModalRefBaseProps: 'overlays/modal/Modal',
  ModalHeaderBaseProps: 'overlays/modal/ModalHeader',
  LottieBaseProps: 'animation/types',
  LinkBaseProps: 'typography/Link',
  LikeButtonBaseProps: 'cards/LikeButton',
  InteractableBaseProps: 'system/Interactable',
  IconCounterButtonBaseProps: 'buttons/IconCounterButton',
  IconBaseProps: 'icons/Icon',
  GroupDirection: 'layout/Group',
  GroupBaseProps: 'layout/Group',
  RenderGroupItem: 'layout/Group',
  FloatingAssetCardBaseProps: 'cards/FloatingAssetCard',
  FeedCardBaseProps: 'cards/FeedCard',
  FeatureEntryCardBaseProps: 'cards/FeatureEntryCard',
  DotSymbolBaseProps: 'dots/DotSymbol',
  DividerBaseProps: 'layout/Divider',
  DataCardBaseProps: 'cards/DataCard',
  CounterBaseProps: 'visualizations/Counter',
  ControlBaseProps: 'controls/Control',
  ContentCardBaseProps: 'cards/ContentCard/ContentCard',
  ContentCardBodyBaseProps: 'cards/ContentCard/ContentCardBody',
  ContentCardFooterBaseProps: 'cards/ContentCard/ContentCardFooter',
  ContentCardHeaderBaseProps: 'cards/ContentCard/ContentCardHeader',
  ContainedAssetCardBaseProps: 'cards/ContainedAssetCard',
  ColorSurgeBaseProps: 'motion/ColorSurge',
  ColorSurgeRefBaseProps: 'motion/ColorSurge',
  CoachmarkBaseProps: 'coachmark/Coachmark',
  ChipBaseProps: 'chips/ChipProps',
  CheckboxGroupBaseProps: 'controls/CheckboxGroup',
  CardGroupBaseProps: 'cards/CardGroup',
  CardFooterProps: 'cards/CardFooter',
  CardBodyBaseProps: 'cards/CardBody',
  CardBaseProps: 'cards/Card',
  AnnouncementCardBaseProps: 'cards/AnnouncementCard',
  AnimatedCaretBaseProps: 'motion/AnimatedCaret',
  BannerBaseProps: 'banner/Banner',
  AlertBaseProps: 'overlays/Alert',
  AccordionBaseProps: 'accordion/Accordion',
  AccordionItemBaseProps: 'accordion/AccordionItem',
  AccordionHeaderBaseProps: 'accordion/AccordionHeader',
  AccordionPanelBaseProps: 'accordion/AccordionPanel',
  AccordionMediaBaseProps: 'accordion/AccordionHeader',
  AccordionTitleBaseProps: 'accordion/AccordionHeader',
  AccordionIconBaseProps: 'accordion/AccordionHeader',
  AvatarBaseProps: 'media/Avatar',
  BoxBaseProps: 'layout/Box',
  ButtonBaseProps: 'buttons/Button',
  ButtonGroupBaseProps: 'buttons/ButtonGroup',
  CellSpacing: 'cells/Cell',
  CellBaseProps: 'cells/Cell',
  CellAccessoryType: 'cells/CellAccessory',
  CellAccessoryProps: 'cells/CellAccessory',
  CellDetailVariant: 'cells/CellDetail',
  CellDetailProps: 'cells/CellDetail',
  CellMediaType: 'cells/CellMedia',
  CellMediaIconProps: 'cells/CellMedia',
  CellMediaPictogramProps: 'cells/CellMedia',
  CellMediaOtherProps: 'cells/CellMedia',
  CellMediaProps: 'cells/CellMedia',
  ContentCellBaseProps: 'cells/ContentCell',
  ContentCellFallbackProps: 'cells/ContentCellFallback',
  ListCellBaseProps: 'cells/ListCell',
  ListCellFallbackProps: 'cells/ListCellFallback',
  CollapsibleBaseProps: 'collapsible/Collapsible',
  DotCountBaseProps: 'dots/DotCount',
  FallbackBaseProps: 'layout/Fallback',
  IconButtonBaseProps: 'buttons/IconButton',
  IllustrationNamesMap: 'illustrations/createIllustration',
  IllustrationDimensionsMap: 'illustrations/createIllustration',
  IllustrationBaseProps: 'illustrations/createIllustration',
  HeroSquareProps: 'illustrations/HeroSquare',
  SpotSquareProps: 'illustrations/SpotSquare',
  SpotIconProps: 'illustrations/SpotIcon',
  PictogramProps: 'illustrations/Pictogram',
  SpotRectangleProps: 'illustrations/SpotRectangle',
  InputStackBaseProps: 'controls/InputStack',
  NavigationBaseIconProps: 'icons/NavigationIcon',
  PulseBaseProps: 'motion/Pulse',
  PulseRefBaseProps: 'motion/Pulse',
  SparklineInteractiveHeaderProps:
    'sparkline/sparkline-interactive-header/SparklineInteractiveHeader',
  SparklineInteractiveSubHead: 'sparkline/sparkline-interactive-header/SparklineInteractiveHeader',
  SparklineInteractiveHeaderValues:
    'sparkline/sparkline-interactive-header/SparklineInteractiveHeader',
  SparklineInteractiveHeaderRef:
    'sparkline/sparkline-interactive-header/SparklineInteractiveHeader',
  TagBaseProps: 'tag/Tag',
  TextBaseProps: 'typography/Text',
  TooltipBaseProps: 'overlays/tooltip/TooltipProps',
  // mobile only types
  TrayRenderChildren: 'overlays/tray/Tray',
  TrayBaseProps: 'overlays/tray/Tray',
  DrawerRenderChildren: 'overlays/drawer/Drawer',
  DrawerBaseProps: 'overlays/drawer/Drawer',
  DrawerRefBaseProps: 'overlays/drawer/Drawer',
  // web only types
  TileBaseProps: 'buttons/Tile',
  GridColumnBaseProps: 'layout/GridColumn',
  GridBaseProps: 'layout/Grid',
};

const CDS_COMMON_PACKAGE = '@cbhq/cds-common';

// Create a set of just the base prop names
const basePropNamesSet = new Set(Object.keys(basePropToComponentPathMap));

export default function transformer(file: FileInfo, api: API, options: Options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  let modified = false; // Initialize modified flag

  // Access the passed 'platform' option
  const cliPlatform = options.platform as string | undefined;
  let isWebTarget = false;
  let isMobileTarget = false;

  if (cliPlatform && ['web', 'mobile'].includes(cliPlatform)) {
    console.log(`INFO [${file.path}]: Using platform='${cliPlatform}' from CLI options.`);
    if (cliPlatform === 'web') isWebTarget = true;
    if (cliPlatform === 'mobile') isMobileTarget = true;
  } else {
    console.warn(
      `WARN [${file.path}]: Missing or invalid --platform option (expected 'web' or 'mobile', received '${cliPlatform}'). Skipping file. `,
    );
    // If platform is not specified, return the original source unchanged
    return file.source;
  }

  const hasCDSCommonImport = root
    .find(j.ImportDeclaration)
    .some(
      (path: ASTPath<ImportDeclaration>) =>
        path.value.source &&
        typeof path.value.source.value === 'string' &&
        typeof path.value.source.value === 'string' &&
        path.value.source.value.startsWith(CDS_COMMON_PACKAGE),
    );
  if (!hasCDSCommonImport) {
    return file.source;
  }

  // Stage 1: Collect new import declarations and mark old specifiers for removal
  const candidateImports: ImportDeclaration[] = [];
  const specifiersToRemoveFromGeneralImports: {
    path: ASTPath<ImportDeclaration>;
    specifier: ImportSpecifier;
  }[] = [];

  root
    .find(j.ImportDeclaration, {
      source: {
        value: (v: string | boolean | null | number | RegExp) =>
          typeof v === 'string' && v.startsWith('@cbhq/cds-common'),
      },
    })
    .forEach((generalImportPath: ASTPath<ImportDeclaration>) => {
      const currentImportKind = generalImportPath.value.importKind || 'value';
      generalImportPath.value.specifiers?.forEach((specifier) => {
        if (specifier.type === 'ImportSpecifier' && specifier.imported.type === 'Identifier') {
          const importedName = specifier.imported.name;

          // Check if this is a base prop we need to move
          if (basePropNamesSet.has(importedName)) {
            const componentPath = basePropToComponentPathMap[importedName];
            if (componentPath) {
              let newPath = '';
              const isVisualizationPackage = componentPath.includes('sparkline');
              if (isWebTarget) {
                newPath = isVisualizationPackage
                  ? `@cbhq/cds-web-visualization/${componentPath}`
                  : `@cbhq/cds-web/${componentPath}`;
              } else if (isMobileTarget) {
                newPath = isVisualizationPackage
                  ? `@cbhq/cds-mobile-visualization/${componentPath}`
                  : `@cbhq/cds-mobile/${componentPath}`;
              } else {
                // Cannot determine platform, skip migrating this specifier
                console.warn(
                  `WARN [${file.path}]: No target platform determined for general import specifier ${importedName}. Skipping.`,
                );
                return; // Continue to next specifier
              }

              // Mark this specifier for removal
              specifiersToRemoveFromGeneralImports.push({ path: generalImportPath, specifier });

              // Create a new import declaration for this specific base prop
              const localName = specifier.local
                ? typeof specifier.local.name === 'string'
                  ? specifier.local.name
                  : (specifier.local.name as any).name
                : null;
              const newImportSpecifier = j.importSpecifier(
                j.identifier(importedName),
                localName ? j.identifier(localName) : null,
              );
              const newImport = j.importDeclaration([newImportSpecifier], j.literal(newPath));
              newImport.importKind = currentImportKind;
              candidateImports.push(newImport);
              modified = true; // Set modified flag
            }
          }
        }
      });
    });

  // Early exit if no specifiers were identified for moving
  if (specifiersToRemoveFromGeneralImports.length === 0) {
    return file.source;
  }

  // Stage 2: Remove marked specifiers and potentially the whole general import
  const generalImportsToModify = new Map<ASTPath<ImportDeclaration>, ImportSpecifier[]>();
  specifiersToRemoveFromGeneralImports.forEach(({ path, specifier }) => {
    if (!generalImportsToModify.has(path)) {
      generalImportsToModify.set(path, []);
    }
    generalImportsToModify.get(path)?.push(specifier);
  });

  generalImportsToModify.forEach((specifiersToRemove, importPath) => {
    const originalSpecifierCount = importPath.value.specifiers?.length ?? 0;
    if (originalSpecifierCount > 0) {
      const originalSpecifiers = importPath.value.specifiers ?? [];
      importPath.value.specifiers = originalSpecifiers.filter(
        (spec) => !specifiersToRemove.includes(spec as ImportSpecifier),
      );
      if (importPath.value.specifiers.length < originalSpecifierCount) {
        modified = true;
        if (importPath.value.specifiers.length === 0) {
          j(importPath).remove();
        }
      }
    }
  });

  // Stage 3: Add/Merge new imports
  if (candidateImports.length > 0) {
    const importsToActuallyCreate: ImportDeclaration[] = [];
    const processedSpecifiers = new Set<string>(); // path|kind|importedName

    candidateImports.forEach((candidateImportDeclaration) => {
      const sourcePath = (candidateImportDeclaration.source as StringLiteral).value;
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
            modified = true;
            processedSpecifiers.add(specifierKey);
          } else {
            merged = true; // Already present, consider it merged/handled
            processedSpecifiers.add(specifierKey);
          }
        });

      if (!merged) {
        const targetNewImport = importsToActuallyCreate.find(
          (imp) =>
            (imp.source as StringLiteral).value === sourcePath && imp.importKind === importKind,
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
      modified = true;
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
        (a.source as StringLiteral).value.localeCompare((b.source as StringLiteral).value),
      );

      const lastExistingImport = root.find(j.ImportDeclaration).at(-1);
      if (lastExistingImport.length > 0) {
        lastExistingImport.insertAfter(importsToActuallyCreate);
      } else {
        root.get().node.program.body.unshift(...importsToActuallyCreate);
      }
    }
  }

  // Return original source if no modifications were made
  if (modified) {
    return root.toSource();
  }
  return file.source;
}

export const parser = 'tsx';
export const extensions = ['ts', 'tsx'];
