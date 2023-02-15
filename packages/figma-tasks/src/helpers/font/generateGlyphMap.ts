import path from 'node:path';
import { sortByAlphabet, tokensTemplate, writePrettyFile } from '@cbhq/script-utils';

import { getRelativePathForImport } from '../getRelativePathForImport';
import { sortByCreatedAt } from '../sortByCreatedAt';
import { CodegenItemConfig } from '../types';

import { FontGlyphData } from './types';

export type GenerateGlyphMapParams = {
  /** File to output generated glyphMap to */
  generatedGlyphMapFile: string;
  /** The info for the generated internal typescript types. Needed for glyphsMap generation */
  glyphMapTypes: CodegenItemConfig[];
  /** Header to put at the top of any codegenerated files */
  codegenHeader: string;
  /** Glyph data from a generated font */
  glyphsData: FontGlyphData[];
};

export async function generateGlyphMap({
  generatedGlyphMapFile: dest,
  glyphsData,
  glyphMapTypes,
  codegenHeader,
}: GenerateGlyphMapParams) {
  const content = new Map(
    glyphsData
      .map((item) => item.metadata)
      /**
       * The sort order here is important since the glyphMap is dual purpose:
       * 1. It powers the icon font glyph lookup
       * 2. The keys (i.e. fully qualified internal icon name) is used to pass into our BaseIcon component when rendering stories in Percy.
       *
       * The second use case requires lastUpdated to ensure backward compatible layouts when pulling updates from Figma.
       */
      .sort(sortByCreatedAt)
      .map((item) => {
        /**
         * The webfont package returns multiple values since a character can be assigned to multiple code points.
         * The first one should be the default one to use in our glyphMap
         */
        const fontUnicode = item.unicode[0];

        return [item.name, fontUnicode] as const;
      }),
  );

  const destDir = path.dirname(dest);

  const typescriptImports = glyphMapTypes
    .sort((prev, next) => sortByAlphabet(prev.exportName, next.exportName))
    .map((item) => {
      const relativePath = getRelativePathForImport(destDir, item.dest);
      return `import type { ${item.exportName} } from './${relativePath}';`;
    })
    .join('\n');

  /**
   *
   */
  const typeDefinition = `
    type InternalIconName = ${glyphMapTypes.map((item) => item.exportName).join(' | ')};
  `;

  const glyphMap = {
    dest,
    get content() {
      return tokensTemplate`
        ${codegenHeader}

        ${typescriptImports}

        ${typeDefinition}

        /**
          * This file powers the icon font lookup on web and mobile.
          * In addition, this is used to populate the stories in percy, so the sort order based on last updated is important.
          */
        const glyphMap: Record<InternalIconName, string>  = ${content};

        export default glyphMap;
      `;
    },
  };

  return writePrettyFile(glyphMap.dest, glyphMap.content);
}
