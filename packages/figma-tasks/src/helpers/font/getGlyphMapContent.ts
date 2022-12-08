import { tokensTemplate } from '@cbhq/script-utils';

import { convertCodepoint } from './convertCodepoint';
import { FontGlyphData } from './types';

export function getGlyphMapContent(glyphData: FontGlyphData[]) {
  const content = new Map(
    glyphData.map((item) => {
      const unicodeHexadecimal = item.metadata.unicode[0];
      const unicode = convertCodepoint.unicodeHexadecimalToStringCharacter(unicodeHexadecimal);
      return [item.metadata.name, unicode] as const;
    }),
  );

  const glyphMapContent = tokensTemplate`
    export const glyphMap = ${content};
  `;

  return glyphMapContent;
}
