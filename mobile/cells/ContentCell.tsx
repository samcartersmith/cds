import React, { memo } from 'react';

import { Box, HStack, VStack } from '../layout';
import { TextHeadline, TextBody, TextLabel2 } from '../typography';
import { Cell, CellCommonProps } from './Cell';
import { CellAccessory, CellAccessoryType } from './CellAccessory';

export interface ContentCellProps extends CellCommonProps {
  /** Accessory to display at the end of the cell. */
  accessory?: CellAccessoryType;
  /** Description of content. Content will wrap accordingly. */
  description?: React.ReactNode;
  /** Meta information to display at the end of the title. */
  meta?: React.ReactNode;
  /** Subtitle of content. Max 1 line, otherwise will truncate. */
  subtitle?: React.ReactNode;
  /** Title of content. Max 1 line, otherwise will truncate. */
  title?: React.ReactNode;
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
  onPress,
  ...props
}: ContentCellProps) {
  if (process.env.NODE_ENV !== 'production' && meta && !title && !subtitle) {
    console.error('ContentCell: Cannot use `meta` without a `title` or `subtitle`.');
  }

  const accessoryType = selected ? 'selected' : accessory;

  return (
    <Cell
      {...props}
      accessory={accessoryType && <CellAccessory type={accessoryType} spacingTop={0.5} />}
      alignItems="flex-start"
      media={media}
      disabled={disabled}
      maxContentWidth="100%"
      selected={selected}
      onPress={onPress}
    >
      <VStack>
        {(title || subtitle) && (
          <HStack alignItems="flex-start" justifyContent="space-between">
            <Box maxWidth={meta ? '80%' : undefined}>
              {title && <TextHeadline>{title}</TextHeadline>}

              {subtitle && (
                <TextLabel2 spacingTop={title ? 0.5 : 0} spacingBottom={description ? 0.5 : 0}>
                  {subtitle}
                </TextLabel2>
              )}
            </Box>

            {meta && (
              <Box justifyContent="flex-end" flexGrow={0} flexShrink={1} spacingTop={0.5}>
                <TextLabel2 color="foregroundMuted">{meta}</TextLabel2>
              </Box>
            )}
          </HStack>
        )}

        {description && (
          <TextBody color="foregroundMuted" spacingTop={0.5}>
            {description}
          </TextBody>
        )}
      </VStack>
    </Cell>
  );
});
