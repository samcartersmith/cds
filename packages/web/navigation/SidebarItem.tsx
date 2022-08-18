import React, { forwardRef, memo, ReactNode, useMemo } from 'react';
import { ForwardedRef, SharedAccessibilityProps, SharedProps } from '@cbhq/cds-common/types';

import { NavigationIcon, NavigationIconProps } from '../icons';
import { HStack } from '../layout';
import { Tooltip } from '../overlays/Tooltip/Tooltip';
import { TooltipProps } from '../overlays/Tooltip/TooltipProps';
import { Pressable } from '../system';
import { LinkProps, TextHeadline } from '../typography';

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
   * Render as custom React Node like React Routers Link component
   */
  as?: 'a' | 'button' | React.ComponentType<React.HTMLAttributes<HTMLElement>>;
  /**
   *  URL that this links to when pressed. When set, the pressabel will render as a link
   */
  to?: string;
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
  SharedAccessibilityProps &
  Pick<TooltipProps, 'disablePortal'> &
  Pick<React.AllHTMLAttributes<Element>, 'target'> &
  Pick<LinkProps, 'openInNewWindow'>;

export const SidebarItem = memo(
  forwardRef(
    (
      {
        icon,
        title,
        onPress,
        to,
        collapsed,
        active,
        testID,
        tooltipContent,
        disablePortal,
        accessibilityLabel = title,
        ...rest
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
            onPress={onPress}
            to={to}
            width="100%"
            ref={ref}
            testID={testID}
            accessibilityLabel={isCollapsed ? accessibilityLabel : undefined}
            {...rest}
          >
            <HStack gap={2} spacing={2} alignItems="center" justifyContent="flex-start">
              <NavigationIcon name={icon} active={active} />
              {!isCollapsed && (
                <TextHeadline as="span" color={color}>
                  {title}
                </TextHeadline>
              )}
            </HStack>
          </Pressable>
        ),
        [
          active,
          onPress,
          to,
          ref,
          testID,
          rest,
          icon,
          accessibilityLabel,
          isCollapsed,
          color,
          title,
        ],
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
