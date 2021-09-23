import { createElement } from 'react';

import type { Typography } from '@cbhq/cds-common';
import { isChildrenFalsy } from '@cbhq/cds-common/utils/isChildrenFalsy';
import { pascalCase } from '@cbhq/cds-utils';
import { cx, css } from 'linaria';

import { useSpacingStyles } from '../hooks/useSpacingStyles';
import * as foregroundStyles from '../styles/foregroundColor';
import { disabledState } from '../styles/interactable';
import { getTypographyStyles } from '../styles/typography';
import type { DynamicElement } from '../types';
import type { HTMLTextTags, TextProps } from './TextProps';
import * as textStyles from './textStyles';

const typographyStyles = css`
  margin: 0;
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
      children,
      style: dangerouslySetColor ? { color: dangerouslySetColor } : undefined,
      className: cx(
        typographyStyles,
        inherit ? textInherit : textStyles[name],
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
