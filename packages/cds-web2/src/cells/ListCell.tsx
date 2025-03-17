import React, { forwardRef, memo, useMemo } from 'react';
import { css } from '@linaria/core';
import { compactListHeight, listHeight } from '@cbhq/cds-common2/tokens/cell';
import type { ListCellBaseProps as SharedListCellBaseProps } from '@cbhq/cds-common2/types';

import type { Polymorphic } from '../core/polymorphism';
import { Box } from '../layout/Box';
import { VStack } from '../layout/VStack';
import { Text } from '../typography/Text';

import { type CellBaseProps, Cell } from './Cell';
import { CellAccessory } from './CellAccessory';
import { CellDetail } from './CellDetail';

const overflowStyle = css`
  overflow: auto;
  text-overflow: unset;
  white-space: normal;
`;

export const listCellDefaultElement = 'div';

export type ListCellDefaultElement = typeof listCellDefaultElement;

export type ListCellBaseProps = Polymorphic.ExtendableProps<
  Omit<CellBaseProps, 'children'>,
  SharedListCellBaseProps
>;
export type ListCellProps<AsComponent extends React.ElementType> = Polymorphic.Props<
  AsComponent,
  ListCellBaseProps
>;

type ListCellComponent = (<AsComponent extends React.ElementType = ListCellDefaultElement>(
  props: ListCellProps<AsComponent>,
) => Polymorphic.ReactReturn) &
  Polymorphic.ReactNamed;

export const ListCell: ListCellComponent = memo(
  forwardRef<React.ReactElement<ListCellBaseProps>, ListCellBaseProps>(
    <AsComponent extends React.ElementType>(
      {
        as,
        accessory,
        action,
        compact,
        title,
        description,
        detail,
        disabled,
        disableSelectionAccessory,
        media,
        multiline,
        selected,
        subdetail,
        variant,
        intermediary,
        priority,
        innerSpacing,
        outerSpacing,
        detailWidth,
        ...props
      }: ListCellProps<AsComponent>,
      ref?: Polymorphic.Ref<AsComponent>,
    ) => {
      const Component = (as ?? listCellDefaultElement) satisfies React.ElementType;

      const minHeight = compact ? compactListHeight : listHeight;
      const accessoryType = selected && !disableSelectionAccessory ? 'selected' : accessory;

      const end = useMemo(() => {
        if (action) {
          return <Box justifyContent="flex-end">{action}</Box>;
        }
        if (detail || subdetail) {
          return <CellDetail detail={detail} subdetail={subdetail} variant={variant} />;
        }
        return undefined;
      }, [action, detail, subdetail, variant]);

      return (
        <Cell
          ref={ref}
          accessory={accessoryType && <CellAccessory type={accessoryType} />}
          as={Component}
          detail={end}
          detailWidth={detailWidth}
          disabled={disabled}
          innerSpacing={innerSpacing}
          intermediary={intermediary}
          media={media}
          minHeight={minHeight}
          outerSpacing={outerSpacing}
          priority={priority}
          selected={selected}
          {...props}
        >
          <VStack>
            {!!title && (
              <Text as="div" font="headline" overflow="truncate">
                {title}
              </Text>
            )}

            {!!description && (
              <Text
                as="div"
                className={multiline ? overflowStyle : undefined}
                color="fgMuted"
                font="body"
                overflow={multiline ? undefined : 'truncate'}
              >
                {description}
              </Text>
            )}
          </VStack>
        </Cell>
      );
    },
  ),
);
