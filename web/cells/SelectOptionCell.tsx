import React, { ForwardedRef, forwardRef, memo } from 'react';
import { SelectOptionCellBaseProps } from '@cbhq/cds-common/types';
import { selectCellSpacingConfig } from '@cbhq/cds-common/tokens/cell';
import { useScaleConditional } from '@cbhq/cds-common/scale/useScaleConditional';
import { selectOptionCellMinHeight } from '@cbhq/cds-common/tokens/selectInput';
import { LinkableProps } from '../system';
import { Cell, overflowClassName } from './Cell';
import { VStack } from '../layout/VStack';
import { TextHeadline, TextBody } from '../typography';

export type SelectOptionCellProps = {
  /** automatically focus a select option if it's already been selected
   * Note: the value passed will be ignored on Web because SelectInput overrides it with React.cloneElement()
   */
  value: string;
  /** Note: the value passed will be ignored on Web because SelectInput overrides it with React.cloneElement() */
  key?: string;
  /** Note: the value passed will be ignored on Web because SelectInput overrides it with React.cloneElement() */
  ref?: ((ref: HTMLElement) => void) | undefined;
  /** callback fired whenever a key is pressed while SelectOptionCell is focused */
  onKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void;
} & SelectOptionCellBaseProps &
  LinkableProps;

export const SelectOptionCell = memo(
  forwardRef(
    (
      { onKeyDown, title, description, multiline, ...props }: SelectOptionCellProps,
      ref: ForwardedRef<HTMLElement>,
    ) => {
      const minHeight = useScaleConditional(selectOptionCellMinHeight);
      return (
        <Cell
          {...selectCellSpacingConfig}
          ref={ref}
          onKeyDown={onKeyDown}
          borderRadius="none"
          minHeight={minHeight}
          {...props}
        >
          <VStack>
            {!!title && (
              <TextHeadline as="div" overflow="truncate">
                {title}
              </TextHeadline>
            )}

            {!!description && (
              <TextBody
                as="div"
                color="foregroundMuted"
                overflow={multiline ? undefined : 'truncate'}
                dangerouslySetClassName={multiline ? overflowClassName : undefined}
              >
                {description}
              </TextBody>
            )}
          </VStack>
        </Cell>
      );
    },
  ),
);
