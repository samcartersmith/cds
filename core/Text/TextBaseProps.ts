import type { ReactChild, ReactFragment } from 'react';

import { PaletteForeground } from '@cds/theme/palette/types';

export interface TextBaseProps {
  /**
   * Text to be styled and wrapped with appropriate html tag.
   */
  readonly children: ReactChild | ReactFragment;
  /**
   * Set text color. Default color will be the text color for the theme.
   */
  readonly color?: PaletteForeground;
  /**
   * Let the user select the text. Supported on web and Android.
   *
   * @default true
   */
  readonly selectable?: boolean;
  /**
   * Specify text horizontal alignment.
   *
   * @default 'left'
   */
  readonly align?: 'left' | 'center' | 'right' | 'justify';
  /**
   * Show numbers in monospace tabular style. It defaults to true for label2 and caption and false
   * in the other typographies.
   */
  readonly tnum?: boolean;
}
