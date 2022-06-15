import { PaletteAlias } from './Palette';

export type ColorSurgeBackground = Extract<PaletteAlias, 'primary' | 'positive' | 'negative'>;
export type ColorSurgeBaseProps = {
  /**
   * Palette alias of the surge color
   * @default primary
   */
  background?: ColorSurgeBackground;
};
