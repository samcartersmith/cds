import React, { forwardRef, memo, useMemo } from 'react';
import type { GroupBaseProps } from '@cbhq/cds-common2/types';
import { flattenAndJoinNodes } from '@cbhq/cds-common2/utils/flattenAndJoinNodes';

import { Box, type BoxDefaultElement, type BoxProps } from './Box';
import { Spacer } from './Spacer';

export type RenderGroupItem = GroupBaseProps<BoxProps<BoxDefaultElement>>['renderItem'];
export type GroupProps = GroupBaseProps<BoxProps<BoxDefaultElement>>;

const ItemWrapper: React.FC<React.PropsWithChildren<BoxProps<BoxDefaultElement>>> = memo(
  ({ display = 'contents', ...props }) => <Box display={display} {...props} />,
);

const fallbackRenderItem: RenderGroupItem = ({
  item,
  index,
}: {
  item: React.ReactChild;
  index: number;
}) => {
  return <ItemWrapper key={index}>{item}</ItemWrapper>;
};

export const Group = memo(
  forwardRef<HTMLDivElement, GroupProps>(
    (
      {
        children,
        direction = 'vertical',
        divider,
        gap,
        renderItem = fallbackRenderItem,
        ...boxProps
      },
      ref,
    ) => {
      // TODO: Remove once `horizontal` is sunset in Q2.
      const contents = useMemo(
        () =>
          flattenAndJoinNodes({
            children,
            gap,
            divider,
            renderItem,
            direction,
            Spacer,
            ItemWrapper,
          }),
        [children, direction, divider, gap, renderItem],
      );

      return (
        <Box
          ref={ref}
          alignItems="stretch"
          flexDirection={direction === 'horizontal' ? 'row' : 'column'}
          flexWrap="nowrap"
          role="group"
          {...boxProps}
        >
          {contents}
        </Box>
      );
    },
  ),
);

Group.displayName = 'Group';
