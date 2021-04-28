import React, { memo } from 'react';

import { buttonResets } from '../styles/resetStyles';
import { Pressable, PressableProps } from '../system/Pressable';
import { TextLabel1 } from '../typography/TextLabel1';

export interface TabItemBaseProps {
  label: string;
  value?: string | number;
}

export interface TabItemProps extends TabItemBaseProps, PressableProps {
  active?: boolean;
}

export const TabItem = memo(function TabItem({ label, active, value: _, ...props }: TabItemProps) {
  const colorAlias = active ? 'primaryWash' : 'secondary';

  return (
    <Pressable
      as="button"
      backgroundColor={colorAlias}
      borderColor={colorAlias}
      borderRadius="pill"
      borderWidth="button"
      role="tab"
      type="button"
      className={buttonResets}
      {...props}
    >
      <TextLabel1 spacing={1} as="p" color={active ? 'primary' : 'foreground'}>
        {label}
      </TextLabel1>
    </Pressable>
  );
});
