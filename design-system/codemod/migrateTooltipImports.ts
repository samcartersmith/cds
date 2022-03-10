/* eslint-disable no-param-reassign */
// npx jscodeshift --extensions=js,jsx,ts,tsx --parser=tsx --transform=./codemod/migrateTooltipImports.ts ./src

import { API, FileInfo, Options } from 'jscodeshift';
import { Codemod } from './Codemod';

export default function migrateTooltipImports(
  fileInfo: FileInfo,
  api: API,
  options: Options,
): string | null | undefined {
  const mod = new Codemod(fileInfo, api);

  mod
    .findImports()
    .filter((path) => {
      const sourceValue = path.node.source.value;
      const specifiers = path.node.specifiers.map((spec) => spec.local?.name);

      // For case: import { Tooltip } from '@cbhq/cds-web/overlays/Tooltip';
      const matchesExactPath = sourceValue === '@cbhq/cds-web/overlays/Tooltip';

      if (matchesExactPath) {
        if (specifiers.length !== 1 || specifiers?.[0] !== 'Tooltip') {
          console.log(`Unexpected Match: sourceValue: ${sourceValue} specifiers: ${specifiers}`);
          return false;
        }
        return true;
      }

      // For case: import { Tooltip } from '@cbhq/cds-web/overlays';
      const matchesDirectoryPath = sourceValue === '@cbhq/cds-web/overlays';

      if (matchesDirectoryPath) {
        if (specifiers.length === 1 && specifiers?.[0] === 'Tooltip') {
          return true;
        }
        if (specifiers.length > 1 || specifiers?.includes('Tooltip')) {
          console.log(
            `Many Specifiers Match: sourceValue: ${sourceValue} specifiers: ${specifiers}`,
          );
        }
      }
      return false;
    })
    .replaceWith(({ node }) => {
      node.source.value = '@cbhq/cds-web/overlays/Deprecated/Tooltip';
      return node;
    });

  return mod.toSource(options);
}
