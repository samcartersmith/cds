import React, { memo } from 'react';
import { ContentCellBaseProps } from '@cbhq/cds-common2';
import { isProduction } from '@cbhq/cds-utils';

import { Box, HStack, VStack } from '../layout';
import { Text } from '../typography/Text';

import { Cell, CellSharedProps } from './Cell';
import { CellAccessory } from './CellAccessory';

export type ContentCellProps = ContentCellBaseProps & CellSharedProps;

function generateAccessibilityLabels(
  userLabel?: string,
  title?: React.ReactNode,
  subtitle?: React.ReactNode,
) {
  let computedLabel = userLabel ?? '';
  if (computedLabel === '') {
    // title has higher priority
    if (typeof title === 'string') {
      computedLabel = title;
    } else if (typeof subtitle === 'string') {
      computedLabel = subtitle;
    }
  }

  return computedLabel;
}

export const ContentCell = memo(function ContentCell({
  accessory,
  title,
  description,
  disabled,
  media,
  meta,
  selected,
  subtitle,
  accessibilityLabel,
  accessibilityHint,
  compact,
  detailWidth,
  priority,
  innerSpacing,
  outerSpacing,
  alignItems = 'flex-start',
  ...props
}: ContentCellProps) {
  if (!isProduction()) {
    if (meta && !title && !subtitle) {
      // eslint-disable-next-line no-console
      console.error('ContentCell: Cannot use `meta` without a `title` or `subtitle`.');
    }
  }

  const hasTitles = Boolean(title || subtitle);
  const accessoryType = selected ? 'selected' : accessory;

  const computedAccessibilityLabel = generateAccessibilityLabels(
    accessibilityLabel,
    title,
    subtitle,
  );
  const computedAccessibilityHint = generateAccessibilityLabels(accessibilityHint, title, subtitle);

  return (
    <Cell
      accessibilityHint={computedAccessibilityHint}
      accessibilityLabel={computedAccessibilityLabel}
      accessory={
        accessoryType ? <CellAccessory paddingTop={0.5} type={accessoryType} /> : undefined
      }
      alignItems={alignItems}
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
      <VStack>
        {hasTitles && (
          <HStack alignItems="flex-start" justifyContent="space-between">
            <Box flexShrink={1}>
              {!!title && <Text font="headline">{title}</Text>}

              {!!subtitle && (
                <Text
                  font="label2"
                  paddingBottom={description ? 0.5 : 0}
                  paddingTop={title ? 0.5 : 0}
                >
                  {subtitle}
                </Text>
              )}
            </Box>

            {!!meta && (
              <Box justifyContent="flex-end" paddingStart={1} paddingTop={0.5}>
                <Text color="fgMuted" font="label2">
                  {meta}
                </Text>
              </Box>
            )}
          </HStack>
        )}

        {!!description && <Text color="fgMuted">{description}</Text>}
      </VStack>
    </Cell>
  );
});
