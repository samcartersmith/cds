import path from 'path';
import * as ts from 'typescript';

import { createAstSourceFile } from '../utils/createAstSourceFile';
import { toId } from '../utils/id';

import { ImportStatementParser } from './ImportStatementParser';
import type { ProjectParser } from './ProjectParser';

const rootElementsToStopAt = new Set<string>(['svg']);

function isExportedStatement(node: ts.Node) {
  return (
    node.modifiers &&
    node.modifiers.length > 0 &&
    node.modifiers[0].kind === ts.SyntaxKind.ExportKeyword
  );
}

function getFilenameFromPath(pathName: string) {
  let fileName = path.parse(pathName).base;
  if (fileName.includes('.')) {
    fileName = fileName.split('.').slice(0, -1).join('.'); // cut off file the extension
  }

  return fileName;
}

function findNodeWithType(
  startNode: ts.Node,
  kind: ts.SyntaxKind,
  requiredKindAlongPath?: ts.SyntaxKind,
  kindToStopAt?: ts.SyntaxKind,
) {
  if (!startNode) {
    return null;
  }

  const stack: ts.Node[] = [];
  startNode.forEachChild((child) => {
    stack.push(child);
  });

  const foundNode = null;
  let foundRequiredAlongPath = !requiredKindAlongPath;
  while (stack.length > 0) {
    const node = stack.pop() as ts.Node;

    if (kindToStopAt && node.kind === kindToStopAt) {
      return null;
    }

    if (requiredKindAlongPath && node.kind === requiredKindAlongPath) {
      foundRequiredAlongPath = true;
    }

    if (foundRequiredAlongPath && node.kind === kind) {
      return node;
    }

    node.forEachChild((child) => {
      stack.push(child);
    });
  }

  return foundNode;
}

export class FileParser {
  /** Project the file belongs to. An instance of ProjectParser class. */
  public readonly project: ProjectParser;

  /** Absolute path of the file being parsed */
  public readonly absolutePath: string;

  public absolutePathForProject: string;

  public projectTsAlias: string | undefined;

  /** Path of the file being parsed, relative to the project. */
  private readonly relativePath: string;

  /** A Typescript SourceFile. This is the result of running ts.createSourceFile on the contents of a file. */
  private source!: ts.SourceFile;

  /** All imports declared in the source file. */
  /** This is the name in the import to the path */
  /*
  /* import {a as a1} from 'abc' => the key is 'a1' and the path is 'abc'
  /* import {a as a2} from 'abc2' => the key is 'a2' and the path is 'abc2'
  /* we can look up the correct path when using <a1 /> and <a2 />
   */
  private readonly imports = new Map<string, string>();

  /*
  /* The aliases above are local to this file.
  /* When generating id's that can be used globally we need to use the real name
  */
  private readonly importAliasToRealNameMap = new Map<string, string>();

  private wrappedPresentationStopPos: Set<number> = new Set<number>();

  constructor(
    project: ProjectParser,
    absolutePathForProject: string,
    absolutePathForFile: string,
    projectTsAlias?: string,
  ) {
    this.project = project;
    this.absolutePath = absolutePathForFile;
    this.relativePath = path.relative(absolutePathForProject, absolutePathForFile);
    this.projectTsAlias = projectTsAlias;
    this.absolutePathForProject = absolutePathForProject;
  }

  public get githubLink() {
    return path.join(this.project.github, path.relative(this.project.root, this.absolutePath));
  }

  public get path() {
    return this.projectTsAlias ? `${this.projectTsAlias}/${this.relativePath}` : this.relativePath;
  }

  public async init() {
    try {
      this.source = await createAstSourceFile(this.absolutePath);
      this.getImports();
      return this;
    } catch (err) {
      if (err instanceof Error) {
        this.project.spinner.fail(`FileParser failed ${err?.message}`);
      } else {
        throw err;
      }
    }
    return this;
  }

  public async parseStyle() {
    try {
      this.parseStyledNode(this.source);
      return this;
    } catch (err) {
      if (err instanceof Error) {
        this.project.spinner.fail(`FileParser failed ${err?.message}`);
      } else {
        throw err;
      }
    }
    return this;
  }

  public async parseWrapped() {
    try {
      this.parseWrappedPresentation();
      return this;
    } catch (err) {
      if (err instanceof Error) {
        this.project.spinner.fail(`FileParser failed ${err?.message}`);
      } else {
        throw err;
      }
    }
    return this;
  }

  public async parseJsx() {
    try {
      this.parseJsxNode(this.source);
      return this;
    } catch (err) {
      if (err instanceof Error) {
        this.project.spinner.fail(`FileParser failed ${err?.message}`);
      } else {
        throw err;
      }
    }
    return this;
  }

  private getImports() {
    this.source.statements
      .filter(ImportStatementParser.isValidImportStatement)
      .forEach((statement) => {
        new ImportStatementParser(this, statement).parse(({ importElements, moduleName }) => {
          importElements.forEach(([itemRealName, itemAlias]) => {
            // Normalize imports via index files to always use deep imports
            if (this.project.isCdsImport(moduleName) && !moduleName.includes(itemRealName)) {
              this.imports.set(itemAlias, path.join(moduleName, itemRealName));
            } else {
              this.imports.set(itemAlias, moduleName);
            }

            // map the uniqu alias to a possible duplicate name
            this.importAliasToRealNameMap.set(itemAlias, itemRealName);
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
          const jsxId = this.getJsxId(jsxName, this.path);

          // Get the styled element that this component was created with i.e. div in styled.div
          if (ts.isPropertyAccessExpression(node.tag)) {
            const htmlTag = node.tag.name.escapedText as string;
            // Referenced in ProjectParser before output to ensure component is considered presentational.
            this.project.styledComponents.set(jsxId, htmlTag);

            // Get the component that we are extending styles from i.e. Button in styled(Button)
          } else if (ts.isCallExpression(node.tag) && ts.isIdentifier(node.tag.arguments[0])) {
            const extendedJsxName = node.tag.arguments[0].escapedText as string;
            const importedFrom = this.imports.get(extendedJsxName) ?? this.path;
            const extendedJsxId = this.getJsxId(extendedJsxName, importedFrom);
            // See if this JSX component has already been extended so we can add to that list.
            // Add or update extended JSX to our styled components list
            if (this.project.isCdsImport(importedFrom)[1] !== false) {
              const extendedJsxMatch =
                this.project.extendedStyledComponents.get(extendedJsxId) ?? [];
              this.project.extendedStyledComponents.set(extendedJsxId, [
                ...extendedJsxMatch,
                jsxId,
              ]);
            } else {
              this.project.styledComponents.set(jsxId, extendedJsxName);
            }
          }
        }
      }
    }
    node.forEachChild((childNode) => this.parseStyledNode(childNode));
  }

  private parseWrappedPresentation() {
    for (const statement of this.source.statements) {
      /**
       * This case where you export a variable that executes a function
       * export const CustomSvg1 = ({ children }: { children: React.ReactNode }) => <svg>{children}</svg>;
       *
       * export const CustomSvg3 = React.memo(({ children }: { children: React.ReactNode }) => <svg>{children}</svg>);
       *
       * export const CustomSvg4 = React.memo(function CustomSvg4({children}) {
       *
       *   const a = 1;
       *
       *   return (
       *     <svg>{children}</svg>
       *   )
       * });
       *
       * export const CustomSvg5 = React.memo(({children}) => {
       *
       *  const a = 1;
       *
       *  return (
       *     <svg>{children}</svg>
       *  )
       * });
       */
      if (ts.isVariableStatement(statement)) {
        if (isExportedStatement(statement)) {
          const { declarationList } = statement;
          if (declarationList) {
            for (const declaration of declarationList.declarations) {
              if (declaration) {
                const varName = (declaration.name as ts.Identifier).escapedText as string;

                const arrowFunction = findNodeWithType(
                  declaration,
                  ts.SyntaxKind.ArrowFunction,
                  undefined,
                  ts.SyntaxKind.Block,
                );
                if (arrowFunction) {
                  const jsxElement = findNodeWithType(
                    arrowFunction,
                    ts.SyntaxKind.JsxElement,
                  ) as ts.JsxElement;
                  if (jsxElement) {
                    this.handleFoundWrappedJsx(varName, jsxElement);
                  }
                }

                const returnStatement = findNodeWithType(
                  declaration,
                  ts.SyntaxKind.ReturnStatement,
                  ts.SyntaxKind.Block,
                );
                if (returnStatement) {
                  const jsxElement = findNodeWithType(
                    returnStatement,
                    ts.SyntaxKind.JsxElement,
                  ) as ts.JsxElement;
                  if (jsxElement) {
                    this.handleFoundWrappedJsx(varName, jsxElement);
                  }
                }
              }
            }
          }
        }
      }

      /**
       * This case where you export a function with a return statement:
       *
       * export function CustomSvg2({ children }: { children: React.ReactNode }) {
       *  const a = 2;
       *
       *   return <svg>{children}</svg>;
       * }
       */
      if (ts.isFunctionDeclaration(statement)) {
        if (isExportedStatement(statement)) {
          const fnName = statement.name?.escapedText as string;

          const returnStatement = findNodeWithType(
            statement,
            ts.SyntaxKind.ReturnStatement,
            ts.SyntaxKind.Block,
          );
          if (returnStatement) {
            const jsxElement = findNodeWithType(
              returnStatement,
              ts.SyntaxKind.JsxElement,
            ) as ts.JsxElement;
            if (jsxElement) {
              this.handleFoundWrappedJsx(fnName, jsxElement);
            }
          }
        }
      }

      /**
       * This case is for default exports of an arrow function or regular function:
       * export default ({ children }: { children: React.ReactNode }) => <svg>{children}</svg>;
       * export default function ({ children }: { children: React.ReactNode }) { return <svg>{children}</svg>);
       *
       * currently relies on the import to use the same name as the file
       */
      if (ts.isExportAssignment(statement)) {
        const fileName = getFilenameFromPath(this.path);
        const arrowFunction = findNodeWithType(
          statement,
          ts.SyntaxKind.ArrowFunction,
          undefined,
          ts.SyntaxKind.Block,
        );
        if (arrowFunction) {
          const jsxElement = findNodeWithType(
            arrowFunction,
            ts.SyntaxKind.JsxElement,
          ) as ts.JsxElement;
          if (jsxElement) {
            this.handleFoundWrappedJsx(fileName, jsxElement);
          }
        }

        const returnStatement = findNodeWithType(
          statement,
          ts.SyntaxKind.ReturnStatement,
          ts.SyntaxKind.Block,
        );
        if (returnStatement) {
          const jsxElement = findNodeWithType(
            returnStatement,
            ts.SyntaxKind.JsxElement,
          ) as ts.JsxElement;
          if (jsxElement) {
            this.handleFoundWrappedJsx(fileName, jsxElement);
          }
        }
      }
    }
  }

  private handleFoundWrappedJsx(exportId: string, jsxElement: ts.JsxElement) {
    const { openingElement } = jsxElement;
    let tagName = '';
    if (openingElement && 'escapedText' in openingElement.tagName) {
      tagName = openingElement.tagName.escapedText as string;
    }

    const [cdsPath, isWrappedCds] = this.isWrappedCdsJsx(jsxElement);
    if (isWrappedCds) {
      this.project.addAliasedCdsComponent(exportId, this.path, this.getJsxId(tagName, cdsPath));

      return;
    }

    const [presEl, isPresEl] = this.isPresentationalJsx(jsxElement);
    if (isPresEl) {
      this.project.addWrappedPresentationalComponent(
        this.getJsxId(exportId, this.path),
        this.path,
        presEl,
      );
      this.wrappedPresentationStopPos.add(jsxElement.pos);
    }
  }

  private isPresentationalJsx(element: ts.JsxElement): [string, boolean] {
    const { openingElement } = element;
    if (openingElement && 'escapedText' in openingElement.tagName) {
      const tagName = openingElement.tagName.escapedText as string;

      const lib = this.imports.get(tagName) as string;
      if (lib && this.project.isPresentationalLibrary(lib)[1] !== false) {
        return [lib, true];
      }

      if (this.project.isPresentationalElement(tagName)[1] !== false) {
        return [tagName, true];
      }

      for (const attribute of openingElement.attributes.properties) {
        if (ts.isJsxAttribute(attribute)) {
          const propName = attribute.name.escapedText as string;
          if (this.project.isPresentationalProp(propName)) {
            return [tagName, true];
          }
        }
      }

      if (this.project.styledComponents.has(this.getJsxId(tagName, lib ?? this.path))) {
        return [tagName, true];
      }
    }

    return ['', false];
  }

  private isWrappedCdsJsx(element: ts.JsxElement): [string, boolean] {
    const { openingElement } = element;
    if (openingElement && 'escapedText' in openingElement.tagName) {
      const tagName = openingElement.tagName.escapedText as string;
      const lib = this.imports.get(tagName) as string;
      if (lib && this.project.isCdsImport(lib)[1] !== false) {
        let currElement: ts.JsxElement = element;
        while (currElement) {
          // if we find a presentational element we return false here
          currElement = findNodeWithType(currElement, ts.SyntaxKind.JsxElement) as ts.JsxElement;

          // we found a nested presentational element, return
          if (currElement && this.isPresentationalJsx(currElement)[1]) {
            return ['', false];
          }
        }

        return [lib, true];
      }
    }

    return ['', false];
  }

  private parseJsxNode(node: ts.Node, stop?: boolean) {
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
      const jsxId = this.getJsxId(jsxName, sourceFile);
      // If component has already been added than let's update the callSites to include this file, otherwise add a new entry.
      this.project.addJsxComponent(jsxId, this.path, props);
    }

    if (ts.isJsxElement(node)) {
      // don't parse the sub elements for a wrapped presentation
      if (this.wrappedPresentationStopPos.has(node.pos)) {
        return;
      }

      const { openingElement } = node;
      if (
        openingElement &&
        rootElementsToStopAt.has((openingElement.tagName as ts.Identifier).escapedText as string)
      ) {
        this.parseJsxNode(openingElement, true);
        return;
      }
    }

    if (stop !== true) {
      node.forEachChild((childNode) => this.parseJsxNode(childNode));
    }
  }

  private getJsxId(name: string, sourceFile: string) {
    return toId(this.importAliasToRealNameMap.get(name) ?? name, sourceFile);
  }
}
