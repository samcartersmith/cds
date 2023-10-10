type GetFontNameAndHashParams = {
  generatedFontName: string;
  hashed?: boolean;
};
export function getFontNameAndHash({ generatedFontName, hashed }: GetFontNameAndHashParams) {
  const hash = hashed ? Date.now() : undefined;

  const fontName = hashed ? `${generatedFontName}-${hash}` : `${generatedFontName}`;

  return { fontName, hash };
}
