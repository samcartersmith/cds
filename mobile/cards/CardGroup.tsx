import React, { memo } from 'react';

import { gutter } from '@cbhq/cds-common/tokens/sizing';

import { Divider } from '../layout/Divider';
import { Group, GroupProps, RenderGroupItem } from '../layout/Group';
import { useFeatureFlag } from '../system/useFeatureFlag';

export type CardGroupProps = GroupProps;
export type CardGroupRenderItem = RenderGroupItem;

export const CardGroup = memo(function CardGroup({
  accessibilityLabel,
  children,
  direction = 'vertical',
  horizontal = false,
  ...props
}: CardGroupProps) {
  const isFrontier = useFeatureFlag('frontierCard');
  const isHorizontal = horizontal || direction === 'horizontal';
  return (
    <Group
      accessibilityHint={accessibilityLabel}
      accessibilityLabel={accessibilityLabel}
      direction={isHorizontal ? 'horizontal' : 'vertical'}
      divider={isFrontier ? Divider : null}
      gap={isFrontier ? 0 : gutter}
      offsetHorizontal={isFrontier && !isHorizontal ? gutter : 0}
      {...props}
    >
      {children}
    </Group>
  );
});
