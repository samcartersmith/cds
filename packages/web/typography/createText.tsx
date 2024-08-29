import React, { createElement, forwardRef, memo, useMemo } from 'react';
import { css } from 'linaria';
import type { Typography } from '@cbhq/cds-common';
import { useTextTransform } from '@cbhq/cds-common/hooks/useTextTransform';
import { ForwardedRef } from '@cbhq/cds-common/types/ForwardedRef';
import { isChildrenFalsy } from '@cbhq/cds-common/utils/isChildrenFalsy';
import { emptyObject, pascalCase } from '@cbhq/cds-utils';

import { useResponsiveConfig } from '../hooks/useResponsiveConfig';
import { useSpacingStyles } from '../hooks/useSpacingStyles';
import { disabledState } from '../styles/disabledState';
import * as foregroundStyles from '../styles/foregroundColor';
import { responsiveClassName } from '../styles/responsive';
import { getTypographyStyles } from '../styles/typography';
import { fontFamily } from '../tokens';
import type { DynamicElement } from '../types';
import { cx } from '../utils/linaria';

import type { HTMLTextTags, TextProps } from './TextProps';
import { useTypographyStyles } from './useTypographyStyles';

export const typographyResets = css`
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

/** Strikesthrough element accessibility implementation
 * @link: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/s#accessibility_concerns
 */
const strikethrough = css`
  &::before,
  &::after {
    clip-path: inset(100%);
    clip: rect(1px, 1px, 1px, 1px);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }
  &::before {
    content: attr(data-strikethrough-start);
  }

  &::after {
    content: attr(data-strikethrough-end);
  }
`;

export const createText = <
  E extends HTMLTextTags,
  Overrides extends TextProps & { as?: E } = TextProps & { as?: E },
>(
  name: Typography,
  overrides?: Overrides,
) => {
  const TextComponent = <T extends E>(
    {
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
      numberOfLines = overrides?.numberOfLines,
      overflow = overrides?.overflow,
      testID = overrides?.testID,
      transform = overrides?.transform,
      className = overrides?.className,
      style = overrides?.style,
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
      accessibilityLabel = overrides?.accessibilityLabel,
      accessibilityLabelledBy = overrides?.accessibilityLabelledBy,
      id = overrides?.id,
      responsiveConfig,
      strikethroughStartAccessibilityLabel = overrides?.strikethroughStartAccessibilityLabel ??
        '[start of stricken text]',
      strikethroughEndAccessibilityLabel = overrides?.strikethroughEndAccessibilityLabel ??
        '[end of stricken text]',
      ...props
    }: DynamicElement<
      TextProps,
      T,
      Overrides extends { as: E } ? false : true /* as prop is required */
    >,
    ref: ForwardedRef<HTMLElement>,
  ) => {
    const typographyStyles = useTypographyStyles(name);
    const textTransform = useTextTransform(name, transform);

    const spacingStyles = useSpacingStyles({
      spacing,
      spacingTop,
      spacingBottom,
      spacingStart,
      spacingEnd,
      spacingVertical,
      spacingHorizontal,
    });

    const responsiveStyleClassNames = useResponsiveConfig(responsiveConfig);
    const elementType = overrides?.as ?? as;

    const textStyles = useMemo<React.CSSProperties>(
      () => ({
        color: dangerouslySetColor,
        '--typography-number-of-lines': numberOfLines,
        ...style,
      }),
      [dangerouslySetColor, numberOfLines, style],
    );

    if (isChildrenFalsy(children)) {
      return null;
    }

    return createElement(
      elementType,
      {
        ...props,
        'data-testid': testID,
        'aria-label': accessibilityLabel,
        'aria-labelledby': accessibilityLabelledBy,
        id,
        ref,
        ...(mono ? { 'data-variant': 'mono' } : emptyObject),
        ...(elementType === 's'
          ? {
              'data-strikethrough-start': strikethroughStartAccessibilityLabel,
              'data-strikethrough-end': strikethroughEndAccessibilityLabel,
            }
          : emptyObject),
        style: textStyles,
        className: cx(
          typographyResets,
          inherit ? textInherit : typographyStyles,
          color === 'currentColor' ? currentColor : foregroundStyles[color],
          disabled && disabledState,
          elementType === 's' && strikethrough,
          ...getTypographyStyles({
            align,
            display,
            tabularNumbers,
            slashedZero,
            selectable,
            underline,
            noWrap,
            numberOfLines,
            overflow,
            transform: textTransform,
          }),
          spacingStyles,
          responsiveStyleClassNames,
          responsiveConfig && responsiveClassName,
          className,
        ),
      },
      children,
    );
  };

  /**
   * Works around issue DX-2953, an unintentional breaking type change introduced
   * in v5.16.4 here https://github.cbhq.net/frontend/cds/pull/2366 which caused
   * components created by createText to stop inheriting prop types when using
   * polymorphic `as` prop. For example, <TextBody as="time" /> was not inheriting
   * types for the `dateTime` prop.
   * Read more about forwardRef generic types here
   * https://www.benmvp.com/blog/forwarding-refs-polymorphic-react-component-typescript/
   */
  type PolymorphicTextComponentWithRef = (<T extends E>(
    props: DynamicElement<
      TextProps,
      T,
      Overrides extends { as: E } ? false : true /* as prop is required */
    >,
    ref: ForwardedRef<E>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) => React.DetailedReactHTMLElement<any, any>) & { displayName?: string };

  const TextComponentWithRef = memo(
    forwardRef(TextComponent),
  ) as unknown as PolymorphicTextComponentWithRef;

  TextComponentWithRef.displayName = `Text${pascalCase(name)}`;

  return TextComponentWithRef;
};
