import React, { forwardRef, memo, useMemo } from 'react';
import { css, cx } from '@linaria/core';
import type { ThemeVars } from '@cbhq/cds-common/core/theme';
import type { CellPriority } from '@cbhq/cds-common/types';
import { hasCellPriority } from '@cbhq/cds-common/utils/cell';

import type { Polymorphic } from '../core/polymorphism';
import { useCellSpacing } from '../hooks/useCellSpacing';
import { Box, type BoxBaseProps } from '../layout/Box';
import { HStack } from '../layout/HStack';
import { Pressable, type PressableProps } from '../system/Pressable';

import type { CellAccessoryProps } from './CellAccessory';

const pressClassName = css`
  border-style: hidden;
  padding: 0;
  align-items: stretch;
  flex-grow: 1;
  display: flex;
  width: 100%;
`;

const insetFocusRingStyle = css`
  position: relative;
  &:focus {
    outline: none;
  }
  &:focus-visible {
    outline-style: solid;
    outline-width: 2px;
    outline-color: var(--color-bgPrimary);
    outline-offset: 0;
  }
`;

const baseStyle = css`
  display: block;
`;

// Display and min-width are necessary for truncation to work:
// https://css-tricks.com/flexbox-truncated-text/
const truncationStyle = css`
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
`;

export const cellDefaultElement = 'div';

export type CellDefaultElement = typeof cellDefaultElement;

export type CellSpacing = Pick<
  BoxBaseProps,
  | 'padding'
  | 'paddingX'
  | 'paddingY'
  | 'paddingTop'
  | 'paddingEnd'
  | 'paddingBottom'
  | 'paddingStart'
  | 'margin'
  | 'marginX'
  | 'marginY'
  | 'marginTop'
  | 'marginEnd'
  | 'marginBottom'
  | 'marginStart'
>;

export type CellBaseProps = Polymorphic.ExtendableProps<
  BoxBaseProps,
  Pick<PressableProps<'a'>, 'href' | 'target'> & {
    contentClassName?: string;
    onKeyDown?: React.KeyboardEventHandler;
    onKeyUp?: React.KeyboardEventHandler;
    onClick?: React.MouseEventHandler;
    accessory?: React.ReactElement<CellAccessoryProps>;
    children: React.ReactNode;
    detail?: React.ReactNode;
    intermediary?: React.ReactNode;
    media?: React.ReactElement;
    shouldOverflow?: boolean;
    borderRadius?: ThemeVars.BorderRadius;
    /** Apply a fixed width to the detail (end). */
    detailWidth?: number | string;
    /** Is the cell disabled? Will apply opacity and disable interaction. */
    disabled?: boolean;
    /** Which piece of content has the highest priority in regards to text truncation, growing, and shrinking. */
    priority?: CellPriority | CellPriority[];
    /** Is the cell selected? Will apply a background and selected accessory. */
    selected?: boolean;
    /** The spacing to use on the parent wrapper of Cell */
    outerSpacing?: CellSpacing;
    /** The spacing to use on the inner content of Cell */
    innerSpacing?: CellSpacing;
  }
>;

export type CellProps<AsComponent extends React.ElementType> = Polymorphic.Props<
  AsComponent,
  CellBaseProps
>;

type CellComponent = (<AsComponent extends React.ElementType = CellDefaultElement>(
  props: CellProps<AsComponent>,
) => Polymorphic.ReactReturn) &
  Polymorphic.ReactNamed;

export const Cell: CellComponent = memo(
  forwardRef<React.ReactElement<CellBaseProps>, CellBaseProps>(
    <AsComponent extends React.ElementType>(
      {
        as,
        accessory,
        alignItems = 'center',
        borderRadius = 200,
        children,
        className,
        contentClassName,
        detail,
        detailWidth,
        disabled,
        gap = 2,
        intermediary,
        media,
        minHeight,
        maxHeight,
        onClick,
        onKeyDown,
        onKeyUp,
        priority,
        selected,
        testID,
        target,
        href,
        tabIndex,
        /**
         * For TableCell, we don't want to apply an
         * overflow class unless we've defined overflow
         * as either `'truncate' | 'clip'`.
         *
         * */
        shouldOverflow,
        accessibilityLabel,
        accessibilityLabelledBy,
        accessibilityHint,
        innerSpacing,
        outerSpacing,
        ...props
      }: CellProps<AsComponent>,
      ref?: Polymorphic.Ref<AsComponent>,
    ) => {
      const Component = (as ?? cellDefaultElement) satisfies React.ElementType;

      const spacing = useCellSpacing({ innerSpacing, outerSpacing });
      const isAnchor = Boolean(href);
      const isButton = Boolean(onClick ?? onKeyDown ?? onKeyUp);
      const linkable = isAnchor || isButton;
      const contentTruncationStyle = cx(baseStyle, !shouldOverflow && truncationStyle);
      const content = useMemo(
        () => (
          <HStack
            alignItems={alignItems}
            background={selected ? 'bgAlternate' : undefined}
            borderRadius={borderRadius}
            className={contentClassName}
            flexGrow={1}
            gap={gap}
            testID={testID}
            width="100%"
            {...spacing.inner}
            marginX={linkable ? undefined : spacing.inner.marginX}
          >
            {media && (
              <Box flexGrow={0} flexShrink={0}>
                {media}
              </Box>
            )}

            <Box
              className={contentTruncationStyle}
              flexGrow={1}
              flexShrink={hasCellPriority('start', priority) ? 0 : 1}
              justifyContent="flex-start"
            >
              {children}
            </Box>

            {!!intermediary && (
              <Box
                className={contentTruncationStyle}
                flexGrow={0}
                flexShrink={hasCellPriority('middle', priority) ? 0 : 1}
                justifyContent="center"
              >
                {intermediary}
              </Box>
            )}

            {!!detail && (
              <Box
                alignItems="flex-end"
                className={contentTruncationStyle}
                flexDirection="column"
                flexGrow={detailWidth ? undefined : 1}
                flexShrink={detailWidth ? undefined : hasCellPriority('end', priority) ? 0 : 1}
                justifyContent="flex-end"
                width={detailWidth}
              >
                {detail}
              </Box>
            )}

            {!!accessory && (
              <Box flexGrow={0} flexShrink={0}>
                {accessory}
              </Box>
            )}
          </HStack>
        ),
        [
          accessory,
          alignItems,
          borderRadius,
          children,
          contentClassName,
          contentTruncationStyle,
          detail,
          detailWidth,
          gap,
          intermediary,
          linkable,
          media,
          priority,
          selected,
          spacing.inner,
          testID,
        ],
      );

      const wrappedContent = useMemo(() => {
        if (isAnchor)
          return (
            <Pressable
              noScaleOnPress
              transparentWhileInactive
              accessibilityHint={accessibilityHint}
              accessibilityLabel={accessibilityLabel}
              accessibilityLabelledBy={accessibilityLabelledBy}
              as="a"
              background="bg"
              borderRadius={borderRadius}
              className={cx(pressClassName, insetFocusRingStyle)}
              disabled={disabled}
              href={href}
              marginX={spacing.inner.marginX}
              onClick={onClick}
              onKeyDown={onKeyDown}
              onKeyUp={onKeyUp}
              tabIndex={tabIndex}
              target={target}
              testID={testID && `${testID}-cell-pressable`}
            >
              {content}
            </Pressable>
          );
        if (isButton)
          return (
            <Pressable
              noScaleOnPress
              transparentWhileInactive
              accessibilityHint={accessibilityHint}
              accessibilityLabel={accessibilityLabel}
              accessibilityLabelledBy={accessibilityLabelledBy}
              as="button"
              background="bg"
              borderRadius={borderRadius}
              className={cx(pressClassName, insetFocusRingStyle)}
              disabled={disabled}
              marginX={spacing.inner.marginX}
              onClick={onClick}
              onKeyDown={onKeyDown}
              onKeyUp={onKeyUp}
              tabIndex={tabIndex}
              testID={testID && `${testID}-cell-pressable`}
            >
              {content}
            </Pressable>
          );
        return content;
      }, [
        isButton,
        accessibilityHint,
        accessibilityLabel,
        accessibilityLabelledBy,
        borderRadius,
        disabled,
        spacing.inner.marginX,
        onClick,
        onKeyDown,
        onKeyUp,
        tabIndex,
        testID,
        content,
        isAnchor,
        href,
        target,
      ]);

      return (
        <Box
          ref={ref}
          alignItems="stretch"
          as={Component}
          className={className}
          maxHeight={maxHeight}
          minHeight={minHeight}
          width="100%"
          {...spacing.outer}
          {...props}
        >
          {wrappedContent}
        </Box>
      );
    },
  ),
);
