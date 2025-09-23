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
const mobilePathMigrationMap: Record<string, string> = {
  '@cbhq/cds-mobile/animation/LottieProps': '@cbhq/cds-mobile/animation/types',
  '@cbhq/cds-mobile/alpha/banner/Banner': '@cbhq/cds-mobile/banner/Banner',
  '@cbhq/cds-common/visualizations/interpolateSubHeadText':
    '@cbhq/mobile-visualization/sparkline/sparkline-interactive-header/SparklineInteractiveHeader',
  '@cbhq/cds-mobile/overlays/Tray/Tray': '@cbhq/cds-mobile/overlays/tray/Tray',
  '@cbhq/cds-mobile/overlays/Tooltip/Tooltip': '@cbhq/cds-mobile/overlays/tooltip/Tooltip',
  '@cbhq/cds-mobile/overlays/Tooltip/InternalTooltip':
    '@cbhq/cds-mobile/overlays/tooltip/InternalTooltip',
  '@cbhq/cds-mobile/overlays/Tooltip/TooltipProps':
    '@cbhq/cds-mobile/overlays/tooltip/TooltipProps',
  '@cbhq/cds-mobile/overlays/Tooltip/useTooltipAnimation':
    '@cbhq/cds-mobile/overlays/tooltip/useTooltipAnimation',
  '@cbhq/cds-mobile/overlays/Tooltip/useTooltipPosition':
    '@cbhq/cds-mobile/overlays/tooltip/useTooltipPosition',
  '@cbhq/cds-mobile/overlays/Overlay/Overlay': '@cbhq/cds-mobile/overlays/overlay/Overlay',
  '@cbhq/cds-mobile/overlays/Modal/ModalFooter': '@cbhq/cds-mobile/overlays/modal/ModalFooter',
  '@cbhq/cds-mobile/overlays/Modal/ModalBody': '@cbhq/cds-mobile/overlays/modal/ModalBody',
  '@cbhq/cds-mobile/overlays/Modal/ModalHeader': '@cbhq/cds-mobile/overlays/modal/ModalHeader',
  '@cbhq/cds-mobile/overlays/Modal/Modal': '@cbhq/cds-mobile/overlays/modal/Modal',
  '@cbhq/cds-mobile/overlays/Modal/useModalAnimation':
    '@cbhq/cds-mobile/overlays/modal/useModalAnimation',
  '@cbhq/cds-mobile/overlays/HandleBar/HandleBar': '@cbhq/cds-mobile/overlays/handlebar/HandleBar',
  '@cbhq/cds-mobile/overlays/Drawer/Drawer': '@cbhq/cds-mobile/overlays/drawer/Drawer',
  '@cbhq/cds-mobile/overlays/Drawer/DrawerStatusBar':
    '@cbhq/cds-mobile/overlays/drawer/DrawerStatusBar',
  '@cbhq/cds-mobile/overlays/Drawer/useDrawerAnimation':
    '@cbhq/cds-mobile/overlays/drawer/useDrawerAnimation',
  '@cbhq/cds-mobile/overlays/Drawer/useDrawerPanResponder':
    '@cbhq/cds-mobile/overlays/drawer/useDrawerPanResponder',
  '@cbhq/cds-mobile/overlays/Drawer/useDrawerSpacing':
    '@cbhq/cds-mobile/overlays/drawer/useDrawerSpacing',
};

export default function transformer(file: FileInfo, api: API, options: Options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  let modified = false;

  root.find(j.ImportDeclaration).forEach((path: ASTPath<ImportDeclaration>) => {
    const sourceValue = path.value.source.value;

    // Use Object.prototype.hasOwnProperty.call for safety
    if (
      typeof sourceValue === 'string' &&
      Object.prototype.hasOwnProperty.call(mobilePathMigrationMap, sourceValue)
    ) {
      const newPath = mobilePathMigrationMap[sourceValue];
      path.value.source = j.literal(newPath);
      modified = true;
    }
  });

  return modified ? root.toSource() : file.source;
}

export const parser = 'tsx';
export const extensions = ['ts', 'tsx'];
