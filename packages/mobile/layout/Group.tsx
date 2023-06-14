import React, { forwardRef, memo, useMemo } from 'react';
import { View } from 'react-native';
import { GroupBaseProps } from '@cbhq/cds-common/types';
import { flattenAndJoinNodes } from '@cbhq/cds-common/utils/flattenAndJoinNodes';

import { Box, BoxProps } from './Box';
import { Spacer } from './Spacer';

export type RenderGroupItem = GroupBaseProps<BoxProps>['renderItem'];
export type GroupProps = GroupBaseProps<BoxProps>;

export const Group = memo(
  forwardRef<View, GroupProps>(function Group(
    { children, direction = 'vertical', divider, gap, renderItem, ...boxProps },
    forwardedRef,
  ) {
    const contents = useMemo(
      () =>
        flattenAndJoinNodes({
          children,
          gap,
          divider,
          renderItem,
          direction,
          Spacer,
          ItemWrapper: Box,
        }),
      [children, direction, divider, gap, renderItem],
    );

    return (
      <Box
        ref={forwardedRef}
        flexWrap="nowrap"
        alignItems="stretch"
        flexDirection={direction === 'horizontal' ? 'row' : 'column'}
        {...boxProps}
      >
        {contents}
      </Box>
    );
  }),
);

Group.displayName = 'Group';
