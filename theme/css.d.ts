import { PaletteAlias } from '@cds/theme/palette/types';
import { usePalette } from '@cds/theme/palette/usePalette';

type PaletteCssVariable = { [key in `--${PaletteAlias}`]?: ReturnType<typeof usePalette>[key] };

declare module 'csstype' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Properties extends PaletteCssVariable {}
}
