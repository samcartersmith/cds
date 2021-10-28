import { createElement } from 'react';

import type { Typography } from '@cbhq/cds-common';
import { isChildrenFalsy } from '@cbhq/cds-common/utils/isChildrenFalsy';
import { emptyObject, pascalCase } from '@cbhq/cds-utils';
import { cx, css } from 'linaria';
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

export const createText = <E extends HTMLTextTags>(name: Typography, inherit?: boolean) => {
  const TextComponent = <T extends E>({
    as,
    children,
    color = 'foreground',
    align = 'start',
    display,
    tabularNumbers,
    slashedZero,
    selectable,
    underline,
    mono,
    noWrap,
    overflow,
    testID,
    transform,
    dangerouslySetClassName,
    // Spacing
    spacing,
    spacingTop,
    spacingBottom,
    spacingStart,
    spacingEnd,
    spacingVertical,
    spacingHorizontal,
    // interactable ex. label
    disabled,
    dangerouslySetColor,
    ...props
  }: DynamicElement<TextProps, T, true /* as prop is required */>) => {
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

    return createElement(as, {
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
        ...getTypographyStyles({
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
