import { JsxElementType } from './types';

/**
 * Renamed a JSX element's tag name
 * Make sure you call writeMigrationToFile to save changes to the file system
 * @param jsx - The JSX element to update
 */
export function renameJsxTag({ jsx, value }: { jsx: JsxElementType; value: string }) {
  jsx.getTagNameNode().replaceWithText(value);
}
