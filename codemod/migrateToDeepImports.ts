// npx jscodeshift --extensions=js,jsx,ts,tsx --parser=tsx --transform=./codemod/migrateToDeepImports.ts ./src

import { FileInfo, API, Options, ImportSpecifier, ImportDeclaration, ASTPath } from 'jscodeshift';

import { Codemod } from './Codemod';

function addImport(
  mod: Codemod,
  originalImportPath: ASTPath<ImportDeclaration>,
  bucket: string,
  names: Set<string>
) {
  if (names.size === 0) {
    return;
  }

  const specs: ImportSpecifier[] = [];
  let path = `@cbhq/cds-web/${bucket}`;

  if (names.size === 1) {
    path += `/${Array.from(names)[0]}`;
  }

  if (bucket === 'tokens') {
    path = '@cbhq/cds-web/tokens';
  }

  names.forEach(name => {
    specs.push(mod.createNode(cs => cs.importSpecifier(cs.identifier(name))));
  });

  originalImportPath.insertAfter(
    mod.createNode(cs => cs.importDeclaration(specs, cs.stringLiteral(path)))
  );
}

export default function migrateToDeepImports(
  fileInfo: FileInfo,
  api: API,
  options: Options
): string | null | undefined | void {
  const mod = new Codemod(fileInfo, api);

  // Buckets
  const animation = new Set<string>();
  const buttons = new Set<string>();
  const hooks = new Set<string>();
  const icons = new Set<string>();
  const layout = new Set<string>();
  const navigation = new Set<string>();
  const system = new Set<string>();
  const typography = new Set<string>();
  const tokens = new Set<string>();

  // Extract named imports
  let originalImportPath: ASTPath<ImportDeclaration> | undefined;

  mod.findImports().forEach(path => {
    const { node } = path;
    const specsNotToRemove = new Set<string>();

    if (node.source.value !== '@cbhq/cds-web') {
      return;
    }

    originalImportPath = path;

    node.specifiers.forEach(spec => {
      if (spec.type === 'ImportSpecifier') {
        const { name } = spec.imported;

        if (name.startsWith('use')) {
          hooks.add(name);
          return;
        }

        if (name.startsWith('Text')) {
          typography.add(name);
          return;
        }

        switch (name) {
          case 'Lottie':
          case 'LottieStatusAnimation':
          case 'useLottie':
            animation.add(name);
            break;

          case 'Button':
          case 'IconButton':
          case 'IconButtonProps':
            buttons.add(name);
            break;

          case 'FiatIcon':
          case 'Icon':
          case 'Logo':
            icons.add(name);
            break;

          case 'Box':
          case 'HStack':
          case 'Spacer':
          case 'VStack':
            layout.add(name);
            break;

          case 'Navbar':
          case 'Navigation':
          case 'Sidebar':
          case 'NavigationListItem':
            navigation.add(name);
            break;

          case 'ThemeProvider':
            system.add(name);
            break;

          case 'palette':
          case 'spacing':
            tokens.add(name);
            break;

          default:
            specsNotToRemove.add(name);
            break;
        }
      }
    });

    // Filter out removed specifiers
    node.specifiers = node.specifiers.filter(spec => {
      if (spec.type === 'ImportSpecifier') {
        return specsNotToRemove.has(spec.imported.name);
      }

      return true;
    });
  });

  if (!originalImportPath) {
    return undefined;
  }

  // Separate to individual imports
  addImport(mod, originalImportPath, 'animation', animation);
  addImport(mod, originalImportPath, 'buttons', buttons);
  addImport(mod, originalImportPath, 'hooks', hooks);
  addImport(mod, originalImportPath, 'icons', icons);
  addImport(mod, originalImportPath, 'layout', layout);
  addImport(mod, originalImportPath, 'navigation', navigation);
  addImport(mod, originalImportPath, 'system', system);
  addImport(mod, originalImportPath, 'typography', typography);
  addImport(mod, originalImportPath, 'tokens', tokens);

  // Remove if no more imports
  if (originalImportPath.node.specifiers.length === 0) {
    originalImportPath.replace();
    // Else change path to common
  } else {
    originalImportPath.node.source.value = '@cbhq/cds-common';
  }

  return mod.toSource(options);
}
