/**
 * Codemod to migrate mobile import paths that have changed in v8.
 *
 * Example transformations:
 * Before:
 * import { interpolateSubHeadText } from '@cbhq/cds-common/visualizations/interpolateSubHeadText';
 *
 * After:
 * import { interpolateSubHeadText } from '@cbhq/mobile-visualization/sparkline/sparkline-interactive-header/SparklineInteractiveHeader';
 */
import type { API, ASTPath, FileInfo, ImportDeclaration, Options } from 'jscodeshift';

// Define the mapping from old paths to new paths
export const mobilePathMigrationMap: Record<string, string> = {
  '@cbhq/cds-mobile/v7/animation/LottieProps': '@cbhq/cds-mobile/animation/types',
  '@cbhq/cds-mobile/v7/alpha/banner/Banner': '@cbhq/cds-mobile/banner/Banner',
  '@cbhq/cds-common/v7/visualizations/interpolateSubHeadText':
    '@cbhq/mobile-visualization/sparkline/sparkline-interactive-header/SparklineInteractiveHeader',
  '@cbhq/cds-mobile/v7/overlays/Tray/Tray': '@cbhq/cds-mobile/overlays/tray/Tray',
  '@cbhq/cds-mobile/v7/overlays/Tooltip/Tooltip': '@cbhq/cds-mobile/overlays/tooltip/Tooltip',
  '@cbhq/cds-mobile/v7/overlays/Tooltip/InternalTooltip':
    '@cbhq/cds-mobile/overlays/tooltip/InternalTooltip',
  '@cbhq/cds-mobile/v7/overlays/Tooltip/TooltipProps':
    '@cbhq/cds-mobile/overlays/tooltip/TooltipProps',
  '@cbhq/cds-mobile/v7/overlays/Tooltip/useTooltipAnimation':
    '@cbhq/cds-mobile/overlays/tooltip/useTooltipAnimation',
  '@cbhq/cds-mobile/v7/overlays/Tooltip/useTooltipPosition':
    '@cbhq/cds-mobile/overlays/tooltip/useTooltipPosition',
  '@cbhq/cds-mobile/v7/overlays/Overlay/Overlay': '@cbhq/cds-mobile/overlays/overlay/Overlay',
  '@cbhq/cds-mobile/v7/overlays/Modal/ModalFooter': '@cbhq/cds-mobile/overlays/modal/ModalFooter',
  '@cbhq/cds-mobile/v7/overlays/Modal/ModalBody': '@cbhq/cds-mobile/overlays/modal/ModalBody',
  '@cbhq/cds-mobile/v7/overlays/Modal/ModalHeader': '@cbhq/cds-mobile/overlays/modal/ModalHeader',
  '@cbhq/cds-mobile/v7/overlays/Modal/Modal': '@cbhq/cds-mobile/overlays/modal/Modal',
  '@cbhq/cds-mobile/v7/overlays/Modal/useModalAnimation':
    '@cbhq/cds-mobile/overlays/modal/useModalAnimation',
  '@cbhq/cds-mobile/v7/overlays/HandleBar/HandleBar':
    '@cbhq/cds-mobile/overlays/handlebar/HandleBar',
  '@cbhq/cds-mobile/v7/overlays/Drawer/Drawer': '@cbhq/cds-mobile/overlays/drawer/Drawer',
  '@cbhq/cds-mobile/v7/overlays/Drawer/DrawerStatusBar':
    '@cbhq/cds-mobile/overlays/drawer/DrawerStatusBar',
  '@cbhq/cds-mobile/v7/overlays/Drawer/useDrawerAnimation':
    '@cbhq/cds-mobile/overlays/drawer/useDrawerAnimation',
  '@cbhq/cds-mobile/v7/overlays/Drawer/useDrawerPanResponder':
    '@cbhq/cds-mobile/overlays/drawer/useDrawerPanResponder',
  '@cbhq/cds-mobile/v7/overlays/Drawer/useDrawerSpacing':
    '@cbhq/cds-mobile/overlays/drawer/useDrawerSpacing',
};

export default function transformer(file: FileInfo, api: API, options: Options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  let modified = false;

  const targetComponent = options.component as string | undefined;
  const importPath = options.importPath as string | undefined;

  // Check if file has any @cbhq/cds-mobile imports
  const hasMobileImports = root
    .find(j.ImportDeclaration)
    .some((path: ASTPath<ImportDeclaration>) => {
      const sourceValue = path.value.source.value;
      return typeof sourceValue === 'string' && sourceValue.includes('@cbhq/cds-mobile');
    });

  if (!hasMobileImports) {
    return file.source; // Skip file if no mobile imports found
  }

  // If targetComponent is specified, check if it exists in the migration map
  if (targetComponent) {
    const hasComponentInMap = Object.keys(mobilePathMigrationMap).some((key) =>
      key.endsWith(`/${targetComponent}`),
    );

    if (!hasComponentInMap) {
      console.log(
        `Component "${targetComponent}" not found in mobilePathMigrationMap. Skipping file.`,
      );
      return file.source;
    }
  }

  // If importPathName is specified, check if it exists in the migration map
  if (importPath) {
    const hasImportPathInMap = Object.keys(mobilePathMigrationMap).some(
      (key) => key === importPath,
    );
    if (!hasImportPathInMap) {
      console.log(
        `Import path "${importPath}" not found in mobilePathMigrationMap. Skipping file.`,
      );
      return file.source;
    }
  }

  root.find(j.ImportDeclaration).forEach((path: ASTPath<ImportDeclaration>) => {
    const sourceValue = path.value.source.value;

    // Use Object.prototype.hasOwnProperty.call for safety
    if (
      typeof sourceValue === 'string' &&
      Object.prototype.hasOwnProperty.call(mobilePathMigrationMap, sourceValue)
    ) {
      // If targetComponent is specified, only migrate if the import path ends with the component name
      if (targetComponent) {
        if (!sourceValue.endsWith(`/${targetComponent}`)) {
          return; // Skip this import if it doesn't match the target component
        }
      }

      if (importPath) {
        if (sourceValue !== importPath) {
          return; // Skip this import if it doesn't match the import path
        }
      }

      const newPath = mobilePathMigrationMap[sourceValue];
      path.value.source = j.literal(newPath);
      modified = true;
    }
  });

  return modified ? root.toSource() : file.source;
}

export const parser = 'tsx';
export const extensions = ['ts', 'tsx'];
