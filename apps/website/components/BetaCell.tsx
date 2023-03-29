import React, { memo } from 'react';
import { css } from 'linaria';
import { BoxBaseProps } from '@cbhq/cds-common';
import { useOffsetStyles } from '@cbhq/cds-web/hooks/useOffsetStyles';
import { Box, HStack } from '@cbhq/cds-web/layout';
import { Pressable } from '@cbhq/cds-web/system';

const pressClassName = css`
  padding: 0;
  border-style: none;
  align-items: stretch;
  flex-grow: 1;
  display: flex;
  width: 100%;
`;

// Display and min-width are necessary for truncation to work:
// https://css-tricks.com/flexbox-truncated-text/
export const truncateClassName = css`
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
`;

export const overflowClassName = css`
  overflow: auto;
  text-overflow: unset;
  white-space: normal;
`;

type BetaCellProps = {
  disabled?: boolean;
  onPress?: () => void;
  to?: string;
  startAccessory?: React.ReactNode;
  start?: React.ReactNode;
  startWidth?: number;
  middle?: React.ReactNode;
  middleWidth?: number;
  end?: React.ReactNode;
  endWidth?: number;
  endAccessory?: React.ReactNode;
  priority?: 'start' | 'middle' | 'end';
  selected?: boolean;
} & BoxBaseProps;

function getFlexGrow(width: number | undefined, priority: boolean) {
  if (width) return undefined;
  if (priority) return 1;
  return 0;
}

function getFlexShrink(width: number | undefined, priority: boolean) {
  if (width) return undefined;
  if (priority) return 0;
  return 1;
}

export const BetaCell: React.FC<React.PropsWithChildren<BetaCellProps>> = memo(
  ({
    disabled,
    onPress,
    to,
    start,
    startWidth,
    middle,
    middleWidth,
    end,
    endWidth,
    endAccessory,
    priority = 'middle',
    selected,
    offset,
    offsetVertical,
    offsetHorizontal = 2,
    offsetTop,
    offsetBottom,
    offsetStart,
    offsetEnd,
    ...props
  }) => {
    const offsetClassName = useOffsetStyles({
      offset,
      offsetVertical,
      offsetHorizontal,
      offsetTop,
      offsetBottom,
      offsetStart,
      offsetEnd,
    });

    return (
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
        <HStack
          flexGrow={1}
          background={selected ? 'backgroundAlternate' : undefined}
          borderRadius="standard"
          alignItems="center"
          gap={2}
          spacingHorizontal={1}
          spacingVertical={1}
          width="100%"
          {...props}
        >
          {!!start && (
            <Box
              flexGrow={getFlexGrow(startWidth, priority === 'start')}
              flexShrink={getFlexShrink(startWidth, priority === 'start')}
              justifyContent="flex-start"
              dangerouslySetClassName={truncateClassName}
            >
              {start}
            </Box>
          )}

          {!!middle && (
            <Box
              flexGrow={getFlexGrow(middleWidth, priority === 'middle')}
              flexShrink={getFlexShrink(middleWidth, priority === 'middle')}
              justifyContent="center"
              dangerouslySetClassName={truncateClassName}
            >
              {middle}
            </Box>
          )}

          {!!end && (
            <Box
              flexGrow={getFlexGrow(endWidth, priority === 'end')}
              flexShrink={getFlexShrink(endWidth, priority === 'end')}
              flexDirection="column"
              alignItems="flex-end"
              justifyContent="flex-end"
              width={endWidth}
              dangerouslySetClassName={truncateClassName}
            >
              {end}
            </Box>
          )}

          {!!endAccessory && (
            <Box flexGrow={0} flexShrink={0}>
              {endAccessory}
            </Box>
          )}
        </HStack>
      </Pressable>
    );
  },
);

BetaCell.displayName = 'BetaCell';
