import React, { memo, useCallback } from 'react';

import { NavigationIconName } from '@cbhq/cds-common';
import { BadgeValue } from '@cbhq/cds-common/types/BadgeBaseProps';
import { emptyObject } from '@cbhq/cds-utils';
import { cx } from '../../utils/linaria';
import { useSpacingStyles } from '../../hooks/useSpacingStyles';
import { Badge } from '../../icons/Badge';
import { NavigationIcon } from '../../icons/NavigationIcon';
import { Box, HStack } from '../../layout';
import { Tooltip } from '../../overlays/Tooltip';
import { getFlexStyles } from '../../styles/flex';
import { Pressable, PressableProps } from '../../system/Pressable';
import { TextHeadline } from '../../typography/TextHeadline';
import { useNavigation } from './context';
import { useMobileMenuChildrenContext } from './MobileMenuChildrenContext';
import { hideForCondensed, showForCondensed, sidebarItemStyles } from './navigationStyles';
import { iconContainerSize } from './navigationTokens';

export type NavigationListItemLinkProps = {
  onPress?: React.MouseEventHandler;
  to: string | { pathname?: string }; // Required for router Link's
} & React.AriaAttributes &
  React.RefAttributes<HTMLAnchorElement> &
  Pick<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    'children' | 'className' | 'onBlur' | 'onFocus' | 'onMouseEnter' | 'onMouseLeave' | 'tabIndex'
  >;

export type NavigationListItemProps = {
  active?: boolean;
  icon?: NavigationIconName;
  label: string;
  badge?: BadgeValue;
  as?: React.ComponentType<NavigationListItemLinkProps>;
  to?: string;
} & PressableProps;

export const NavigationListItem = memo(
  ({ as, active, icon, label, badge, to = '/', onPress }: NavigationListItemProps) => {
    const { isMobileMenuVisible, sidebarLayout } = useNavigation();
    const isChildOfMobileMenu = useMobileMenuChildrenContext();
    const isExpanded = sidebarLayout === 'expanded';

    const getResponsiveStyles = useCallback(
      (className: string) => {
        if (isMobileMenuVisible && isChildOfMobileMenu) {
          return undefined;
        }
        return className;
      },
      [isMobileMenuVisible, isChildOfMobileMenu],
    );

    const color = active ? 'primary' : 'foreground';
    const flexStyles = getFlexStyles({
      flexDirection: 'row',
      alignItems: 'center',
    });
    const spacingStyles = useSpacingStyles({
      spacing: 1,
    });

    const sidebarContent = (
      <>
        {icon && (
          <Box
            width={iconContainerSize}
            height={iconContainerSize}
            alignItems="center"
            justifyContent="center"
            flexShrink={0}
          >
            <NavigationIcon
              name={icon}
              size="s"
              active={active}
              badge={
                <Badge
                  dangerouslySetClassName={getResponsiveStyles(showForCondensed)}
                  value={badge}
                  variant="dot"
                />
              }
            />
          </Box>
        )}
        <HStack
          dangerouslySetClassName={getResponsiveStyles(hideForCondensed)}
          flexGrow={1}
          justifyContent="space-between"
          alignItems="center"
        >
          <TextHeadline as="p" color={color} spacingStart={1}>
            {label}
          </TextHeadline>
          {!!badge && <Badge value={badge} />}
        </HStack>
      </>
    );

    return (
      <li>
        <Tooltip content={label} disabled={isMobileMenuVisible || isExpanded} placement="right">
          {(tooltipProps) => {
            const enhancedProps = {
              ...tooltipProps,
              className: cx(flexStyles, spacingStyles, sidebarItemStyles),
              onPress,
              to,
              // https://www.aditus.io/aria/aria-current/
              ...(active ? ({ 'aria-current': 'page' } as const) : emptyObject),
            };

            return (
              <Pressable
                {...enhancedProps}
                as={as ?? 'a'}
                backgroundColor="secondary"
                borderColor="secondary"
                borderRadius="standard"
              >
                {sidebarContent}
              </Pressable>
            );
          }}
        </Tooltip>
      </li>
    );
  },
);

NavigationListItem.displayName = 'NavigationListItem';
