/* eslint-disable @typescript-eslint/no-explicit-any */

import { API, FileInfo, JSCodeshift, Options, JSXElement } from 'jscodeshift';
import { Collection } from 'jscodeshift/src/Collection';

export class Codemod {
  api: API;

  cs: JSCodeshift;

  fileInfo: FileInfo;

  source: Collection<any>;

  constructor(fileInfo: FileInfo, api: API) {
    this.api = api;
    this.cs = api.jscodeshift;
    this.fileInfo = fileInfo;
    this.source = this.cs(fileInfo.source);
  }

  createNode<T>(cb: (cs: JSCodeshift) => T): T {
    return cb(this.cs);
  }

  findImports() {
    return this.source.find(this.cs.ImportDeclaration);
  }

  findJsxElementsByName(name: string | string[]): JSXElement[] {
    const elements: JSXElement[] = [];
    const names = Array.isArray(name) ? name : [name];

    this.source.find(this.cs.JSXElement).forEach(({ node }) => {
      const el = node.openingElement;

      if (el.name.type === 'JSXIdentifier' && names.includes(el.name.name)) {
        elements.push(node);
      }
    });

    return elements;
  }

  getComponentNameFromImportPath(
    importPath: string | RegExp,
    namesToFind: string[] = []
  ): string[] {
    const names: string[] = [];

    this.findImports()
      .filter(({ node }) => !!String(node.source.value).match(importPath))
      .forEach(({ node }) => {
        node.specifiers.forEach(spec => {
          // Default
          if (
            spec.type === 'ImportDefaultSpecifier' &&
            spec.local &&
            spec.local.type === 'Identifier'
          ) {
            names.push(spec.local.name);
          }

          // Named
          if (
            spec.type === 'ImportSpecifier' &&
            spec.local &&
            spec.local.type === 'Identifier' &&
            namesToFind.includes(spec.imported.name)
          ) {
            names.push(spec.local.name);
          }
        });
      });

    return names;
  }

  toSource(options: Options) {
    return this.source.toSource({
      tabWidth: 2,
      quote: 'single',
      trailingComma: true,
      ...options,
    });
  }
}
