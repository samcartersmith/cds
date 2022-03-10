import React, { memo, forwardRef } from 'react';
import { View } from 'react-native';
import { gutter } from '@cbhq/cds-common/tokens/sizing';

import { Divider } from '../layout/Divider';
import { Group, GroupProps, RenderGroupItem } from '../layout/Group';

/** TODO: Remove horizontal prop once this moves out of alpha */
export type CardGroupProps = Omit<GroupProps, 'horizontal'>;
export type CardGroupRenderItem = RenderGroupItem;

export const CardGroup = memo(
  forwardRef<View, CardGroupProps>(function CardGroup(
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
