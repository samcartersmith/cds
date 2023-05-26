import { SourceFile, SyntaxKind } from 'ts-morph';

/**
 * Replace all instances of a function within a sourceFile with a new one
 * @param name - the name of the function to replace
 * @param sourceFile - the ts-morph SourceFile to update
 * @param replacement - the new function to replace the old one with
 */
export const renameFunction = ({
  name,
  sourceFile,
  replacement,
}: {
  name: string;
  sourceFile: SourceFile;
  replacement: string;
}) => {
  // get all function calls with the old function name
  const functionCalls = sourceFile
    .getDescendantsOfKind(SyntaxKind.CallExpression)
    .filter((call) => call.getExpression().getText() === name);

  // replace the old function name with the new function name in all function calls
  for (const call of functionCalls) {
    call.getExpression().replaceWithText(replacement);
  }
};
