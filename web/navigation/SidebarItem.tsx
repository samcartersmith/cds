import React, { memo } from 'react';
import { HStack } from '../layout';
import { TextHeadline } from '../typography';
import { Pressable } from '../system';
import { NavigationIcon, NavigationIconProps } from '../icons';

export type SidebarItemProps = {
  /**
   * The Navigation Icon this item represents
   * @default undefined
   */
  icon: NavigationIconProps['name'];
  /**
   * The title of the page this item represents
   * @default undefined
   */
  title: string;
  /**
   * Handle the press events, ie () => navigate('/trade')
   * @default false
   */
  onPress: () => void;
  /**
   * Use collapsed to show only the logo
   * @default false
   */
  collapsed?: boolean;
  /**
   * Use the active prop to identify the current page
   * @default false
   */
  active?: boolean;
};

export const SidebarItem = memo(({ icon, title, onPress, collapsed, active }: SidebarItemProps) => {
  const color = active ? 'primary' : 'foreground';

  return (
    <Pressable
      backgroundColor="primaryWash"
      borderRadius="round"
      transparentWhileInactive={!active}
      as="button"
      onPress={onPress}
      width="auto"
    >
      <HStack gap={2} spacing={2} alignItems="center">
        <NavigationIcon name={icon} active={active} />
        {!collapsed && (
          <TextHeadline as="h2" color={color}>
            {title}
          </TextHeadline>
        )}
      </HStack>
    </Pressable>
  );
});

SidebarItem.displayName = 'SidebarItem';
