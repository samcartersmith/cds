import React, { forwardRef, memo } from 'react';
import { css } from '@linaria/core';
import type { ContentCellBaseProps as SharedContentCellBaseProps } from '@cbhq/cds-common2/types';
import { isProduction } from '@cbhq/cds-utils';

import type { Polymorphic } from '../core/polymorphism';
import { Box } from '../layout/Box';
import { HStack } from '../layout/HStack';
import { VStack } from '../layout/VStack';
import { Text } from '../typography/Text';

import { type CellBaseProps, Cell } from './Cell';
import { CellAccessory } from './CellAccessory';

const overflowStyle = css`
  overflow: auto;
  text-overflow: unset;
  white-space: normal;
`;

const truncationStyle = css`
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
`;

export const contentCellDefaultElement = 'div';

export type ContentCellDefaultElement = typeof contentCellDefaultElement;

export type ContentCellBaseProps = Polymorphic.ExtendableProps<
  Omit<CellBaseProps, 'children'>,
  SharedContentCellBaseProps
>;

export type ContentCellProps<AsComponent extends React.ElementType> = Polymorphic.Props<
  AsComponent,
  ContentCellBaseProps
>;

type ContentCellComponent = (<AsComponent extends React.ElementType = ContentCellDefaultElement>(
  props: ContentCellProps<AsComponent>,
) => Polymorphic.ReactReturn) &
  Polymorphic.ReactNamed;

export const ContentCell: ContentCellComponent = memo(
  forwardRef<React.ReactElement<ContentCellBaseProps>, ContentCellBaseProps>(
    <AsComponent extends React.ElementType>(
      {
        as,
        accessory,
        title,
        description,
        disabled,
        media,
        meta,
        selected,
        subtitle,
        compact,
        detailWidth,
        priority,
        innerSpacing,
        outerSpacing,
        alignItems = 'flex-start',
        ...props
      }: ContentCellProps<AsComponent>,
      ref?: Polymorphic.Ref<AsComponent>,
    ) => {
      const Component = (as ?? contentCellDefaultElement) satisfies React.ElementType;
      if (!isProduction()) {
        if (meta && !title && !subtitle) {
          // eslint-disable-next-line no-console
          console.error('ContentCell: Cannot use `meta` without a `title` or `subtitle`.');
        }
      }

      const accessoryType = selected ? 'selected' : accessory;
      const hasTitles = Boolean(title ?? subtitle);

      return (
        <Cell
          ref={ref}
          accessory={accessoryType && <CellAccessory paddingTop={0.5} type={accessoryType} />}
          alignItems={alignItems}
          as={Component}
          compact={compact}
          detailWidth={detailWidth}
          disabled={disabled}
          innerSpacing={innerSpacing}
          media={media}
          outerSpacing={outerSpacing}
          priority={priority}
          selected={selected}
          {...props}
        >
          {hasTitles && (
            <HStack alignItems="flex-start" justifyContent="space-between">
              <VStack className={truncationStyle} flexGrow={1} flexShrink={1}>
                {!!title && (
                  <Text as="div" font="headline" overflow="truncate">
                    {title}
                  </Text>
                )}

                {!!subtitle && (
                  <Text
                    as="div"
                    font="label2"
                    overflow="truncate"
                    paddingBottom={description ? 0.5 : 0}
                    paddingTop={title ? 0.5 : 0}
                  >
                    {subtitle}
                  </Text>
                )}
              </VStack>

              {!!meta && (
                <Box
                  className={truncationStyle}
                  flexGrow={0}
                  flexShrink={0}
                  justifyContent="flex-end"
                  paddingStart={2}
                  paddingTop={0.5}
                >
                  <Text as="span" color="fgMuted" font="label2" overflow="truncate">
                    {meta}
                  </Text>
                </Box>
              )}
            </HStack>
          )}

          {!!description && (
            <div className={overflowStyle}>
              <Text as="div" color="fgMuted" font="body">
                {description}
              </Text>
            </div>
          )}
        </Cell>
      );
    },
  ),
);
