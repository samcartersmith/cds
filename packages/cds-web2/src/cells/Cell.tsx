import React, { forwardRef, memo } from 'react';
import { css, cx } from '@linaria/core';
import type { CellBaseProps } from '@cbhq/cds-common2/types/CellBaseProps';
import { hasCellPriority } from '@cbhq/cds-common2/utils/cell';

import { useCellSpacing } from '../hooks/useCellSpacing';
import { type BoxProps, Box } from '../layout/Box';
import { HStack } from '../layout/HStack';
import { marginX } from '../styles/styles';
import { LinkableProps, Pressable } from '../system/Pressable';

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
    outline-color: var(--color-backgroundPrimary);
    outline-offset: 0;
  }
`;

const baseStyle = css`
  display: block;
`;

// Display and min-width are necessary for truncation to work:
// https://css-tricks.com/flexbox-truncated-text/
const truncate = css`
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
`;

const overflow = css`
  overflow: auto;
  text-overflow: unset;
  white-space: normal;
`;

export const overflowClassName = cx(baseStyle, overflow);
export const truncateClassName = cx(baseStyle, truncate);

type CellElementTag = 'div' | 'li';

export type CellSharedProps = {
  /** The type of outer wrapping element. */
  as?: CellElementTag;
  onKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void;
} & LinkableProps;

export type CellProps = Omit<CellBaseProps, 'minHeight' | 'maxHeight'> &
  CellSharedProps & {
    contentClassName?: string;
  } & BoxProps<CellElementTag>;

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
      onPress,
      onKeyDown,
      onKeyUp,
      priority,
      selected,
      testID,
      to,
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
      /** Props for useCellSpacing */
      ...spacingProps
    }: CellProps,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) {
    const spacing = useCellSpacing(spacingProps);
    const offsetClassName = marginX[spacing.inner.marginX];
    const linkable = Boolean(onPress ?? onKeyDown ?? onKeyUp ?? to ?? href);
    const maybeTruncateClassName = cx(baseStyle, !shouldOverflow && truncateClassName);

    let content = (
      <HStack
        alignItems={alignItems}
        background={selected ? 'backgroundAlternate' : undefined}
        borderRadius={borderRadius}
        flexGrow={1}
        gap={gap}
        testID={testID}
        width="100%"
        {...spacing.inner}
        className={contentClassName}
        marginX={linkable ? undefined : spacing.inner.marginX}
      >
        {media && (
          <Box flexGrow={0} flexShrink={0}>
            {media}
          </Box>
        )}

        <Box
          className={maybeTruncateClassName}
          flexGrow={1}
          flexShrink={hasCellPriority('start', priority) ? 0 : 1}
          justifyContent="flex-start"
        >
          {children}
        </Box>

        {!!intermediary && (
          <Box
            className={maybeTruncateClassName}
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
            className={maybeTruncateClassName}
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
    );

    if (linkable) {
      content = (
        <Pressable
          noScaleOnPress
          transparentWhileInactive
          accessibilityHint={accessibilityHint}
          accessibilityLabel={accessibilityLabel}
          accessibilityLabelledBy={accessibilityLabelledBy}
          background="background"
          borderRadius={borderRadius}
          className={cx(pressClassName, offsetClassName, insetFocusRingStyle)}
          disabled={disabled}
          href={href}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          onPress={onPress}
          tabIndex={tabIndex}
          target={target}
          testID={testID && `${testID}-cell-pressable`}
          to={to}
        >
          {content}
        </Pressable>
      );
    }

    return (
      <Box
        alignItems="stretch"
        as={as}
        className={className}
        maxHeight={maxHeight}
        minHeight={minHeight}
        width="100%"
        {...spacing.outer}
        ref={ref}
      >
        {content}
      </Box>
    );
  }),
);
