import React, { memo } from 'react';
import { gutter } from '@cbhq/cds-common/tokens/sizing';

import { CardGroup as FrontierCardGroup } from '../alpha/CardGroup';
import { Group, GroupProps, RenderGroupItem } from '../layout/Group';
import { useFeatureFlag } from '../system/useFeatureFlag';

export type CardGroupProps = GroupProps;
export type CardGroupRenderItem = RenderGroupItem;

export const PreFrontierCardGroup = memo(function PreFrontierCardGroup({
  accessibilityLabel,
  children,
  direction = 'vertical',
  horizontal = false,
  ...props
}: CardGroupProps) {
  const isHorizontal = horizontal || direction === 'horizontal';
  return (
    <Group
      accessibilityHint={accessibilityLabel}
      accessibilityLabel={accessibilityLabel}
      direction={isHorizontal ? 'horizontal' : 'vertical'}
      gap={gutter}
      {...props}
    >
      {children}
    </Group>
  );
});

export const CardGroup = memo(function CardGroup(props: CardGroupProps) {
  const isFrontier = useFeatureFlag('frontierCard');
  return isFrontier ? <FrontierCardGroup {...props} /> : <PreFrontierCardGroup {...props} />;
});
