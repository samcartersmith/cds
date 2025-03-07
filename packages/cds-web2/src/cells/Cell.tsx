import React, { type HTMLAttributes, forwardRef, memo, useMemo } from 'react';
import { css, cx } from '@linaria/core';
import { useCellSpacing } from '@cbhq/cds-common2/hooks/useCellSpacing';
import type { SharedAccessibilityProps } from '@cbhq/cds-common2/types';
import type { CellBaseProps } from '@cbhq/cds-common2/types/CellBaseProps';
import { hasCellPriority } from '@cbhq/cds-common2/utils/cell';

import { type BoxProps, Box } from '../layout/Box';
import { HStack } from '../layout/HStack';
import { type PressableProps, Pressable } from '../system/Pressable';

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

type CellElementTag = 'div' | 'li';

export type CellSharedProps = BoxProps<CellElementTag> &
  Pick<PressableProps<'a'>, 'href' | 'target'> &
  Pick<
    SharedAccessibilityProps,
    'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
  > & {
    /** The type of outer wrapping element. */
    as?: CellElementTag;
    onKeyDown?: HTMLAttributes<HTMLElement>['onKeyDown'];
    onKeyUp?: HTMLAttributes<HTMLElement>['onKeyUp'];
    onClick?: React.MouseEventHandler;
  };

export type CellProps = Omit<CellBaseProps, 'minHeight' | 'maxHeight'> &
  CellSharedProps & {
    contentClassName?: string;
  };

export const Cell = memo(
  forwardRef(function Cell(
    {
      accessory,
      as = 'div',
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
      compact,
      ...props
    }: CellProps,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) {
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
        as={as}
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
  }),
);
