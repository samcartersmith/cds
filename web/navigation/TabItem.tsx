import React, { memo } from 'react';

import { buttonResets } from '../styles/resetStyles';
import { Pressable, PressableProps } from '../system/Pressable';
import { TextLabel1 } from '../typography/TextLabel1';

export type TabItemBaseProps = {
  label: string;
  value?: string | number;
};

export type TabItemProps = {
  active?: boolean;
} & TabItemBaseProps &
  PressableProps;

export const TabItem = memo(function TabItem({ label, active, value: _, ...props }: TabItemProps) {
  const colorAlias = active ? 'primaryWash' : 'secondary';

  return (
    <Pressable
      backgroundColor={colorAlias}
      borderRadius="pill"
      role="tab"
      type="button"
      className={buttonResets}
      noScaleOnPress
      {...props}
    >
      <TextLabel1 spacing={1} as="p" color={active ? 'primary' : 'foreground'}>
        {label}
      </TextLabel1>
    </Pressable>
  );
});
