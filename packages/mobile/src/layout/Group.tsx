import React, { forwardRef, memo, useMemo } from 'react';
import { View } from 'react-native';
import { GroupBaseProps } from '@cbhq/cds-common/types';
import { flattenAndJoinNodes } from '@cbhq/cds-common/utils/flattenAndJoinNodes';

import { Box, BoxProps } from './Box';
import { Spacer } from './Spacer';

export type RenderGroupItem = GroupBaseProps<BoxProps>['renderItem'];
export type GroupProps = GroupBaseProps<BoxProps>;

export const Group = memo(
  forwardRef<View, GroupProps>(
    (
      {
        children,
        direction: directionProp = 'vertical',
        divider,
        gap,
        horizontal,
        renderItem,
        ...boxProps
      },
      forwardedRef,
    ) => {
      // TODO: Remove once `horizontal` is sunset in Q2.
      const direction = horizontal ? 'horizontal' : directionProp;
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
    },
  ),
);

Group.displayName = 'Group';
