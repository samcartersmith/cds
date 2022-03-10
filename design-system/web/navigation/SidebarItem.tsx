import React, { memo, forwardRef } from 'react';
import { ForwardedRef, SharedProps } from '@cbhq/cds-common/types';
import { HStack } from '../layout';
import { TextHeadline } from '../typography';
import { Pressable } from '../system';
import { NavigationIcon, NavigationIconProps } from '../icons';
import { useSidebarContext } from './SidebarContext';

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
   */
  onPress?: () => void;
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
} & SharedProps;

export const SidebarItem = memo(
  forwardRef(
    (
      { icon, title, onPress, collapsed, active, testID }: SidebarItemProps,
      ref: ForwardedRef<HTMLButtonElement>,
    ) => {
      const color = active ? 'primary' : 'foreground';
      const { collapsed: computedCollapsed } = useSidebarContext();
      const isCollapsed = collapsed ?? computedCollapsed;

      return (
        <Pressable
          backgroundColor="primaryWash"
          borderRadius="round"
          transparentWhileInactive={!active}
          as="button"
          onPress={onPress}
          width="100%"
          ref={ref}
          testID={testID}
        >
          <HStack gap={2} spacing={2} alignItems="center">
            <NavigationIcon name={icon} active={active} />
            {!isCollapsed && (
              <TextHeadline as="h2" color={color}>
                {title}
              </TextHeadline>
            )}
          </HStack>
        </Pressable>
      );
    },
  ),
);

SidebarItem.displayName = 'SidebarItem';
