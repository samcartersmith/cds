import * as ts from 'typescript';
import path from 'path';
import type { ProjectParser } from './ProjectParser';
import { ImportStatementParser } from './ImportStatementParser';
import { createAstSourceFile } from '../utils/createAstSourceFile';
import { toId } from '../utils/id';

const rootElementsToStopAt = new Set<string>(['svg']);

function isExportedStatement(node: ts.Node) {
  return (
    node.modifiers &&
    node.modifiers.length > 0 &&
    node.modifiers[0].kind === ts.SyntaxKind.ExportKeyword
  );
}

// normalize id's to not use the file extension, we don't know the file extension of imports
function getJsxId(name: string, sourceFile: string) {
  const sourceFileWithoutExtension = sourceFile.includes('.')
    ? sourceFile.split('.').slice(0, -1).join('.')
    : sourceFile;

  return toId(name, sourceFileWithoutExtension);
}

export class FileParser {
  /** Project the file belongs to. An instance of ProjectParser class. */
  public readonly project: ProjectParser;

  /** Absolute path of the file being parsed */
  public readonly absolutePath: string;

  /** Path of the file being parsed, relative to the project. */
  private readonly relativePath: string;

  /** A Typescript SourceFile. This is the result of running ts.createSourceFile on the contents of a file. */
  private source!: ts.SourceFile;

  /** All imports declared in the source file. */
  private readonly imports = new Map<string, string>();

  constructor(project: ProjectParser, absolutePathForFile: string) {
    this.project = project;
    this.absolutePath = absolutePathForFile;
    this.relativePath = path.relative(project.absolutePath, absolutePathForFile);
  }

  public get githubLink() {
    return path.join(this.project.github, path.relative(this.project.root, this.absolutePath));
  }

  public get path() {
    return this.project.tsAlias
      ? `${this.project.tsAlias}/${this.relativePath}`
      : this.relativePath;
  }

  public async parse() {
    try {
      this.source = await createAstSourceFile(this.absolutePath);
      this.getImports();
      this.parseWrappedPresentation();
      this.parseStyledNode(this.source);
      this.parseJsxNode(this.source);
      return this;
    } catch (err) {
      this.project.spinner.fail(`FileParser failed ${err?.message}`);
    }
    return this;
  }

  private getImports() {
    this.source.statements
      .filter(ImportStatementParser.isValidImportStatement)
      .forEach((statement) => {
        new ImportStatementParser(this, statement).parse(({ importElements, moduleName }) => {
          importElements.forEach((item) => {
            // Normalize imports via index files to always use deep imports
            if (this.project.isCdsImport(moduleName) && !moduleName.includes(item)) {
              this.imports.set(item, path.join(moduleName, item));
            } else {
              this.imports.set(item, moduleName);
            }
          });
        });
      });
    return this;
  }

  private parseStyledNode(node: ts.Node) {
    if (
      ts.isTaggedTemplateExpression(node) &&
      (ts.isCallExpression(node.tag) || ts.isPropertyAccessExpression(node.tag))
    ) {
      if (ts.isIdentifier(node.tag.expression)) {
        if (
          node.tag.expression.escapedText === 'styled' &&
          ts.isVariableDeclaration(node.parent) &&
          ts.isIdentifier(node.parent.name)
        ) {
          // Get the name of JSX element i.e. The StyledButton from `const StyledButton = styled(Button)`
          const jsxName = node.parent.name.escapedText as string;
          // Generate unique name for this component using path from file this was instantiated in.
          const jsxId = getJsxId(jsxName, this.path);

          // Get the styled element that this component was created with i.e. div in styled.div
          if (ts.isPropertyAccessExpression(node.tag)) {
            const htmlTag = node.tag.name.escapedText as string;
            // Referenced in ProjectParser before output to ensure component is considered presentational.
            this.project.styledComponents.set(jsxId, htmlTag);

            // Get the component that we are extending styles from i.e. Button in styled(Button)
          } else if (ts.isCallExpression(node.tag) && ts.isIdentifier(node.tag.arguments[0])) {
            const extendedJsxName = node.tag.arguments[0].escapedText as string;
            const importedFrom = this.imports.get(extendedJsxName) ?? this.path;
            const extendedJsxId = getJsxId(extendedJsxName, importedFrom);
            // See if this JSX component has already been extended so we can add to that list.
            const extendedJsxMatch = this.project.extendedStyledComponents.get(extendedJsxId) ?? [];
            // Add or update extended JSX to our styled components list
            this.project.extendedStyledComponents.set(extendedJsxId, [...extendedJsxMatch, jsxId]);
          }
        }
      }
    }
    node.forEachChild((childNode) => this.parseStyledNode(childNode));
  }

  private parseWrappedPresentation() {
    /**
     * This case:
     * export const CustomSvg1 = ({ children }: { children: React.ReactNode }) => <svg>{children}</svg>;
     */
    for (const statement of this.source.statements) {
      if (ts.isVariableStatement(statement)) {
        if (isExportedStatement(statement)) {
          const { declarationList } = statement;
          if (declarationList) {
            for (const declaration of declarationList.declarations) {
              if (declaration) {
                const varName = (declaration.name as ts.Identifier).escapedText as string;
                // traverse initializer.body.expression.openingElement.tagName.escapedtext
                const body = (declaration?.initializer as ts.ArrowFunction)?.body as ts.JsxElement;
                if (body && body.kind === ts.SyntaxKind.JsxElement) {
                  if (this.project.isPresentationalJsx(body)) {
                    const jsxId = getJsxId(varName, this.path);
                    this.project.wrappedPresentationComponents.set(jsxId, this.path);
                  }
                }
              }
            }
          }
        }
      }

      /**
       * This case:
       * export function CustomSvg2({ children }: { children: React.ReactNode }) {
       *  const a = 2;
       *
       *   return <svg>{children}</svg>;
       * }
       */
      if (ts.isFunctionDeclaration(statement)) {
        if (isExportedStatement(statement)) {
          const fnName = statement.name?.escapedText as string;
          const body = statement.body as ts.Block;

          const returnStatement = body?.statements.find(
            (s) => s.kind === ts.SyntaxKind.ReturnStatement,
          ) as ts.ReturnStatement;
          if (returnStatement && returnStatement.expression?.kind === ts.SyntaxKind.JsxElement) {
            if (this.project.isPresentationalJsx(returnStatement?.expression as ts.JsxElement)) {
              const jsxId = getJsxId(fnName, this.path);
              this.project.wrappedPresentationComponents.set(jsxId, this.path);
            }
          }
        }
      }

      /**
       * This case:
       * export default ({ children }: { children: React.ReactNode }) => <svg>{children}</svg>;
       *
       * currently relies on the import to use the same name as the file
       */
      if (ts.isExportAssignment(statement)) {
        const expression = statement.expression as ts.ArrowFunction;
        if (expression && expression.body?.kind === ts.SyntaxKind.JsxElement) {
          if (this.project.isPresentationalJsx(expression.body as ts.JsxElement)) {
            let fileName = path.parse(this.path).base;
            if (fileName.includes('.')) {
              fileName = fileName.split('.').slice(0, -1).join('.'); // cut off file the extension
            }

            const jsxId = getJsxId(fileName, this.path);
            this.project.wrappedPresentationComponents.set(jsxId, this.path);
          }
        }
      }
    }

    // TODO: Possibly handle default function export if this is a real use case
    /** export default function({ children }: { children: React.ReactNode }) {
      return (
        <svg>{children}</svg>
      );
    }; 
     * */
  }

  private parseJsxNode(node: ts.Node) {
    const props: string[] = [];
    if (
      (ts.isJsxSelfClosingElement(node) || ts.isJsxOpeningElement(node)) &&
      ts.isIdentifier(node.tagName)
    ) {
      node.attributes.properties.forEach((attribute) => {
        if (ts.isJsxAttribute(attribute)) {
          props.push(attribute.name.escapedText as string);
        }
        if (ts.isJsxSpreadAttribute(attribute)) {
          // TODO: handle attributes that are spread in
        }
      });
      // Get the name of JSX element i.e. The MyCustomWrapper from `<MyCustomWrapper>
      const jsxName = node.tagName.text;
      // Get the sourceFile (where it was imported from) for the component. If it is not included in imports for the file, than we know it's local.
      const sourceFile = this.imports.get(jsxName) ?? this.path;
      // Generate a unique name for this component using JSX name + source file.
      const jsxId = getJsxId(jsxName, sourceFile);
      // If component has already been added than let's update the callSites to include this file, otherwise add a new entry.
      const jsxComponentMatch = this.project.jsxComponents.get(jsxId) ?? [];
      this.project.jsxComponents.set(jsxId, [...jsxComponentMatch, { callSite: this.path, props }]);
    }

    if (ts.isJsxElement(node)) {
      const { openingElement } = node;
      if (
        rootElementsToStopAt.has((openingElement.tagName as ts.Identifier).escapedText as string)
      ) {
        this.parseJsxNode(openingElement);
        return;
      }
    }

    node.forEachChild((childNode) => this.parseJsxNode(childNode));
  }
}
