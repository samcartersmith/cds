import webfont from 'webfont';

import { fontOutputGenerator, FontOutputGeneratorParams } from './fontOutputGenerator';
import { FontConfig, FontGlyphData, FontProcessor, GeneratedFont } from './types';

type GenerateFontParams = {
  /** Formats of font files to generate. */
  generatedFontFormats: FontConfig[];
  /** Glob of svg files to generate font from. */
  sourceSvgsGlob: string;
  /**
   * A function which determines the metadata for an icon. It takes a parameter file with an icon svg and should return icon metadata (asynchronously) via the callback function.
   * You can use this function to provide custom logic for svg to codepoint mapping.
   * Custom implementation of https://github.com/nfroidure/svgicons2svgfont/blob/master/src/metadata.js
   */
  processor?: FontProcessor;
  /**
   * Callback function to return
   */
  onComplete?: (data: FontGlyphData[]) => void;
} & Omit<FontOutputGeneratorParams, 'generatedFont'>;

export async function generateFont({
  task,
  sourceSvgsGlob,
  generatedFontName,
  generatedFontFormats,
  generatedGlyphMapFile,
  glyphMapTypes,
  codegenHeader,
  processor,
}: GenerateFontParams) {
  const formats = generatedFontFormats.map((item) => item.generatedFontFormat);

  const generatedFont = (await webfont({
    centerHorizontally: true,
    files: sourceSvgsGlob,
    fontHeight: 4096,
    fontName: generatedFontName,
    formats,
    normalize: true,
    /**
     * Make sure generated unicode is inside PUA to avoid fallback emojis on iOS
     * https://www.filamentgroup.com/lab/bulletproof_icon_fonts.html
     * https://github.com/nfroidure/svgicons2svgfont/blob/master/src/metadata.js#L10-L15
     */
    startUnicode: 0xf000, // U+F000
    metadata: processor,
  }).catch((err: Error) => {
    throw err;
  })) as GeneratedFont;

  const generateOutput = fontOutputGenerator({
    task,
    generatedFont,
    generatedFontName,
    generatedGlyphMapFile,
    glyphMapTypes,
    codegenHeader,
  });
  await Promise.all(generatedFontFormats.map(generateOutput));
}
