import { getProjects, joinPathFragments, output, Tree } from '@nrwl/devkit';
import glob from 'fast-glob';
import fs from 'node:fs';
import { Project, SyntaxKind } from 'ts-morph';

import { checkHasCdsDependency } from '../../helpers/checkHasCdsDependency';
import { logStartTask } from '../../helpers/logStartTask';
import { updateJsxAttributeValue } from '../../helpers/updateJsxAttributeValue';

import { renames } from './data/renames';

type RenameMap = typeof renames;
type IllustrationType = keyof RenameMap;

type GetFileParserParams = {
  tree: Tree;
  tsProject: Project;
};

function isIllustrationTypeWithRenames(val?: string): val is IllustrationType {
  if (val) return val in renames;
  return false;
}

function stringHasIllustrationImport(str: string) {
  return ['web', 'mobile'].some((platform) => str.includes(`@cbhq/cds-${platform}/illustrations`));
}

function stringHasRenamedValue(str: string) {
  return Object.values(renames)
    .flatMap((renameMap) => Object.keys(renameMap))
    .some((oldName) => str.includes(oldName));
}

function getFileParser({ tree, tsProject }: GetFileParserParams) {
  function parseFile(absoluteFilePath: string) {
    let shouldUpdateFile = false;
    const relativeFilePath = absoluteFilePath.replace(`${tree.root}/`, '');
    const sourceContent = fs.readFileSync(absoluteFilePath, 'utf-8');
    if (!stringHasIllustrationImport(sourceContent) || !stringHasRenamedValue(sourceContent)) {
      return;
    }

    const sourceFile = tsProject.createSourceFile(absoluteFilePath, sourceContent);

    const jsxElements = sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement);

    jsxElements.forEach((jsx) => {
      /** "HeroSquare" | "SpotSquare" | "SpotRectangle" | "Pictogram" */
      let illustrationType = jsx.getTagNameNode().getText();

      /** Logging constants */
      const lineNumber = jsx.getStartLineNumber(false);
      const colPos = jsx.getStartLinePos(false);
      const jsxContent = jsx.print();
      const terminalHyperlink = output.underline(`${relativeFilePath}:${lineNumber}:${colPos}`);
      const manualCheckWarningText = `Please manually check ${terminalHyperlink} (<- cmd + click):`;
      const bodyLines = [jsxContent];

      /** Import alias edge case i.e. import { HeroSquare as HeroSquareAlias } from '@cbhq/cds-web/illustrations' */
      if (!(illustrationType in renames)) {
        const declarations = jsx
          .getFirstDescendantByKind(SyntaxKind.Identifier)
          ?.getSymbol()
          ?.getDeclarations();

        if (declarations) {
          declarations.forEach((declaration) => {
            /** If declaration.compilerNode.propertyName is present, it has an import alias */
            const realModuleName = declaration.compilerNode?.propertyName?.escapedText;
            const moduleAlias = declaration.getText();

            if (realModuleName && realModuleName in renames) {
              illustrationType = realModuleName;
              output.warn({
                title: `Component was aliased as ${moduleAlias}, but real name was ${realModuleName}. ${manualCheckWarningText}`,
                bodyLines,
              });
            }
          });
        }
      }

      /** Component name matches "HeroSquare" | "SpotSquare" | "SpotRectangle" | "Pictogram" */
      if (isIllustrationTypeWithRenames(illustrationType)) {
        const updateMap = renames[illustrationType];
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
          shouldUpdateFile = true;
          sourceFile.saveSync();
        } else if (oldValue === undefined && newValue === undefined) {
          const warning = {
            title: `The code is too complex to handle via codemod. ${manualCheckWarningText}`,
            bodyLines,
          };
          output.warn(warning);
        }
      }
    });

    if (shouldUpdateFile) {
      const newContent = sourceFile.getFullText();
      tree.write(relativeFilePath, newContent);
    }
  }

  return parseFile;
}

export default async function renameIllustrations(tree: Tree) {
  const projects = getProjects(tree);
  logStartTask(
    `Parsing source code. Depending on the number of source files which were impact, this may take a while...`,
  );

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
}
