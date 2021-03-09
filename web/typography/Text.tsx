import * as React from 'react';

import type { Typography } from '@cbhq/cds-common';
import { pascalCase } from '@cbhq/cds-utils';
import { cx, css } from 'linaria';

import { useSpacingStyles } from '../hooks/useSpacingStyles';
import * as foregroundStyles from '../styles/foregroundColor';
import { getTypographyStyles } from '../styles/typography';
import type { DynamicElement } from '../types';
import { HTMLTextTags, TextProps } from './TextProps';
import * as textStyles from './textStyles';

const currentColor = css`
  color: currentColor;
`;

export const createText = <E extends HTMLTextTags>(name: Typography) => {
  const TextComponent = <T extends E>({
    as,
    color = 'foreground',
    align = 'start',
    display,
    tabularNumbers,
    slashedZero,
    selectable,
    underline,
    noWrap,
    overflow,
    transform,
    // Spacing
    spacing,
    spacingTop,
    spacingBottom,
    spacingStart,
    spacingEnd,
    spacingVertical,
    spacingHorizontal,
    ...props
  }: DynamicElement<T, TextProps>) =>
    React.createElement(as, {
      ...props,
      className: cx(
        textStyles[name],
        color === 'currentColor' ? currentColor : foregroundStyles[color],
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
        useSpacingStyles({
          spacing,
          spacingTop,
          spacingBottom,
          spacingStart,
          spacingEnd,
          spacingVertical,
          spacingHorizontal,
        })
      ),
    });

  TextComponent.displayName = pascalCase(name);
  return TextComponent;
};
