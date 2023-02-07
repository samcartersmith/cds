import { getProjects, joinPathFragments, output, Tree } from '@nrwl/devkit';
import glob from 'fast-glob';
import fs from 'node:fs';
import { Project, SyntaxKind } from 'ts-morph';

import { checkHasCdsDependency } from './checkHasCdsDependency';
import { logStartTask } from './logStartTask';
import { updateJsxAttributeValue } from './updateJsxAttributeValue';

type RenameMapShape = Record<string, Record<string, string>>;

type CreateRenameScriptParams<RenameMap extends RenameMapShape> = {
  renameMap: RenameMap;
  packageNameToLog: string;
  oldImportCheck: (str: string) => boolean;
};

export function createRenameScript<RenameMap extends RenameMapShape>({
  renameMap,
  packageNameToLog,
  oldImportCheck,
}: CreateRenameScriptParams<RenameMap>) {
  type ComponentType = Extract<keyof RenameMap, string>;

  type GetFileParserParams = {
    tree: Tree;
    tsProject: Project;
  };

  function isComponentTypeWithRename(val?: string): val is ComponentType {
    if (val) return val in renameMap;
    return false;
  }

  function stringHasRenamedValue(str: string) {
    return Object.values(renameMap)
      .flatMap((namesMap) => Object.keys(namesMap))
      .some((oldName) => str.includes(oldName));
  }

  function bestEffortRename(str: string) {
    let content = str;
    Object.values(renameMap).forEach((namesMap) => {
      for (const [oldName, newName] of Object.entries(namesMap)) {
        content = content.replaceAll(oldName, newName);
      }
    });

    return content;
  }

  function getFileParser({ tree, tsProject }: GetFileParserParams) {
    function parseFile(absoluteFilePath: string) {
      let newContent: string | undefined;
      const relativeFilePath = absoluteFilePath.replace(`${tree.root}/`, '');
      const sourceContent = fs.readFileSync(absoluteFilePath, 'utf-8');
      if (!oldImportCheck(sourceContent) || !stringHasRenamedValue(sourceContent)) {
        return;
      }

      const sourceFile = tsProject.createSourceFile(absoluteFilePath, sourceContent);

      const jsxElements = sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement);

      jsxElements.forEach((jsx) => {
        /** "HeroSquare" | "SpotSquare" | "SpotRectangle" | "Pictogram" */
        let componentType = jsx.getTagNameNode().getText();

        /** Logging constants */
        const lineNumber = jsx.getStartLineNumber(false);
        const colPos = jsx.getStartLinePos(false);
        const jsxContent = jsx.print();
        const terminalHyperlink = output.underline(`${relativeFilePath}:${lineNumber}:${colPos}`);
        const manualCheckWarningText = `Please manually check changes made to ${terminalHyperlink} (<- cmd + click):`;
        const bodyLines = [jsxContent];

        /** Import alias edge case i.e. import { HeroSquare as HeroSquareAlias } from '@cbhq/cds-web/illustrations' */
        if (!(componentType in renameMap)) {
          const declarations = jsx
            .getFirstDescendantByKind(SyntaxKind.Identifier)
            ?.getSymbol()
            ?.getDeclarations();

          if (declarations) {
            declarations.forEach((declaration) => {
              /** If declaration.compilerNode.propertyName is present, it has an import alias */
              const realModuleName = declaration.compilerNode?.propertyName?.escapedText;
              if (realModuleName && realModuleName in renameMap) {
                componentType = realModuleName;
              }
            });
          }
        }

        /** Component name matches "HeroSquare" | "SpotSquare" | "SpotRectangle" | "Pictogram" */
        if (isComponentTypeWithRename(componentType)) {
          const updateMap = renameMap[componentType];
          const { oldValue, newValue } = updateJsxAttributeValue({
            attribute: 'name',
            updateMap,
            jsx,
          });

          if (oldValue !== undefined && newValue !== undefined) {
            output.success({
              title: `Renaming ${oldValue} -> ${newValue}`,
              bodyLines,
            });
            sourceFile.saveSync();
            newContent = sourceFile.getFullText();
          } else if (oldValue === undefined && newValue === undefined) {
            const warning = {
              title: manualCheckWarningText,
              bodyLines,
            };
            output.warn(warning);
            newContent = bestEffortRename(sourceContent);
          }
        }
      });

      if (newContent) {
        tree.write(relativeFilePath, newContent);
      }
    }

    return parseFile;
  }

  return async function handleRenames(tree: Tree) {
    const projects = getProjects(tree);
    logStartTask(`Updating renames required for ${packageNameToLog}`);

    await Promise.all(
      [...projects.values()].map(async (project) => {
        const { hasCdsDependency } = checkHasCdsDependency(tree, project);
        const tsConfigFilePath = joinPathFragments(tree.root, project.root, 'tsconfig.json');

        if (fs.existsSync(tsConfigFilePath) && hasCdsDependency) {
          /** https://ts-morph.com/ */
          /** https://ts-ast-viewer.com/ */
          const tsProject = new Project({
            skipAddingFilesFromTsConfig: true,
            useInMemoryFileSystem: true,
          });

          const cwd = joinPathFragments(tree.root, project.sourceRoot ?? project.root);

          const files = await glob(['**/*.tsx'], {
            ignore: ['node_modules'],
            onlyFiles: true,
            cwd,
            // Return the absolute path for entries.
            absolute: true,
          });

          const parseFile = getFileParser({ tree, tsProject });
          files.forEach(parseFile);
        }
      }),
    );
  };
}
