import path from 'path';
import * as ts from 'typescript';

import type { FilesParser } from './FileParser';

export type ParsedImportStatementCallback = (item: ImportStatementParser) => void;

export type TsImportStatement = {
  importClause: ts.ImportClause;
  moduleSpecifier: ts.StringLiteral;
} & Omit<ts.Statement, 'importClause'>;

export class ImportStatementParser {
  /** The file the import statement belongs to. A reference to a FilesParser class. */
  file: FilesParser;

  /** A Typescript import statement */
  statement: TsImportStatement;

  constructor(file: FilesParser, statement: TsImportStatement) {
    this.file = file;
    this.statement = statement;
  }

  // Can be used to determine if import is from an external package.
  get thirdPartyMatch() {
    return Object.keys(this.file.project.dependencies).includes(
      this.statement.moduleSpecifier.text,
    );
  }

  get moduleName() {
    const moduleName = this.statement.moduleSpecifier.text;
    /** If module is a relative import, we need to update to use Typescript path aliases or path relative to project
     * This is to ensure all instances of a component are referenced the same way.
     */
    if (moduleName.includes('.')) {
      const dirForFile = path.dirname(this.file.absolutePath);
      const absolutePathForFile = path.resolve(dirForFile, moduleName);
      const relativePathToProject = path.relative(
        this.file.absolutePathForProject,
        absolutePathForFile,
      );
      return this.file.projectTsAlias
        ? `${this.file.projectTsAlias}/${relativePathToProject}`
        : relativePathToProject;
    }
    return moduleName ?? 'local';
  }

  get importElements() {
    let imports: [string, string][] = [];
    const { name, namedBindings } = this.statement.importClause;
    if (namedBindings) {
      // Wildcard imports
      if (ts.isNamespaceImport(namedBindings)) {
        const nameText = `${namedBindings.name.escapedText as string}`;
        imports = [[nameText, nameText]];
        // Named imports
      } else if (ts.isNamedImports(namedBindings)) {
        namedBindings.elements.forEach((el) => {
          // If el has propertyName present than import has been aliased
          // i.e. import { TextBody as CDSText }
          // el.propertyName?.escapedText guarantees we return TextBody not CDSText
          imports.push([
            (el.propertyName?.escapedText as string) ?? (el.name.escapedText as string),
            el.name.escapedText as string,
          ]);
        });
      }
    }
    // Default imports
    if (name && ts.isIdentifier(name)) {
      imports.unshift([name.escapedText as string, name.escapedText as string]);
    }

    return imports;
  }

  get result() {
    return this.importElements.map((el) => [el, this.moduleName]);
  }

  static isValidImportStatement(statement: ts.Statement): statement is TsImportStatement {
    return (
      ts.isImportDeclaration(statement) &&
      ts.isImportClause(statement?.importClause ?? statement) &&
      ts.isStringLiteral(statement.moduleSpecifier) &&
      !ts.isTypeOnlyImportOrExportDeclaration(statement)
    );
  }

  parse(cb: ParsedImportStatementCallback) {
    cb(this);
    return this;
  }
}
