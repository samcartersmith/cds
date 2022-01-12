import { createElement } from 'react';

import type { Typography } from '@cbhq/cds-common';
import { isChildrenFalsy } from '@cbhq/cds-common/utils/isChildrenFalsy';
import { emptyObject, pascalCase } from '@cbhq/cds-utils';
import { css } from 'linaria';
import { cx } from '../utils/linaria';
import { fontFamily } from '../tokens';
import { useSpacingStyles } from '../hooks/useSpacingStyles';
import * as foregroundStyles from '../styles/foregroundColor';
import { disabledState } from '../styles/interactable';
import { getTypographyStyles } from '../styles/typography';
import type { DynamicElement } from '../types';
import type { HTMLTextTags, TextProps } from './TextProps';
import { useTypographyStyles } from './useTypographyStyles';

const typographyResets = css`
  margin: 0;
  &[data-variant='mono'] {
    font-family: ${fontFamily.mono};
  }
`;

const currentColor = css`
  color: currentColor;
`;

const textInherit = css`
  font-size: inherit;
  line-height: inherit;
  letter-spacing: inherit;
  font-weight: inherit;
  font-family: inherit;
`;

export const createText = <
  E extends HTMLTextTags,
  Overrides extends TextProps & { as?: E } = TextProps & { as?: E },
>(
  name: Typography,
  overrides?: Overrides,
) => {
  const TextComponent = <T extends E>({
    as,
    children = overrides?.children,
    color = overrides?.color ?? 'foreground',
    align = overrides?.align ?? 'start',
    display = overrides?.display,
    tabularNumbers = overrides?.tabularNumbers,
    slashedZero = overrides?.slashedZero,
    selectable = overrides?.selectable,
    underline = overrides?.underline,
    mono = overrides?.mono,
    noWrap = overrides?.noWrap,
    overflow = overrides?.overflow,
    testID = overrides?.testID,
    transform = overrides?.transform,
    dangerouslySetClassName = overrides?.dangerouslySetClassName,
    inherit = overrides?.inherit,
    // Spacing
    spacing = overrides?.spacing,
    spacingTop = overrides?.spacingTop,
    spacingBottom = overrides?.spacingBottom,
    spacingStart = overrides?.spacingStart,
    spacingEnd = overrides?.spacingEnd,
    spacingVertical = overrides?.spacingVertical,
    spacingHorizontal = overrides?.spacingHorizontal,
    // interactable ex. label
    disabled = overrides?.disabled,
    dangerouslySetColor = overrides?.dangerouslySetColor,
    ...props
  }: DynamicElement<
    TextProps,
    T,
    Overrides extends { as: E } ? false : true /* as prop is required */
  >) => {
    const typographyStyles = useTypographyStyles(name);

    const spacingStyles = useSpacingStyles({
      spacing,
      spacingTop,
      spacingBottom,
      spacingStart,
      spacingEnd,
      spacingVertical,
      spacingHorizontal,
    });

    if (isChildrenFalsy(children)) {
      return null;
    }

    return createElement(overrides?.as ?? as, {
      ...props,
      'data-testid': testID,
      ...(mono ? { 'data-variant': 'mono' } : emptyObject),
      children,
      style: dangerouslySetColor ? { color: dangerouslySetColor } : undefined,
      className: cx(
        typographyResets,
        inherit ? textInherit : typographyStyles,
        color === 'currentColor' ? currentColor : foregroundStyles[color],
        disabled && disabledState,
        ...getTypographyStyles(name, {
          align,
          display,
          tabularNumbers,
          slashedZero,
          selectable,
          underline,
          noWrap,
          overflow,
          transform,
        }),
        spacingStyles,
        dangerouslySetClassName,
      ),
    });
  };

  TextComponent.displayName = `Text${pascalCase(name)}`;
  return TextComponent;
};
