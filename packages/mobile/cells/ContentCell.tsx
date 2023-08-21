import React, { memo } from 'react';
import { ContentCellBaseProps } from '@cbhq/cds-common';
import { isProduction } from '@cbhq/cds-utils';

import { Box, HStack, VStack } from '../layout';
import { TextBody, TextHeadline, TextLabel2 } from '../typography';

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
      {...props}
      accessory={
        accessoryType ? <CellAccessory type={accessoryType} spacingTop={0.5} /> : undefined
      }
      alignItems="flex-start"
      media={media}
      disabled={disabled}
      selected={selected}
      accessibilityLabel={computedAccessibilityLabel}
      accessibilityHint={computedAccessibilityHint}
    >
      <VStack>
        {hasTitles && (
          <HStack alignItems="flex-start" justifyContent="space-between">
            <Box flexShrink={1}>
              {!!title && <TextHeadline>{title}</TextHeadline>}

              {!!subtitle && (
                <TextLabel2 spacingTop={title ? 0.5 : 0} spacingBottom={description ? 0.5 : 0}>
                  {subtitle}
                </TextLabel2>
              )}
            </Box>

            {!!meta && (
              <Box justifyContent="flex-end" spacingTop={0.5} spacingStart={1}>
                <TextLabel2 color="foregroundMuted">{meta}</TextLabel2>
              </Box>
            )}
          </HStack>
        )}

        {!!description && <TextBody color="foregroundMuted">{description}</TextBody>}
      </VStack>
    </Cell>
  );
});
