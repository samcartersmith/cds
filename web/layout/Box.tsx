import React, { forwardRef, createElement } from 'react';

import type { BoxBaseProps, ForwardedRef, SharedProps } from '@cbhq/cds-common';
import {
  ElevationProvider,
  ElevationChildrenProvider,
} from '@cbhq/cds-common/context/ElevationProvider';
import { usePinBorderRadiusStyles } from '@cbhq/cds-common/hooks/usePinBorderRadiusStyles';
import { css, cx } from 'linaria';

import { useElevationStyles } from '../hooks/useElevationStyles';
import { useOffsetStyles } from '../hooks/useOffsetStyles';
import { usePinStyles } from '../hooks/usePinStyles';
import { useSpacingStyles } from '../hooks/useSpacingStyles';
import * as backgroundColorStyles from '../styles/backgroundColor';
import { getBorderStyles } from '../styles/border';
import * as borderRadii from '../styles/borderRadius';
import { getFlexStyles } from '../styles/flex';
import {
  ArticleAccessibilityRole,
  AsideAccessibilityRole,
  CSSMap,
  DivAccessibilityRole,
  HeaderFooterAccessibilityRole,
  MainAccessibilityRole,
  SectionAccessibilityRole,
} from '../types';

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
  | 'label'
  | 'main'
  | 'section'
  | 'nav'
  | 'ul'
  | 'ol'
  | 'li';

const overflowStyles: CSSMap<BoxProps['overflow']> = {
  hidden: css`
    overflow: hidden;
  `,
  scroll: css`
    overflow: scroll;
  `,
  visible: css`
    overflow: visible;
  `,
};

export interface BoxProps<As extends BoxElement = 'div'>
  extends Omit<BoxBaseProps, 'position'>,
    SharedProps,
    React.AriaAttributes {
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

export const BoxInner = forwardRef(
  <As extends BoxElement = 'div'>(props: BoxProps<As>, forwardedRef: ForwardedRef<HTMLElement>) => {
    const {
      as = 'div',
      background,
      elevation,
      children,
      overflow,
      role,
      testID,
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
      // Border
      borderRadius,
      bordered,
      borderedTop,
      borderedBottom,
      borderedStart,
      borderedEnd,
      borderedHorizontal,
      borderedVertical,
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
      // A11y
      ...restProps
    } = props;

    const borderRadiusStyles = usePinBorderRadiusStyles(pin, borderRadius);
    const elevationStyles = useElevationStyles(elevation);

    return createElement(
      as,
      {
        ...restProps,
        'data-testid': testID,
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
          overflow && overflowStyles[overflow],
          borderRadius && borderRadii[borderRadius],
          getBorderStyles({
            elevation,
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
          position,
          bottom,
          left,
          right,
          top,
          zIndex,
          ...borderRadiusStyles,
          ...elevationStyles,
        },
      },
      <ElevationChildrenProvider>{children}</ElevationChildrenProvider>
    );
  }
);

export const Box = forwardRef(
  <As extends BoxElement = 'div'>(
    { children, ...props }: BoxProps<As>,
    forwardedRef: ForwardedRef<HTMLElement>
  ) => {
    return (
      <ElevationProvider elevation={props?.elevation}>
        <BoxInner {...props} ref={forwardedRef}>
          {children}
        </BoxInner>
      </ElevationProvider>
    );
  }
);

Box.displayName = 'Box';
BoxInner.displayName = 'BoxInner';
