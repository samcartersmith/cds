import fs from 'node:fs';
import path from 'node:path';
import { Task } from '@cbhq/mono-tasks';
import { existsOrCreateDir, getAbsolutePath, writePrettyFile } from '@cbhq/script-utils';

import { generateGlyphMap, GenerateGlyphMapParams } from './generateGlyphMap';
import { getFontNameAndHash } from './getFontNameAndHash';
import { FontConfig, GeneratedFont } from './types';

export type FontOutputGeneratorParams = {
  task: Task;
  /** The font family name to use in generated fonts. */
  generatedFontName: string;
  generatedFont: GeneratedFont;
} & Omit<GenerateGlyphMapParams, 'glyphsData'>;

export function fontOutputGenerator({
  task,
  generatedFontName,
  generatedFont,
  generatedGlyphMapFile: fallbackGeneratedGlyphMapFile,
  glyphMapTypes,
  codegenHeader,
}: FontOutputGeneratorParams) {
  return async function generateFontOutput({
    generatedFontFormat,
    generatedFontDirectory,
    generatedCssDirectory,
    generatedCssFileName,
    generatedGlyphMapFile = fallbackGeneratedGlyphMapFile,
    hashed,
  }: FontConfig) {
    const promises: Promise<void>[] = [];
    const fontContents = generatedFont[generatedFontFormat];

    if (fontContents) {
      const fontOutputDir = getAbsolutePath(task, generatedFontDirectory);
      const { fontName, hash } = getFontNameAndHash({ generatedFontName, hashed });
      const fontNameWithExt = `${fontName}.${generatedFontFormat}`;
      const fontFilePath = path.join(fontOutputDir, fontNameWithExt);
      const fontFileDir = path.dirname(fontFilePath);
      if (hash && fs.existsSync(fontFileDir)) {
        fs.rmSync(fontFileDir, { recursive: true });
        fs.mkdirSync(fontFileDir, { recursive: true });
      }

      await existsOrCreateDir(fontFilePath);
      promises.push(fs.promises.writeFile(fontFilePath, fontContents));

      const glyphMapPromise = generateGlyphMap({
        generatedGlyphMapFile,
        glyphsData: generatedFont.glyphsData,
        glyphMapTypes,
        codegenHeader,
      });

      promises.push(glyphMapPromise);

      if (generatedCssDirectory) {
        const cssOutputDir = getAbsolutePath(task, generatedCssDirectory);
        const cssFileBasename = generatedCssFileName ?? generatedFontName;
        const cssFilePath = path.join(cssOutputDir, `${cssFileBasename}.css`);
        // const fontDirAsRelative = path.relative(path.dirname(cssFilePath), fontFileDir);
        const fontFileRelativeToCssFile = path.relative(path.dirname(cssFilePath), fontFilePath);

        const cssContent = `
        @font-face {
          font-family: '${generatedFontName}';
          font-style: normal;
          font-weight: 400;
          font-display: block;
          src: url('${fontFileRelativeToCssFile}') format('${generatedFontFormat}');
        }`;
        promises.push(writePrettyFile(cssFilePath, cssContent));
      }

      await Promise.all(promises);
    }
  };
}
