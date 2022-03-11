import React, { forwardRef, memo, ReactNode, useMemo } from 'react';
import { ForwardedRef, SharedProps } from '@cbhq/cds-common/types';

import { NavigationIcon, NavigationIconProps } from '../icons';
import { HStack } from '../layout';
import { Tooltip } from '../overlays/Tooltip/Tooltip';
import { TooltipProps } from '../overlays/Tooltip/TooltipProps';
import { Pressable } from '../system';
import { TextHeadline } from '../typography';

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
  /** Label or content to display when Sidebar is collapsed and side bar more menu is hovered */
  tooltipContent?: ReactNode;
} & SharedProps &
  Pick<TooltipProps, 'disablePortal'>;

export const SidebarItem = memo(
  forwardRef(
    (
      {
        icon,
        title,
        onPress,
        collapsed,
        active,
        testID,
        tooltipContent,
        disablePortal,
      }: SidebarItemProps,
      ref: ForwardedRef<HTMLButtonElement>,
    ) => {
      const color = active ? 'primary' : 'foreground';
      const { collapsed: computedCollapsed } = useSidebarContext();
      const isCollapsed = collapsed ?? computedCollapsed;

      const content = useMemo(
        () => (
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
        ),
        [active, color, icon, testID, ref, title, isCollapsed, onPress],
      );

      return tooltipContent && isCollapsed ? (
        <Tooltip placement="right" disablePortal={disablePortal} content={tooltipContent}>
          {content}
        </Tooltip>
      ) : (
        content
      );
    },
  ),
);

SidebarItem.displayName = 'SidebarItem';
