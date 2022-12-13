import ts from 'typescript';

/**
 * ASTParser is responsible for storing functions
 * that traverses to AST.
 *
 * NOTE: This is an ASTParser, not ASTWriter. Thus,
 * any parsing done here will not modify the original file.
 * It will only traverse the AST and obtain information
 */
export class ASTParser {
  private rootNames: string[];

  private program: ts.Program;

  constructor(rootNames: string[]) {
    this.rootNames = rootNames;
    this.program = ts.createProgram(this.rootNames, { allowJs: false });
  }

  public fileNameToSourceFile(fileName: string): ts.SourceFile {
    const sourceFile = this.program.getSourceFile(fileName);

    if (sourceFile === undefined) {
      throw new Error('Source file is undefined. Nothing to traverse through');
    }
    return sourceFile;
  }

  public findIdentifier({ fileName, identifier }: { fileName: string; identifier: string }) {
    const sourceFile = this.fileNameToSourceFile(fileName);

    let foundIdentifier = false;

    function findIdentifierHelper(node: ts.Node) {
      const nodeText = node.getText(sourceFile);

      if (ts.isIdentifier(node)) {
        if (nodeText === identifier) {
          foundIdentifier = true;
        }
      } else {
        ts.forEachChild(node, findIdentifierHelper);
      }
    }
    ts.forEachChild(sourceFile, findIdentifierHelper);
    return foundIdentifier;
  }

  public hasRenderIdentifier(fileName: string) {
    return this.findIdentifier({
      fileName,
      identifier: 'render',
    });
  }

  public hasToBeAccessible(fileName: string) {
    return this.findIdentifier({
      fileName,
      identifier: 'toBeAccessible',
    });
  }
}
