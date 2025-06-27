/**
 * Codemod for @cbhq/cds-web components:
 * 1. Button: Ensures Button components with `href` or `to` props also have `as="a"`.
 * 2. Link: Ensures Link components without `href` or `to` props have `as="button"`.
 *
 * Example transformations:
 * Before:
 * ```
 * <Button href="/foo">Test</Button>
 * <Button to="/bar">Test</Button>
 * <Link>Test</Link>
 * <Link onPress={() => {}}>Test</Link> // Link without href/to
 * ```
 *
 * After:
 * ```
 * <Button as="a" href="/foo">Test</Button>
 * <Button as="a" to="/bar">Test</Button>
 * <Link as="button">Test</Link>
 * <Link as="button" onPress={() => {}}>Test</Link>
 * ```
 */

import {
  API,
  ASTPath,
  Collection,
  FileInfo,
  ImportDeclaration,
  JSXAttribute,
  JSXElement,
  Options,
  VariableDeclarator,
} from 'jscodeshift';

const BUTTON_COMPONENT_NAME = 'Button';
const ICON_BUTTON_COMPONENT_NAME = 'IconButton';
const PROPS_TO_CHECK = ['href', 'to'];
const PROP_TO_ADD_OR_MODIFY = { name: 'as', value: 'a' };

const LINK_COMPONENT_NAME = 'Link';
const LINK_PROP_TO_ADD_OR_MODIFY = { name: 'as', value: 'button' };

const PRESSABLE_COMPONENT_NAME = 'Pressable';
const PRESSABLE_OPACITY_COMPONENT_NAME = 'PressableOpacity';

const CDS_PACKAGES = ['@cbhq/cds-web']; // Only cds-web

interface ComponentReferences {
  relevantTagNames: Set<string>;
  componentNamespaceNames: Set<string>;
}

/**
 * Finds all references to a specific component within the file.
 * This includes direct imports, namespace imports, and variables assigned to the component.
 * @param j - The jscodeshift API.
 * @param root - The root AST collection of the file.
 * @param cdsPackages - An array of CDS package names to check for imports.
 * @param targetComponentName - The name of the component to find references for (e.g., "Button", "Link").
 * @returns An object containing a set of relevant tag names and a set of component namespace names.
 */
function findComponentReferences(
  j: API['jscodeshift'],
  root: Collection<any>,
  cdsPackages: string[],
  targetComponentName: string,
): ComponentReferences {
  const importedNames = new Set<string>();
  const namespaceNames = new Set<string>();

  // Find direct and namespace imports of the target component
  root
    .find(j.ImportDeclaration)
    .filter((path: ASTPath<ImportDeclaration>) => {
      const source = path.node.source.value;
      return typeof source === 'string' && cdsPackages.some((pkg) => source.startsWith(pkg));
    })
    .forEach((path: ASTPath<ImportDeclaration>) => {
      path.node.specifiers?.forEach((spec) => {
        if (spec.type === 'ImportSpecifier' && spec.imported.type === 'Identifier') {
          if (spec.imported.name === targetComponentName) {
            importedNames.add(
              spec.local ? (spec.local.name as string) : (spec.imported.name as string),
            );
          }
        } else if (spec.type === 'ImportNamespaceSpecifier' && spec.local) {
          namespaceNames.add(spec.local.name as string);
        }
        // Assuming target components are not default exports
      });
    });

  // Find variables assigned to the imported target component
  const variableNames = new Set<string>();
  root.find(j.VariableDeclarator).forEach((path: ASTPath<VariableDeclarator>) => {
    const varNameNode = path.node.id;
    if (varNameNode.type !== 'Identifier') return;
    const varName = varNameNode.name;

    if (!path.node.init) return;

    let isTargetAssigned = false;
    const init = path.node.init;

    if (init.type === 'Identifier' && importedNames.has(init.name)) {
      isTargetAssigned = true;
    } else if (init.type === 'ConditionalExpression') {
      const { consequent, alternate } = init;
      if (
        (consequent.type === 'Identifier' && importedNames.has(consequent.name)) ||
        (alternate.type === 'Identifier' && importedNames.has(alternate.name))
      ) {
        isTargetAssigned = true;
      }
    } else if (init.type === 'MemberExpression') {
      // Handle const MyComponent = CDS.TargetComponent
      if (
        init.object.type === 'Identifier' &&
        namespaceNames.has(init.object.name) &&
        init.property.type === 'Identifier' &&
        init.property.name === targetComponentName
      ) {
        isTargetAssigned = true;
      }
    }

    if (isTargetAssigned) {
      variableNames.add(varName);
    }
  });

  return {
    relevantTagNames: new Set([...importedNames, ...variableNames]),
    componentNamespaceNames: namespaceNames,
  };
}

export default function transformer(file: FileInfo, api: API, options: Options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  let modified = false;

  // Early exit if the file doesn't import from target CDS packages
  const hasCDSImport = root
    .find(j.ImportDeclaration)
    .some(
      (path: ASTPath<ImportDeclaration>) =>
        path.value.source &&
        typeof path.value.source.value === 'string' &&
        CDS_PACKAGES.some((pkg) => (path.value.source.value as string).startsWith(pkg)),
    );

  if (!hasCDSImport) {
    return file.source;
  }

  // Get all references for Button, Link, Pressable, and PressableOpacity components
  const buttonRefs = findComponentReferences(j, root, CDS_PACKAGES, BUTTON_COMPONENT_NAME);
  const iconButtonRefs = findComponentReferences(j, root, CDS_PACKAGES, ICON_BUTTON_COMPONENT_NAME);
  const linkRefs = findComponentReferences(j, root, CDS_PACKAGES, LINK_COMPONENT_NAME);
  const pressableRefs = findComponentReferences(j, root, CDS_PACKAGES, PRESSABLE_COMPONENT_NAME);
  const pressableOpacityRefs = findComponentReferences(
    j,
    root,
    CDS_PACKAGES,
    PRESSABLE_OPACITY_COMPONENT_NAME,
  );

  const combinedAsAComponentNames = new Set([
    BUTTON_COMPONENT_NAME,
    ICON_BUTTON_COMPONENT_NAME,
    PRESSABLE_COMPONENT_NAME,
    PRESSABLE_OPACITY_COMPONENT_NAME,
  ]);
  const combinedAsARelevantTagNames = new Set([
    ...buttonRefs.relevantTagNames,
    ...iconButtonRefs.relevantTagNames,
    ...pressableRefs.relevantTagNames,
    ...pressableOpacityRefs.relevantTagNames,
  ]);
  const combinedAsAComponentNamespaceNames = new Set([
    ...buttonRefs.componentNamespaceNames,
    ...iconButtonRefs.componentNamespaceNames,
    ...pressableRefs.componentNamespaceNames,
    ...pressableOpacityRefs.componentNamespaceNames,
  ]);

  console.log(combinedAsAComponentNames);
  console.log(combinedAsARelevantTagNames);
  console.log(combinedAsAComponentNamespaceNames);

  // --- Process Button, Pressable, and PressableOpacity Components ---
  // Ensure components with 'href' or 'to' props have 'as="a"'
  root
    .find(j.JSXElement)
    .filter((path: ASTPath<JSXElement>) => {
      const openingElement = path.node.openingElement;
      if (openingElement.name.type === 'JSXIdentifier') {
        return combinedAsARelevantTagNames.has(openingElement.name.name);
      }
      if (openingElement.name.type === 'JSXMemberExpression') {
        const object = openingElement.name.object;
        const property = openingElement.name.property;
        if (
          object.type === 'JSXIdentifier' &&
          combinedAsAComponentNamespaceNames.has(object.name as string) &&
          property.type === 'JSXIdentifier' &&
          combinedAsAComponentNames.has(property.name as string)
        ) {
          return true;
        }
      }
      return false;
    })
    .forEach((path: ASTPath<JSXElement>) => {
      const attributes = path.node.openingElement.attributes || [];
      let hasHrefOrTo = false;
      let asPropNode: JSXAttribute | null = null;

      attributes.forEach((attr) => {
        if (attr.type === 'JSXAttribute' && attr.name.type === 'JSXIdentifier') {
          if (PROPS_TO_CHECK.includes(attr.name.name)) {
            hasHrefOrTo = true;
          }
          if (attr.name.name === PROP_TO_ADD_OR_MODIFY.name) {
            asPropNode = attr;
          }
        }
      });

      if (hasHrefOrTo) {
        if (asPropNode) {
          const valueNode = (asPropNode as JSXAttribute).value;
          let needsUpdate = false;

          if (!valueNode) {
            // Prop is boolean shorthand (e.g., <Button as />) or as={null/undefined}
            needsUpdate = true;
          } else if (valueNode.type === 'StringLiteral') {
            if (valueNode.value !== PROP_TO_ADD_OR_MODIFY.value) {
              // e.g., as="button" should be as="a"
              needsUpdate = true;
            }
          } else if (valueNode.type === 'JSXExpressionContainer') {
            const expression = valueNode.expression;
            if (expression && typeof expression === 'object' && 'type' in expression) {
              if (expression.type === 'JSXEmptyExpression') {
                // e.g., as={}
                needsUpdate = true;
              } else if (expression.type === 'StringLiteral') {
                if (expression.value !== PROP_TO_ADD_OR_MODIFY.value) {
                  // e.g., as={"button"} should be as={"a"}
                  needsUpdate = true;
                }
              } else {
                // Any other expression type (e.g., as={variable}, as={true}) is not "a"
                needsUpdate = true;
              }
            } else {
              // Handles cases like as={undefined} or malformed expressions, defaults to needing update
              needsUpdate = true;
            }
          } else {
            // If 'as' prop value is a JSXElement or JSXFragment, it's not "a"
            needsUpdate = true;
          }

          if (needsUpdate) {
            (asPropNode as JSXAttribute).value = j.stringLiteral(PROP_TO_ADD_OR_MODIFY.value);
            modified = true;
          }
        } else {
          // 'as' prop does not exist, add it
          const newAsProp = j.jsxAttribute(
            j.jsxIdentifier(PROP_TO_ADD_OR_MODIFY.name),
            j.stringLiteral(PROP_TO_ADD_OR_MODIFY.value),
          );
          path.node.openingElement.attributes?.push(newAsProp);
          modified = true;
        }
      }
    });

  // --- Process Link Components ---
  // Ensure Link components without 'href' or 'to' props have 'as="button"'
  root
    .find(j.JSXElement)
    .filter((path: ASTPath<JSXElement>) => {
      const openingElement = path.node.openingElement;
      if (openingElement.name.type === 'JSXIdentifier') {
        return linkRefs.relevantTagNames.has(openingElement.name.name);
      }
      if (openingElement.name.type === 'JSXMemberExpression') {
        const object = openingElement.name.object;
        const property = openingElement.name.property;
        if (
          object.type === 'JSXIdentifier' &&
          linkRefs.componentNamespaceNames.has(object.name) &&
          property.type === 'JSXIdentifier' &&
          property.name === LINK_COMPONENT_NAME
        ) {
          return true;
        }
      }
      return false;
    })
    .forEach((path: ASTPath<JSXElement>) => {
      const attributes = path.node.openingElement.attributes || [];
      let hasHref = false;
      let hasTo = false;
      let linkAsPropNode: JSXAttribute | null = null;

      // Check for 'href', 'to', and existing 'as' props
      attributes.forEach((attr) => {
        if (attr.type === 'JSXAttribute' && attr.name.type === 'JSXIdentifier') {
          if (attr.name.name === 'href') {
            hasHref = true;
          }
          if (attr.name.name === 'to') {
            hasTo = true;
          }
          if (attr.name.name === LINK_PROP_TO_ADD_OR_MODIFY.name) {
            linkAsPropNode = attr;
          }
        }
      });

      if (!hasHref && !hasTo) {
        if (linkAsPropNode) {
          const valueNode = (linkAsPropNode as JSXAttribute).value;
          let needsUpdate = false;

          if (!valueNode) {
            // Prop is boolean shorthand (e.g., <Link as />) or as={null/undefined}
            needsUpdate = true;
          } else if (valueNode.type === 'StringLiteral') {
            if (valueNode.value !== LINK_PROP_TO_ADD_OR_MODIFY.value) {
              // e.g., as="a" should be as="button"
              needsUpdate = true;
            }
          } else if (valueNode.type === 'JSXExpressionContainer') {
            const expression = valueNode.expression;
            if (expression && typeof expression === 'object' && 'type' in expression) {
              if (expression.type === 'JSXEmptyExpression') {
                // e.g., as={}
                needsUpdate = true;
              } else if (expression.type === 'StringLiteral') {
                if (expression.value !== LINK_PROP_TO_ADD_OR_MODIFY.value) {
                  // e.g., as={"a"} should be as={"button"}
                  needsUpdate = true;
                }
              } else {
                // Any other expression type (e.g., as={variable}, as={true}) is not "button"
                needsUpdate = true;
              }
            } else {
              // Handles cases like as={undefined} or malformed expressions, defaults to needing update
              needsUpdate = true;
            }
          } else {
            // If 'as' prop value is a JSXElement or JSXFragment, it's not "button"
            needsUpdate = true;
          }

          if (needsUpdate) {
            (linkAsPropNode as JSXAttribute).value = j.stringLiteral(
              LINK_PROP_TO_ADD_OR_MODIFY.value,
            );
            modified = true;
          }
        } else {
          // 'as' prop does not exist, add it
          const newAsProp = j.jsxAttribute(
            j.jsxIdentifier(LINK_PROP_TO_ADD_OR_MODIFY.name),
            j.stringLiteral(LINK_PROP_TO_ADD_OR_MODIFY.value),
          );
          path.node.openingElement.attributes?.push(newAsProp);
          modified = true;
        }
      }
    });

  return modified ? root.toSource({ quote: 'single' }) : file.source;
}

export const parser = 'tsx';
export const extensions = ['ts', 'tsx'];
