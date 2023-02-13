import React, { memo } from 'react';
import { css } from 'linaria';

import { Pressable, PressableProps } from '../../system/Pressable';
import { TextLabel1 } from '../../typography/TextLabel1';

const tabStyles = css`
  border-style: none;
  padding: 0;
`;

/** @deprecated */
export type TabItemBaseProps = {
  label: string;
  value?: string | number;
};

/** @deprecated */
export type TabItemProps = {
  active?: boolean;
} & TabItemBaseProps &
  PressableProps;

/** @deprecated */
export const TabItem = memo(function TabItem({ label, active, value: _, ...props }: TabItemProps) {
  const colorAlias = active ? 'primaryWash' : 'secondary';

  return (
    <Pressable
      backgroundColor={colorAlias}
      borderRadius="pill"
      role="tab"
      type="button"
      className={tabStyles}
      noScaleOnPress
      {...props}
    >
      <TextLabel1 spacing={1} as="p" color={active ? 'primary' : 'foreground'}>
        {label}
      </TextLabel1>
    </Pressable>
  );
});
