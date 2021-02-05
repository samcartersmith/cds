import type { ReactChild, ReactFragment } from 'react';

import { PaletteForeground } from '@cds/theme';

export type TextBaseProps = Partial<
  Readonly<{
    children: ReactChild | ReactFragment;
    /**
     * Specifies text alignment. On mobile, the value `justify` is only supported on iOS and fallbacks to left on Android.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align) | [React Native docs](https://reactnative.dev/docs/text-style-props#textalign)
     * @default start
     */
    align: 'start' | 'end' | 'center' | 'justify';
    /**
     * Text color. Accepts a valid PaletteForeground alias.
     * @default foreground
     */
    color: PaletteForeground;
    /**
     * Activates the set of figures where numbers are all of the same size, allowing them to be easily aligned.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric) | [React Native Docs](https://reactnative.dev/docs/text-style-props#fontvariant)
     * @default false
     */
    tabularNumbers: boolean;
    /**
     * Use character for number zero with a slash through it to differentiate it from the letter 'O'.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric)
     * @default false
     */
    slashedZero: boolean;
    /**
     * Set select behavior. On mobile, selectable is binary, 'none' will be not selectable and either 'text' or 'all' will be selectable on Android. It is not yet supported on iOS.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/user-select) | [React Native Docs](https://reactnative.dev/docs/text#selectable)
     * @default text
     */
    selectable: 'none' | 'text' | 'all';
    /**
     * Set text decoration.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration) | [React Native Docs](https://reactnative.dev/docs/text-style-props#textdecorationline)
     * @default false
     */
    underline: boolean;
    /**
     * Set text to be in a single line.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)
     * @default false
     */
    noWrap: boolean;
    /**
     * Set overflow behavior.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space) | [React Native Docs](https://reactnative.dev/docs/text#ellipsizemode)
     */
    overflow: 'truncate' | 'clip';
    /**
     * Transform text to all uppercase, all lowercase, or capitalized.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/text-transform) | [React Native Docs](https://reactnative.dev/docs/text-style-props#texttransform)
     */
    transform: 'uppercase' | 'lowercase' | 'capitalize';
  }>
>;
