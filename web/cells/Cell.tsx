import React, { memo } from 'react';

import type { CellBaseProps } from '@cbhq/cds-common/types';
import { css, cx } from 'linaria';

import { useOffsetStyles } from '../hooks/useOffsetStyles';
import { Box } from '../layout/Box';
import { HStack } from '../layout/HStack';
import { Pressable, LinkableProps } from '../system/Pressable';

const pressClassName = css`
  border-style: hidden;
  padding: 0;
  align-items: stretch;
  flex-grow: 1;
  display: flex;
  width: 100%;
`;

export const cellStaticClassName = 'cds-cell';

// Display and min-width are necessary for truncation to work:
// https://css-tricks.com/flexbox-truncated-text/
const truncate = css`
  &.${cellStaticClassName} {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-width: 0;
  }
`;

const overflow = css`
  &.${cellStaticClassName} {
    overflow: auto;
    text-overflow: unset;
    white-space: normal;
  }
`;

export const overflowClassName = cx(cellStaticClassName, overflow);
export const truncateClassName = cx(cellStaticClassName, truncate);

export type CellSharedProps = {
  /** The type of outer wrapping element. */
  as?: 'div' | 'li';
} & LinkableProps;

export type CellProps = CellBaseProps & CellSharedProps;

export const Cell = memo(function Cell({
  accessory,
  as = 'div',
  alignItems = 'center',
  children,
  detail,
  detailWidth,
  disabled,
  intermediary,
  media,
  minHeight,
  offsetHorizontal,
  onPress,
  priority,
  reduceHorizontalSpacing,
  selected,
  testID,
  to,
  ...props
}: CellProps) {
  const offsetClassName = useOffsetStyles({ offsetHorizontal: 2 });
  const linkable = Boolean(onPress ?? to);

  let content = (
    <HStack
      flexGrow={1}
      background={selected ? 'backgroundAlternate' : undefined}
      borderRadius="standard"
      alignItems={alignItems}
      gap={2}
      spacingHorizontal={reduceHorizontalSpacing ? 1 : 2}
      spacingVertical={1}
      width="100%"
      testID={testID}
      dangerouslySetClassName={linkable ? undefined : offsetClassName}
      {...props}
    >
      {media && (
        <Box flexGrow={0} flexShrink={0}>
          {media}
        </Box>
      )}

      <Box
        flexGrow={1}
        flexShrink={priority === 'start' ? 0 : 1}
        justifyContent="flex-start"
        dangerouslySetClassName={truncateClassName}
      >
        {children}
      </Box>

      {!!intermediary && (
        <Box
          flexGrow={0}
          flexShrink={priority === 'middle' ? 0 : 1}
          justifyContent="center"
          dangerouslySetClassName={truncateClassName}
        >
          {intermediary}
        </Box>
      )}

      {!!detail && (
        <Box
          flexGrow={detailWidth ? undefined : 1}
          // eslint-disable-next-line no-nested-ternary
          flexShrink={detailWidth ? undefined : priority === 'end' ? 0 : 1}
          flexDirection="column"
          alignItems="flex-end"
          justifyContent="flex-end"
          width={detailWidth}
          dangerouslySetClassName={truncateClassName}
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

  if (onPress || to) {
    content = (
      <Pressable
        noScaleOnPress
        transparentWhileInactive
        backgroundColor="background"
        borderRadius="standard"
        disabled={disabled}
        onPress={onPress}
        to={to}
        className={`${pressClassName} ${offsetClassName}`}
      >
        {content}
      </Pressable>
    );
  }

  return (
    <Box
      as={as}
      alignItems="stretch"
      width="100%"
      minHeight={minHeight}
      offsetHorizontal={offsetHorizontal}
      spacingVertical={1}
      spacingHorizontal={3}
    >
      {content}
    </Box>
  );
});
