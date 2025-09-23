/**
 * Codemod to update SparklineInteractive strokeColor value when set to black.
 *
 * This targets SparklineInteractive imported from cds visualization packages and
 * rewrites strokeColor values that are explicitly black to "auto".
 *
 * Matches (case-insensitive):
 * - "black"
 * - "#000000"
 * - "rgb(0, 0, 0)" (any spacing)
 * - "rgba(0, 0, 0, 1)" (any spacing)
 */
import type {
  API,
  ASTPath,
  FileInfo,
  ImportDeclaration,
  ImportDefaultSpecifier,
  ImportNamespaceSpecifier,
  ImportSpecifier,
  JSXAttribute,
  JSXElement,
  JSXExpressionContainer,
  JSXSpreadAttribute,
  Options,
} from 'jscodeshift';

const CDS_VIS_PACKAGES = ['@cbhq/cds-web-visualization', '@cbhq/cds-mobile-visualization'];

const TARGET_IMPORTED_NAME = 'SparklineInteractive';

function isRgbBlackLiteral(value: string): boolean {
  const trimmed = value.trim();
  const lower = trimmed.toLowerCase();
  if (lower === 'black' || lower === '#000000') {
    return true;
  }
  // rgb(0,0,0) with optional spaces
  if (/^rgb\(\s*0\s*,\s*0\s*,\s*0\s*\)$/i.test(trimmed)) {
    return true;
  }
  // rgba(0,0,0,1) with optional spaces
  if (/^rgba\(\s*0\s*,\s*0\s*,\s*0\s*,\s*1\s*\)$/i.test(trimmed)) {
    return true;
  }
  return false;
}

export default function transformer(file: FileInfo, api: API, options: Options) {
  const j = api.jscodeshift;
  const root = j(file.source);

  // Detect relevant imports first to avoid unnecessary re-printing
  const hasRelevantImport = root
    .find(j.ImportDeclaration)
    .some((path: ASTPath<ImportDeclaration>) => {
      const source = path.node.source.value;
      return typeof source === 'string' && CDS_VIS_PACKAGES.some((pkg) => source.startsWith(pkg));
    });

  if (!hasRelevantImport) {
    return file.source;
  }

  // Collect local names for SparklineInteractive and namespace imports
  const localSparklineNames = new Set<string>();
  const namespaceImportNames = new Set<string>();

  root
    .find(j.ImportDeclaration)
    .filter((path: ASTPath<ImportDeclaration>) => {
      const source = path.node.source.value;
      return typeof source === 'string' && CDS_VIS_PACKAGES.some((pkg) => source.startsWith(pkg));
    })
    .forEach((path: ASTPath<ImportDeclaration>) => {
      if (!path.node.specifiers) return;
      path.node.specifiers.forEach(
        (spec: ImportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier) => {
          if (spec.type === 'ImportSpecifier' && spec.imported.type === 'Identifier') {
            if (spec.imported.name === TARGET_IMPORTED_NAME) {
              const localName =
                spec.local && spec.local.type === 'Identifier'
                  ? spec.local.name
                  : spec.imported.name;
              localSparklineNames.add(localName);
            }
          } else if (
            spec.type === 'ImportNamespaceSpecifier' &&
            spec.local &&
            spec.local.type === 'Identifier'
          ) {
            namespaceImportNames.add(spec.local.name);
          }
        },
      );
    });

  if (localSparklineNames.size === 0 && namespaceImportNames.size === 0) {
    return file.source;
  }

  let modified = false;

  // Find all JSX elements that refer to SparklineInteractive (direct or namespaced)
  root
    .find(j.JSXElement)
    .filter((path: ASTPath<JSXElement>) => {
      const opening = path.node.openingElement;

      if (opening.name.type === 'JSXIdentifier') {
        return localSparklineNames.has(opening.name.name);
      }

      if (opening.name.type === 'JSXMemberExpression') {
        const object = opening.name.object;
        const property = opening.name.property;
        if (
          object.type === 'JSXIdentifier' &&
          namespaceImportNames.has(object.name) &&
          property.type === 'JSXIdentifier' &&
          property.name === TARGET_IMPORTED_NAME
        ) {
          return true;
        }
      }

      return false;
    })
    .forEach((path: ASTPath<JSXElement>) => {
      const opening = path.node.openingElement;
      const attributes = opening.attributes || [];

      attributes.forEach((attr: JSXAttribute | JSXSpreadAttribute) => {
        if (
          attr.type === 'JSXAttribute' &&
          attr.name.type === 'JSXIdentifier' &&
          attr.name.name === 'strokeColor' &&
          attr.value
        ) {
          // strokeColor="..."
          if (
            (attr.value as any).type === 'Literal' &&
            typeof (attr.value as any).value === 'string'
          ) {
            const val = (attr.value as any).value as string;
            if (isRgbBlackLiteral(val)) {
              (attr.value as any).value = 'auto';
              modified = true;
            }
          }
          // strokeColor={"..."}
          if (attr.value.type === 'JSXExpressionContainer') {
            const expr = (attr.value as JSXExpressionContainer).expression as any;
            if (expr && expr.type === 'Literal' && typeof expr.value === 'string') {
              if (isRgbBlackLiteral(expr.value)) {
                (attr.value as JSXExpressionContainer).expression = j.literal('auto');
                modified = true;
              }
            }
          }
        }
      });
    });

  return modified ? root.toSource() : file.source;
}

export const parser = 'tsx';
export const extensions = ['ts', 'tsx'];
