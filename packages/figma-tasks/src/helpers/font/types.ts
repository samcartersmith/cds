export type FontFormat = 'eot' | 'woff' | 'woff2' | 'svg' | 'ttf';

export type FontGlyphData = {
  contents: string;
  srcPath: string;
  metadata: {
    path: string;
    name: string;
    unicode: string[];
    renamed: boolean;
    width: number;
    height: number;
    color: string;
  };
};

export type FontConfig = {
  /** Format of the font file to generate */
  generatedFontFormat: FontFormat;
  /** Directory to output generated font to. */
  generatedFontDirectory: string;
  /** Generate a companion CSS file which references the generated font file. */
  generatedCssDirectory?: string;
  /** The basename of the generated companion CSS file */
  generatedCssFileName?: string;
  /** File to output generated glyphMap to */
  generatedGlyphMapFile?: string;
  /** If the generated font file name should include a hash */
  hashed?: boolean;
};

export type FontProcessorCallbackFunction = (
  err: unknown,
  metadata?: { file: string; name: string; unicode: string[]; renamed: boolean },
) => void;

export type FontProcessor = (filePath: string, callbackFn: FontProcessorCallbackFunction) => void;

export type GeneratedFont = {
  [key in FontFormat]?: string;
} & {
  hash: string;
  glyphsData: FontGlyphData[];
};
