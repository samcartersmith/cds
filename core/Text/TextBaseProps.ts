import type { ReactChild, ReactFragment } from 'react';

import { PaletteForeground } from '@cds/theme';

export type TextBaseProps = Partial<
  Readonly<{
    /**
     * Text to be styled and wrapped with appropriate html tag.
     */
    children: ReactChild | ReactFragment;
    /**
     * Set text horizontal alignment.
     * @see https://developer.mozilla.org/en-US/docs/Web/CSS/text-align
     */
    align: 'left' | 'right' | 'start' | 'end' | 'center' | 'justify';
    /**
     * Set text color. Default color will be the text color for the theme.
     */
    color: PaletteForeground;
    /**
     * Set special styles for number.
     * @see https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric
     */
    tabularNumbers: boolean;
    /**
     * Use character for number zero with a slash through it to differentiate it from the
     * letter "O".
     * @default false
     */
    slashedZero: boolean;
    /**
     * Set select behavior.
     * @see https://developer.mozilla.org/en-US/docs/Web/CSS/user-select
     */
    selectable: 'none' | 'text' | 'all';
    /**
     * Set text decoration.
     * @see https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration
     */
    underline: boolean;
    /**
     * Set text to be in a single line.
     */
    noWrap: boolean;
    /**
     * Set overflow behavior.
     */
    overflow: 'truncate' | 'clip';
    /**
     * Transform text to all uppercase, all lowercase, or capitalized.
     */
    transform: 'uppercase' | 'lowercase' | 'capitalize';
  }>
>;
