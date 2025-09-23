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
import {
  type API,
  type ASTPath,
  type FileInfo,
  type ImportDeclaration,
  type Options,
} from 'jscodeshift';

// Define the mapping from old paths to new paths
export const webPathMigrationMap: Record<string, string> = {
  '@cbhq/cds-web/v7/animation/FramerMotionProvider': '@cbhq/cds-web/system/FramerMotionProvider',
  '@cbhq/cds-web/v7/overlays/useAlert': '@cbhq/cds-common/overlays/useAlert',
  '@cbhq/cds-web/v7/alpha/banner/Banner': '@cbhq/cds-web/banner/Banner',
  '@cbhq/cds-web/v7/overlays/Modal/ModalFooter': '@cbhq/cds-web/overlays/modal/ModalFooter',
  '@cbhq/cds-web/v7/overlays/Modal/ModalBody': '@cbhq/cds-web/overlays/modal/ModalBody',
  '@cbhq/cds-web/v7/overlays/Modal/ModalHeader': '@cbhq/cds-web/overlays/modal/ModalHeader',
  '@cbhq/cds-web/v7/overlays/Modal/Modal': '@cbhq/cds-web/overlays/modal/Modal',
  '@cbhq/cds-web/v7/overlays/Modal/ModalWrapper': '@cbhq/cds-web/overlays/modal/ModalWrapper',
  '@cbhq/cds-web/v7/overlays/Modal/FullscreenModal': '@cbhq/cds-web/overlays/modal/FullscreenModal',
  '@cbhq/cds-web/v7/tables/types/tableTypes': '@cbhq/cds-web/tables/Table',
  '@cbhq/cds-common/v7/visualizations/interpolateSubHeadText':
    '@cbhq/web-visualization/sparkline/sparkline-interactive-header/SparklineInteractiveHeader',
  '@cbhq/cds-web/v7/overlays/Tooltip/Tooltip': '@cbhq/cds-web/overlays/tooltip/Tooltip',
  '@cbhq/cds-web/v7/overlays/Tooltip/TooltipContent':
    '@cbhq/cds-web/overlays/tooltip/TooltipContent',
  '@cbhq/cds-web/v7/overlays/Tooltip/TooltipProps': '@cbhq/cds-web/overlays/tooltip/TooltipProps',
  '@cbhq/cds-web/v7/overlays/Tooltip/useTooltipState':
    '@cbhq/cds-web/overlays/tooltip/useTooltipState',
};

export default function transformer(file: FileInfo, api: API, options: Options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  let modified = false;

  const targetComponent = options.component as string | undefined;
  const importPath = options.importPath as string | undefined;

  // Check if file has any @cbhq/cds-web imports
  const hasWebImports = root.find(j.ImportDeclaration).some((path: ASTPath<ImportDeclaration>) => {
    const sourceValue = path.value.source.value;
    return typeof sourceValue === 'string' && sourceValue.includes('@cbhq/cds-web');
  });

  if (!hasWebImports) {
    return file.source; // Skip file if no web imports found
  }

  // If targetComponent is specified, check if it exists in the migration map
  if (targetComponent) {
    const hasComponentInMap = Object.keys(webPathMigrationMap).some((key) =>
      key.endsWith(`/${targetComponent}`),
    );

    if (!hasComponentInMap) {
      console.log(
        `Component "${targetComponent}" not found in webPathMigrationMap. Skipping file.`,
      );
      return file.source;
    }
  }

  // If importPathName is specified, check if it exists in the migration map
  if (importPath) {
    console.log(importPath);
    const hasImportPathInMap = Object.keys(webPathMigrationMap).some((key) => key === importPath);
    if (!hasImportPathInMap) {
      console.log(`Import path "${importPath}" not found in webPathMigrationMap. Skipping file.`);
      return file.source;
    }
  }

  root.find(j.ImportDeclaration).forEach((path: ASTPath<ImportDeclaration>) => {
    const sourceValue = path.value.source.value;

    // Use Object.prototype.hasOwnProperty.call for safety
    if (
      typeof sourceValue === 'string' &&
      Object.prototype.hasOwnProperty.call(webPathMigrationMap, sourceValue)
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

      const newPath = webPathMigrationMap[sourceValue];
      path.value.source = j.literal(newPath);
      modified = true;
    }
  });

  return modified ? root.toSource() : file.source;
}

export const parser = 'tsx';
export const extensions = ['ts', 'tsx'];
