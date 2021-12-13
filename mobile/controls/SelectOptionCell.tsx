import React, { memo } from 'react';
import { SelectOptionCellBaseProps } from '@cbhq/cds-common/types';
import {
  listHeight,
  compactListHeight,
  selectCellSpacingConfig,
} from '@cbhq/cds-common/tokens/cell';
import { useScaleConditional } from '@cbhq/cds-common/scale/useScaleConditional';
import { LinkableProps } from '../system';
import { Cell } from '../cells/Cell';
import { VStack } from '../layout/VStack';
import { TextHeadline, TextBody } from '../typography';

export type SelectOptionCellProps = SelectOptionCellBaseProps & LinkableProps;

export const SelectOptionCell = memo(
  ({ title, description, multiline, compact, ...props }: SelectOptionCellProps) => {
    const minHeight = useScaleConditional(compact ? compactListHeight : listHeight);
    return (
      <Cell {...selectCellSpacingConfig} borderRadius="none" minHeight={minHeight} {...props}>
        <VStack justifyContent="center">
          {!!title && (
            <TextHeadline numberOfLines={description ? 1 : 2} ellipsize="tail">
              {title}
            </TextHeadline>
          )}

          {!!description && (
            <TextBody
              color="foregroundMuted"
              // eslint-disable-next-line no-nested-ternary
              numberOfLines={multiline ? undefined : title ? 1 : 2}
              ellipsize={multiline ? undefined : 'tail'}
            >
              {description}
            </TextBody>
          )}
        </VStack>
      </Cell>
    );
  },
);
