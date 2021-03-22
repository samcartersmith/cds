// npx jscodeshift --extensions=js,jsx,ts,tsx --parser=tsx --transform=./codemod/migrateRNDSImports.ts ./src

import { FileInfo, API, Options, ImportSpecifier, ImportDeclaration, ASTPath } from 'jscodeshift';

import { Codemod } from './Codemod';

const LAYOUT_COMPONENTS = new Set([
  'Box',
  'BoxProps',
  'HStack',
  'HStackProps',
  'VStack',
  'VStackProps',
  'Divider',
  'DividerProps',
  'Spacer',
  'SpacerProps',
  'OverflowGradient',
  'OverflowGradientProps',
]);

function addImport(
  mod: Codemod,
  originalImportPath: ASTPath<ImportDeclaration>,
  names: Set<string>
) {
  if (names.size === 0) {
    return;
  }

  const specs: ImportSpecifier[] = [];
  let path = `@cbhq/cds-mobile/layout`;

  if (names.size === 1) {
    path += `/${Array.from(names)[0]}`;
  }

  names.forEach(name => {
    specs.push(mod.createNode(cs => cs.importSpecifier(cs.identifier(name))));
  });

  originalImportPath.insertAfter(
    mod.createNode(cs => cs.importDeclaration(specs, cs.stringLiteral(path)))
  );
}

export default function migrateRNDSImports(
  fileInfo: FileInfo,
  api: API,
  options: Options
): string | null | undefined | void {
  const mod = new Codemod(fileInfo, api);

  const layoutImports = new Set<string>();
  let importPath: ASTPath<ImportDeclaration> | undefined;

  mod.findImports().forEach(path => {
    if (path.node.source.value !== '@designSystem/primitives') {
      return;
    }

    importPath = path;

    // Extract and remove specifiers
    path.node.specifiers = path.node.specifiers.filter(spec => {
      if (spec.type !== 'ImportSpecifier') {
        return true;
      }

      if (LAYOUT_COMPONENTS.has(spec.imported.name)) {
        layoutImports.add(spec.imported.name);
        return false;
      }

      return true;
    });
  });

  if (!importPath) {
    return;
  }

  addImport(mod, importPath, layoutImports);

  // Remove if no more imports
  if (importPath.node.specifiers.length === 0) {
    importPath.replace();
  }

  return mod.toSource(options);
}
