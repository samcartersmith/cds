import React, { forwardRef, memo, useMemo } from 'react';
import { GroupBaseProps } from '@cbhq/cds-common/types';
import { flattenAndJoinNodes } from '@cbhq/cds-common/utils/flattenAndJoinNodes';

import { Box, BoxProps } from './Box';
import { Spacer } from './Spacer';

export type RenderGroupItem = GroupBaseProps<BoxProps>['renderItem'];
export type GroupProps = GroupBaseProps<BoxProps>;

const ItemWrapper: React.FC<React.PropsWithChildren<BoxProps>> = memo(
  ({ dangerouslySetClassName, ...props }) => <Box display="contents" {...props} />,
);

const fallbackRenderItem: RenderGroupItem = ({ item }: { item: React.ReactChild }) => {
  return <ItemWrapper>{item}</ItemWrapper>;
};

export const Group = memo(
  forwardRef<HTMLElement, GroupProps>(
    (
      {
        children,
        direction = 'vertical',
        divider,
        gap,
        renderItem = fallbackRenderItem,
        ...boxProps
      },
      forwardedRef,
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
          ref={forwardedRef}
          alignItems="stretch"
          flexWrap="nowrap"
          role="group"
          flexDirection={direction === 'horizontal' ? 'row' : 'column'}
          {...boxProps}
        >
          {contents}
        </Box>
      );
    },
  ),
);

Group.displayName = 'Group';
