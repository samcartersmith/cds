import { PaletteAlias } from '@cds/common';

type PaletteCssVariable = { [key in `--${PaletteAlias}`]?: string };

declare module 'csstype' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Properties extends PaletteCssVariable {}
}
