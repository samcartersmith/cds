import type { ReactChild, ReactFragment } from 'react';

import { PaletteForeground } from '@cds/theme';

export type TextBaseProps = Partial<
  Readonly<{
    children: ReactChild | ReactFragment;
    /**
     * Specifies text alignment.
     * @web_reference https://developer.mozilla.org/en-US/docs/Web/CSS/text-align
     * @mobile_reference https://reactnative.dev/docs/text-style-props#textalign
     * @mobile_description The value `justify` is only supported on iOS and fallbacks to left on Android.
     * @default left
     */
    align: 'left' | 'right' | 'start' | 'end' | 'center' | 'justify';
    /**
     * Text color. Accepts a valid PaletteForeground alias.
     * @default foreground
     */
    color: PaletteForeground;
    /**
     * Activates the set of figures where numbers are all of the same size, allowing them to be easily aligned.
     * @web_reference https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric
     * @mobile_reference https://reactnative.dev/docs/text-style-props#fontvariant
     * @default false
     */
    tabularNumbers: boolean;
    /**
     * Use character for number zero with a slash through it to differentiate it from the letter 'O'.
     * @web_reference https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric
     * @default false
     */
    slashedZero: boolean;
    /**
     * Set select behavior.
     * @mobile_description On mobile, selectable is binary, 'none' will be not selectable and either 'text' or 'all' will be selectable on Android. It is not yet supported on iOS.
     * @web_reference https://developer.mozilla.org/en-US/docs/Web/CSS/user-select
     * @mobile_reference https://reactnative.dev/docs/text#selectable
     * @default text
     */
    selectable: 'none' | 'text' | 'all';
    /**
     * Set text decoration.
     * @web_reference https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration
     * @mobile_reference https://reactnative.dev/docs/text-style-props#textdecorationline
     * @default false
     */
    underline: boolean;
    /**
     * Set text to be in a single line.
     * @web_reference https://developer.mozilla.org/en-US/docs/Web/CSS/white-space
     * @default false
     */
    noWrap: boolean;
    /**
     * Set overflow behavior.
     * @web_reference https://developer.mozilla.org/en-US/docs/Web/CSS/white-space
     * @mobile_reference https://reactnative.dev/docs/text#ellipsizemode
     */
    overflow: 'truncate' | 'clip';
    /**
     * Transform text to all uppercase, all lowercase, or capitalized.
     * @web_reference https://developer.mozilla.org/en-US/docs/Web/CSS/text-transform
     * @mobile_reference https://reactnative.dev/docs/text-style-props#texttransform
     */
    transform: 'uppercase' | 'lowercase' | 'capitalize';
  }>
>;
