import * as ts from 'typescript';
import path from 'path';
import type { ProjectParser } from './ProjectParser';
import { ImportStatementParser } from './ImportStatementParser';
import { createAstSourceFile } from '../utils/createAstSourceFile';
import { toId } from '../utils/id';

export class FileParser {
  /** Project the file belongs to. An instance of ProjectParser class. */
  project: ProjectParser;

  /** Absolute path of the file being parsed */
  absolutePath: string;

  /** Path of the file being parsed, relative to the project. */
  relativePath: string;

  /** A Typescript SourceFile. This is the result of running ts.createSourceFile on the contents of a file. */
  source!: ts.SourceFile;

  /** All imports declared in the source file. */
  imports = new Map<string, string>();

  constructor(project: ProjectParser, absolutePathForFile: string) {
    this.project = project;
    this.absolutePath = absolutePathForFile;
    this.relativePath = path.relative(project.absolutePath, absolutePathForFile);
  }

  get githubLink() {
    return path.join(this.project.github, path.relative(this.project.root, this.absolutePath));
  }

  get path() {
    return this.project.tsAlias
      ? `${this.project.tsAlias}/${this.relativePath}`
      : this.relativePath;
  }

  getImports() {
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

  parseStyledNode(node: ts.Node) {
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
          const jsxId = toId(jsxName, this.path);

          // Get the styled element that this component was created with i.e. div in styled.div
          if (ts.isPropertyAccessExpression(node.tag)) {
            const htmlTag = node.tag.name.escapedText as string;
            // Referenced in ProjectParser before output to ensure component is considered presentational.
            this.project.styledComponents.set(jsxId, htmlTag);

            // Get the component that we are extending styles from i.e. Button in styled(Button)
          } else if (ts.isCallExpression(node.tag) && ts.isIdentifier(node.tag.arguments[0])) {
            const extendedJsxName = node.tag.arguments[0].escapedText as string;
            const importedFrom = this.imports.get(extendedJsxName) ?? this.path;
            const extendedJsxId = toId(extendedJsxName, importedFrom);
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

  parseJsxNode(node: ts.Node) {
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
      const jsxId = toId(jsxName, sourceFile);
      // If component has already been added than let's update the callSites to include this file, otherwise add a new entry.
      const jsxComponentMatch = this.project.jsxComponents.get(jsxId) ?? [];
      this.project.jsxComponents.set(jsxId, [...jsxComponentMatch, { callSite: this.path, props }]);
    }
    node.forEachChild((childNode) => this.parseJsxNode(childNode));
  }

  async parse() {
    try {
      this.source = await createAstSourceFile(this.absolutePath);
      this.getImports();
      this.parseStyledNode(this.source);
      this.parseJsxNode(this.source);
      return this;
    } catch (err) {
      this.project.spinner.fail(`FileParser failed ${err?.message}`);
    }
    return this;
  }
}
