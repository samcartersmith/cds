import React, { forwardRef, memo, ReactNode, useMemo } from 'react';
import { ForwardedRef, SharedAccessibilityProps, SharedProps } from '@cbhq/cds-common/types';
import { NavigationIcon, NavigationIconProps } from '@cbhq/cds-web/icons';
import { HStack } from '@cbhq/cds-web/layout';
import { useSidebarContext } from '@cbhq/cds-web/navigation/SidebarContext';
import { Pressable } from '@cbhq/cds-web/system';
import { LinkProps, TextHeadline } from '@cbhq/cds-web/typography';

import { Tooltip } from '../tooltip/Tooltip';
import { TooltipProps } from '../tooltip/TooltipProps';

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
  as?:
    | 'a'
    | 'button'
    | React.ComponentType<React.PropsWithChildren<React.HTMLAttributes<HTMLElement>>>;
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
            borderRadius="roundedFull"
            transparentWhileInactive={!active}
            onPress={onPress}
            to={to}
            width="100%"
            ref={ref}
            testID={testID}
            accessibilityLabel={isCollapsed ? accessibilityLabel : undefined}
            aria-current={active ? 'page' : undefined}
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
