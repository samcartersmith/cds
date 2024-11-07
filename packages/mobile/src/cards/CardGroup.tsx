import React, { forwardRef, memo } from 'react';
import { View } from 'react-native';
import { gutter } from '@cbhq/cds-common/tokens/sizing';

import { Divider } from '../layout/Divider';
import { Group, GroupProps, RenderGroupItem } from '../layout/Group';

export type CardGroupRenderItem = RenderGroupItem;

export const CardGroup = memo(
  forwardRef<View, GroupProps>(function CardGroup(
    {
      accessibilityLabel,
      accessibilityHint = accessibilityLabel,
      children,
      direction = 'vertical',
      divider = Divider,
      offsetHorizontal = direction === 'horizontal' ? 0 : gutter,
      ...props
    },
    ref,
  ) {
    return (
      <Group
        ref={ref}
        accessibilityHint={accessibilityHint}
        accessibilityLabel={accessibilityLabel}
        direction={direction}
        divider={divider}
        offsetHorizontal={offsetHorizontal}
        {...props}
      >
        {children}
      </Group>
    );
  }),
);

CardGroup.displayName = 'CardGroup';
