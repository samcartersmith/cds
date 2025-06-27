/**
 * Codemod to migrate specific import paths that have changed in v8.
 *
 * Example transformations:
 * Before:
 * import { Lottie } from '@cbhq/cds-mobile/animation/LottieProps';
 *
 * After:
 * import { Lottie } from '@cbhq/cds-mobile/animation/types';
 */
import { API, ASTPath, FileInfo, ImportDeclaration, Options } from 'jscodeshift';

// Define the mapping from old paths to new paths
const specificPathMigrationMap: Record<string, string> = {
  // Mobile
  '@cbhq/cds-mobile/animation/LottieProps': '@cbhq/cds-mobile/animation/types',
  '@cbhq/cds-mobile/alpha/banner/Banner': '@cbhq/cds-mobile/banner/Banner',
  // Web
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
      Object.prototype.hasOwnProperty.call(specificPathMigrationMap, sourceValue)
    ) {
      const newPath = specificPathMigrationMap[sourceValue];
      path.value.source = j.literal(newPath);
      modified = true;
    }
  });

  return modified ? root.toSource() : file.source;
}

export const parser = 'tsx';
export const extensions = ['ts', 'tsx'];
