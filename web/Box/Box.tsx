import React from 'react';

import type { BoxBaseProps } from '@cds/common';
import { cx } from 'linaria';

import { usePinStyles } from '../hooks/usePinStyles';
import { useSpacingStyles } from '../hooks/useSpacingStyles';
import * as backgroundColorStyles from '../styles/backgroundColor';
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

export type BoxElement = 'article' | 'aside' | 'div' | 'footer' | 'header' | 'main' | 'section';

export interface BoxProps<As extends BoxElement = 'div'> extends BoxBaseProps {
  as?: As;
  role?: InferBoxRole<As>;
  overflow?: 'visible' | 'hidden' | 'scroll';
}

export const Box = <As extends BoxElement = 'div'>(props: BoxProps<As>) => {
  const {
    as: Tag = 'div',
    background,
    bordered,
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
  } = props;

  return (
    <Tag
      className={cx(
        styles.box,
        background && backgroundColorStyles[background === true ? 'background' : background],
        alignContent && styles.alignContent[alignContent],
        alignItems && styles.alignItems[alignItems],
        alignSelf && styles.alignSelf[alignSelf],
        flexDirection && styles.flexDirection[flexDirection],
        flexWrap && styles.flexWrap[flexWrap],
        justifyContent && styles.justifyContent[justifyContent],
        overflow && styles.overflow[overflow],
        position && styles.position[position],
        bordered && styles.border,
        rounded && styles.borderRadius,
        useSpacingStyles({
          all: spacing,
          top: spacingTop,
          bottom: spacingBottom,
          start: spacingStart,
          end: spacingEnd,
          vertical: spacingVertical,
          horizontal: spacingHorizontal,
        }),
        usePinStyles(pin)
      )}
      role={role}
      style={{
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
      }}
    >
      {children}
    </Tag>
  );
};
