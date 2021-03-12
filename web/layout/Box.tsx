import React, { forwardRef } from 'react';

import type { BoxBaseProps, ForwardedRef } from '@cbhq/cds-common';
import { cx } from 'linaria';

import { useOffsetStyles } from '../hooks/useOffsetStyles';
import { usePinStyles } from '../hooks/usePinStyles';
import { useSpacingStyles } from '../hooks/useSpacingStyles';
import * as backgroundColorStyles from '../styles/backgroundColor';
import { getBorderStyles } from '../styles/borderStyles';
import { getFlexStyles } from '../styles/flexStyles';
import {
  ArticleAccessibilityRole,
  AsideAccessibilityRole,
  DivAccessibilityRole,
  HeaderFooterAccessibilityRole,
  MainAccessibilityRole,
  SectionAccessibilityRole,
} from '../types';
import * as styles from './boxStyles';

export type InferBoxRole<As> = As extends 'article'
  ? ArticleAccessibilityRole
  : As extends 'aside'
  ? AsideAccessibilityRole
  : As extends 'div'
  ? DivAccessibilityRole
  : As extends 'footer' | 'header'
  ? HeaderFooterAccessibilityRole
  : As extends 'main'
  ? MainAccessibilityRole
  : As extends 'section'
  ? SectionAccessibilityRole
  : never;

export type BoxElement =
  | 'article'
  | 'aside'
  | 'div'
  | 'footer'
  | 'header'
  | 'main'
  | 'section'
  | 'nav';

export interface BoxProps<As extends BoxElement = 'div'> extends Omit<BoxBaseProps, 'position'> {
  /** The semantic element to render the box as. Is necessary for accessibility support and assistive technologies. */
  as?: As;
  /** Semantic role whole using a non-semantic element. */
  role?: InferBoxRole<As>;
  /** Control how the content should overflow. */
  overflow?: 'visible' | 'hidden' | 'scroll';
  /** How to position the box within its parent. */
  position?: BoxBaseProps['position'] | 'sticky';
  /**
   * @danger This is a migration escape hatch. It is not intended to be used normally.
   */
  dangerouslySetClassName?: string;
}

export const Box = forwardRef(
  <As extends BoxElement = 'div'>(props: BoxProps<As>, forwardedRef: ForwardedRef<HTMLElement>) => {
    const {
      as = 'div',
      background,
      bordered,
      borderedTop,
      borderedBottom,
      borderedStart,
      borderedEnd,
      borderedHorizontal,
      borderedVertical,
      children,
      overflow,
      role,
      rounded,
      // Flex
      alignContent,
      alignItems,
      alignSelf,
      flexBasis,
      flexDirection,
      flexGrow,
      flexShrink,
      flexWrap,
      justifyContent,
      // Dimension
      height,
      maxHeight,
      maxWidth,
      minHeight,
      minWidth,
      width,
      // Position
      bottom,
      left,
      position,
      right,
      top,
      zIndex,
      pin,
      // Spacing
      spacing,
      spacingTop,
      spacingBottom,
      spacingStart,
      spacingEnd,
      spacingVertical,
      spacingHorizontal,
      // Offset
      offset,
      offsetBottom,
      offsetEnd,
      offsetHorizontal,
      offsetStart,
      offsetTop,
      offsetVertical,
      dangerouslySetClassName,
    } = props;

    return React.createElement(
      as,
      {
        ref: forwardedRef,
        className: cx(
          getFlexStyles({
            alignContent,
            alignItems,
            alignSelf,
            flexDirection,
            flexWrap,
            justifyContent,
          }),
          background && backgroundColorStyles[background === true ? 'background' : background],
          overflow && styles.overflow[overflow],
          position && styles.position[position],
          rounded && styles.borderRadius,
          getBorderStyles({
            bordered,
            borderedTop,
            borderedBottom,
            borderedStart,
            borderedEnd,
            borderedHorizontal,
            borderedVertical,
          }),
          useSpacingStyles({
            spacing,
            spacingBottom,
            spacingEnd,
            spacingHorizontal,
            spacingStart,
            spacingTop,
            spacingVertical,
          }),
          useOffsetStyles({
            offset,
            offsetBottom,
            offsetEnd,
            offsetHorizontal,
            offsetStart,
            offsetTop,
            offsetVertical,
          }),
          usePinStyles(pin),
          dangerouslySetClassName
        ),
        role,
        style: {
          flexBasis,
          flexGrow,
          flexShrink,
          height,
          maxHeight,
          maxWidth,
          minHeight,
          minWidth,
          width,
          bottom,
          left,
          right,
          top,
          zIndex,
        },
      },
      children
    );
  }
);

Box.displayName = 'Box';
