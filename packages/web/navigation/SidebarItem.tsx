import React, { forwardRef, memo, ReactNode, useMemo } from 'react';
import { ForwardedRef, SharedAccessibilityProps, SharedProps } from '@cbhq/cds-common/types';

import { NavigationIcon, NavigationIconProps } from '../icons';
import { HStack, VStack } from '../layout';
import { Tooltip } from '../overlays';
import { TooltipProps } from '../overlays/Tooltip/TooltipProps';
import { Pressable, PressableInternalProps } from '../system';
import { LinkProps, TextHeadline, TextLabel1 } from '../typography';

import { useSidebarContext } from './SidebarContext';

type CustomSidebarItemProps = {
  isCollapsed?: boolean;
  color: 'primary' | 'foreground';
  title: string;
  active?: boolean;
  icon: NavigationIconProps['name'];
};

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
  Component?: (props: CustomSidebarItemProps) => React.ReactElement;
} & SharedProps &
  SharedAccessibilityProps &
  Pick<TooltipProps, 'disablePortal'> &
  Pick<React.AllHTMLAttributes<Element>, 'target'> &
  Pick<LinkProps, 'openInNewWindow'> &
  Pick<PressableInternalProps, 'borderRadius'>;

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
        Component,
        borderRadius,
        ...rest
      }: SidebarItemProps,
      ref: ForwardedRef<HTMLButtonElement>,
    ) => {
      const color = active ? 'primary' : 'foreground';
      const { collapsed: computedCollapsed, variant } = useSidebarContext();
      const isCollapsed = collapsed ?? computedCollapsed;

      const defaultComponent = useMemo(
        () =>
          variant === 'default' ? (
            <HStack
              alignItems="center"
              gap={2}
              justifyContent="flex-start"
              spacing={2}
              testID="sidebar-item-primary"
            >
              <NavigationIcon active={active} name={icon} />
              {!isCollapsed && (
                <TextHeadline as="span" color={color}>
                  {title}
                </TextHeadline>
              )}
            </HStack>
          ) : (
            <VStack
              alignItems="center"
              gap={0.5}
              spacingHorizontal={1}
              spacingVertical={1.5}
              testID="sidebar-item-condensed"
            >
              <NavigationIcon active={active} name={icon} size="l" />
              <TextLabel1 align="center" as="span" color={color} numberOfLines={1} overflow="break">
                {title}
              </TextLabel1>
            </VStack>
          ),
        [active, icon, title, color, variant, isCollapsed],
      );

      const content = useMemo(
        () => (
          <Pressable
            ref={ref}
            accessibilityLabel={isCollapsed ? accessibilityLabel : undefined}
            aria-current={active ? 'page' : undefined}
            background="primaryWash"
            borderRadius={borderRadius ?? (variant === 'default' ? 'roundedFull' : 'roundedLarge')}
            borderWidth={variant === 'condensed' ? 'none' : undefined}
            onPress={onPress}
            testID={testID}
            to={to}
            transparentWhileInactive={!active}
            width="100%"
            {...rest}
          >
            {Component ? (
              <Component
                active={active}
                color={color}
                icon={icon}
                isCollapsed={isCollapsed}
                title={title}
              />
            ) : (
              defaultComponent
            )}
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
          Component,
          variant,
          defaultComponent,
          borderRadius,
        ],
      );

      return tooltipContent && isCollapsed ? (
        <Tooltip content={tooltipContent} disablePortal={disablePortal} placement="right">
          {content}
        </Tooltip>
      ) : (
        content
      );
    },
  ),
);

SidebarItem.displayName = 'SidebarItem';
