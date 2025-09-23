/**
 * Codemod to migrate web import paths that have changed in v8.
 *
 * Example transformations:
 * Before:
 * import { interpolateSubHeadText } from '@cbhq/cds-common/visualizations/interpolateSubHeadText';
 *
 * After:
 * import { interpolateSubHeadText } from '@cbhq/web-visualization/sparkline/sparkline-interactive-header/SparklineInteractiveHeader';
 */
import type { API, ASTPath, FileInfo, ImportDeclaration, Options } from 'jscodeshift';

// Define the mapping from old paths to new paths
const webPathMigrationMap: Record<string, string> = {
  '@cbhq/cds-web/animation/FramerMotionProvider': '@cbhq/cds-web/system/FramerMotionProvider',
  '@cbhq/cds-web/overlays/useAlert': '@cbhq/cds-common/overlays/useAlert',
  '@cbhq/cds-web/alpha/banner/Banner': '@cbhq/cds-web/banner/Banner',
  '@cbhq/cds-web/overlays/Modal/ModalFooter': '@cbhq/cds-web/overlays/modal/ModalFooter',
  '@cbhq/cds-web/overlays/Modal/ModalBody': '@cbhq/cds-web/overlays/modal/ModalBody',
  '@cbhq/cds-web/overlays/Modal/ModalHeader': '@cbhq/cds-web/overlays/modal/ModalHeader',
  '@cbhq/cds-web/overlays/Modal/Modal': '@cbhq/cds-web/overlays/modal/Modal',
  '@cbhq/cds-web/overlays/Modal/ModalWrapper': '@cbhq/cds-web/overlays/modal/ModalWrapper',
  '@cbhq/cds-web/overlays/Modal/FullscreenModal': '@cbhq/cds-web/overlays/modal/FullscreenModal',
  '@cbhq/cds-web/tables/types/tableTypes': '@cbhq/cds-web/tables/Table',
  '@cbhq/cds-common/visualizations/interpolateSubHeadText':
    '@cbhq/web-visualization/sparkline/sparkline-interactive-header/SparklineInteractiveHeader',
  '@cbhq/cds-web/overlays/Tooltip/Tooltip': '@cbhq/cds-web/overlays/tooltip/Tooltip',
  '@cbhq/cds-web/overlays/Tooltip/TooltipContent': '@cbhq/cds-web/overlays/tooltip/TooltipContent',
  '@cbhq/cds-web/overlays/Tooltip/TooltipProps': '@cbhq/cds-web/overlays/tooltip/TooltipProps',
  '@cbhq/cds-web/overlays/Tooltip/useTooltipState':
    '@cbhq/cds-web/overlays/tooltip/useTooltipState',
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
      Object.prototype.hasOwnProperty.call(webPathMigrationMap, sourceValue)
    ) {
      const newPath = webPathMigrationMap[sourceValue];
      path.value.source = j.literal(newPath);
      modified = true;
    }
  });

  return modified ? root.toSource() : file.source;
}

export const parser = 'tsx';
export const extensions = ['ts', 'tsx'];
