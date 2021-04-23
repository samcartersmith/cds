import React, { memo, useCallback } from 'react';

import { BadgeValue, IconName } from '@cbhq/cds-common';
import { mergeProps } from '@cbhq/cds-common/utils/mergeProps';
import { emptyObject } from '@cbhq/cds-utils';
import { cx } from 'linaria';

import { useSpacingStyles } from '../hooks/useSpacingStyles';
import { Badge } from '../icons/Badge';
import { Icon } from '../icons/Icon';
import { Box, HStack } from '../layout';
import { Tooltip } from '../overlays/Tooltip';
import { getFlexStyles } from '../styles/flex';
import { Pressable, PressableProps } from '../system/Pressable';
import { TextHeadline } from '../typography/TextHeadline';
import { useNavigation } from './context';
import { useMobileMenuChildrenContext } from './MobileMenu';
import { hideForCondensed, showForCondensed, sidebarItemStyles } from './navigationStyles';
import { iconContainerSize } from './navigationTokens';

export interface NavigationListItemProps extends PressableProps {
  active?: boolean;
  icon?: IconName;
  label: string;
  badge?: BadgeValue;
  renderContainer?: (props: React.HTMLAttributes<HTMLAnchorElement>) => JSX.Element;
}

export const NavigationListItem = memo(
  ({ renderContainer, active, icon, label, badge, onPress }: NavigationListItemProps) => {
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
      [isMobileMenuVisible, isChildOfMobileMenu]
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
            <Icon
              name={icon}
              size="s"
              color={color}
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
          {badge && <Badge value={badge} />}
        </HStack>
      </>
    );

    return (
      <li>
        <Tooltip content={label} disabled={isExpanded} placement="right">
          {tooltipProps => {
            const enhancedProps: React.HTMLAttributes<HTMLAnchorElement> = mergeProps(
              tooltipProps,
              {
                className: cx(flexStyles, spacingStyles, sidebarItemStyles),
                onPress,
                // https://www.aditus.io/aria/aria-current/
                ...(active ? ({ 'aria-current': 'page' } as const) : emptyObject),
              }
            );

            return (
              <Pressable
                {...enhancedProps}
                as={renderContainer || 'a'}
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
  }
);

NavigationListItem.displayName = 'NavigationListItem';
