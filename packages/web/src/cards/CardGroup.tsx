import React, { forwardRef, memo } from 'react';

import { Divider } from '../layout/Divider';
import { Group, GroupProps, RenderGroupItem } from '../layout/Group';

export type CardGroupProps = Omit<GroupProps, 'horizontal'>;
export type CardGroupRenderItem = RenderGroupItem;

export const CardGroup = memo(
  forwardRef<HTMLElement, CardGroupProps>(function CardGroup(
    { accessibilityLabel, children, direction = 'vertical', divider = Divider, ...props },
    ref,
  ) {
    return (
      <Group
        ref={ref}
        accessibilityLabel={accessibilityLabel}
        direction={direction}
        divider={divider}
        {...props}
      >
        {children}
      </Group>
    );
  }),
);

CardGroup.displayName = 'CardGroup';
