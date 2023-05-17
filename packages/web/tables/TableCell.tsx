import React, { memo, useMemo } from 'react';
import { isDevelopment } from '@cbhq/cds-utils';

import { Cell, truncateClassName } from '../cells/Cell';
import { HStack, VStack } from '../layout';
import { TextBody, TextHeadline, TextLabel2 } from '../typography';
import { cx } from '../utils/linaria';

import {
  useTableCellSpacing,
  useTableCellTag,
  useTableContext,
  useTableSectionTag,
} from './hooks/useTable';
import {
  tableCell,
  tableFooterCell,
  tableHeaderCell,
  tableOverflowWidth,
} from './styles/tableCellStyles';
import { TableCellProps } from './types/tableCellTypes';

export type { TableCellProps } from './types/tableCellTypes';
export const TableCell = memo(
  ({
    alignItems,
    children,
    colSpan = 1,
    color = 'currentColor',
    direction = 'vertical',
    end,
    justifyContent,
    onPress,
    start,
    testID,
    overflow,
    // Only available when Children is null
    title,
    titleColor,
    subtitle,
    subtitleColor = 'foregroundMuted',
    dangerouslySetHtmlWidth,
    width,
    innerSpacing,
    outerSpacing,
    responsiveConfig,
    as,
    dangerouslySetClassName,
    ...props
  }: TableCellProps) => {
    // THROW WANRING IN DEVELOPMENT
    if (isDevelopment()) {
      if (children && (title || subtitle)) {
        throw new Error('TableCell: Cannot use `title` or `subtitle` with `children`.');
      }
    }

    /**
     * ===================================================
     * SIMPLE PROP DRIVEN VARIABLES
     * These variables get their default value from
     * component props, which are memoized
     * ===================================================
     */
    const stackClassName = overflow ? truncateClassName : undefined;
    const defaultJustifyContent = direction === 'vertical' ? 'flex-start' : 'space-between';
    const defaultAlignItems = direction === 'vertical' ? 'flex-start' : 'center';
    const shouldHandleOverflow = !!overflow && !width;

    /**
     * ===================================================
     * CONDITIONALS VARIABLES
     * These variables get their default value from a hook
     * so need to be memoized and computed here
     * ===================================================
     */
    // Depending on compact value
    const { compact } = useTableContext();
    const textSpacingTop = useMemo(() => (!compact && title ? 0.5 : 0), [compact, title]);
    const cellGap = useMemo(() => (compact ? 0.5 : 1), [compact]);

    // Depends on tableSectionType value
    const tableSectionType = useTableSectionTag();
    const isInBody = useMemo(() => tableSectionType === 'tbody', [tableSectionType]);
    const defaultTitleColor = useMemo(
      () => (isInBody ? 'foreground' : 'foregroundMuted'),
      [isInBody],
    );
    const smartTitleColor = useMemo(
      () => titleColor ?? color ?? defaultTitleColor,
      [color, defaultTitleColor, titleColor],
    );

    // Spacing defined on the TableCell will override cellSpacing defined on the Table
    const { outer, inner } = useTableCellSpacing({ outer: outerSpacing, inner: innerSpacing });

    // Depends on prop infered variables
    const smartAlignItems = useMemo(
      () => alignItems ?? defaultAlignItems,
      [alignItems, defaultAlignItems],
    );
    const smartJustifyContent = useMemo(
      () => justifyContent ?? defaultJustifyContent,
      [defaultJustifyContent, justifyContent],
    );

    /**
     * ===================================================
     * CONDITIONALS COMPONENTS
     * These variables get their default value from a hook
     * so need to be memoized and computed here
     * ===================================================
     */
    const TableCellComponent = useTableCellTag(as);
    const cellScope = useMemo(() => {
      if (TableCellComponent !== 'th') return undefined;

      return tableSectionType === 'thead' ? 'row' : 'col';
    }, [TableCellComponent, tableSectionType]);
    const Stack = useMemo(() => (direction === 'vertical' ? VStack : HStack), [direction]);
    const TextComponent = useMemo(
      () => (tableSectionType === 'thead' ? TextHeadline : TextBody),
      [tableSectionType],
    );

    /**
     * ===================================================
     * STYLES
     * ===================================================
     */
    const inlineStyles = useMemo(() => ({ width, maxWidth: width }), [width]);
    const tableCellClass = cx(
      tableCell,
      tableSectionType === 'thead' && tableHeaderCell,
      tableSectionType === 'tfoot' && tableFooterCell,
      shouldHandleOverflow && tableOverflowWidth,
    );

    return (
      <TableCellComponent
        data-testid={testID}
        className={cx(tableCellClass, dangerouslySetClassName)}
        colSpan={colSpan}
        width={dangerouslySetHtmlWidth}
        style={inlineStyles}
        scope={cellScope}
        {...props}
      >
        <Cell
          onPress={onPress}
          alignItems={alignItems}
          media={start}
          accessory={end}
          shouldOverflow={!overflow}
          outerSpacing={outer}
          innerSpacing={inner}
          responsiveConfig={responsiveConfig}
          gap={cellGap}
        >
          {children ? (
            <TextComponent as="div" noWrap={!!overflow} color={color} overflow={overflow}>
              <Stack
                flexGrow={1}
                flexShrink={1}
                gap={0.5}
                justifyContent={smartJustifyContent}
                alignItems={smartAlignItems}
              >
                {children}
              </Stack>
            </TextComponent>
          ) : (
            <Stack
              flexGrow={1}
              flexShrink={1}
              dangerouslySetClassName={stackClassName}
              justifyContent={smartJustifyContent}
              alignItems={smartAlignItems}
            >
              <TextComponent
                noWrap={!!overflow}
                as="div"
                color={smartTitleColor}
                overflow={overflow}
              >
                {title}
              </TextComponent>
              {subtitle ? (
                <TextLabel2
                  color={subtitleColor}
                  as="div"
                  spacingTop={textSpacingTop}
                  overflow={overflow}
                >
                  {subtitle}
                </TextLabel2>
              ) : null}
            </Stack>
          )}
        </Cell>
      </TableCellComponent>
    );
  },
);

TableCell.displayName = 'TableCell';
