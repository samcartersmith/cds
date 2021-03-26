import React, { memo, createElement } from 'react';

import { IconName } from '@cbhq/cds-common';
import { mergeProps } from '@cbhq/cds-common/utils/mergeProps';
import { emptyObject } from '@cbhq/cds-utils';
import { cx } from 'linaria';

import { useInteractable, InteractableProps } from '../buttons/useInteractable';
import { useSpacingStyles } from '../hooks/useSpacingStyles';
import { Badge } from '../icons/Badge';
import { Icon } from '../icons/Icon';
import { Box, HStack } from '../layout';
import { Tooltip } from '../overlays/Tooltip';
import { getFlexStyles } from '../styles/flex';
import { TextHeadline } from '../typography/TextHeadline';
import { hideForCondensed, showForCondensed, sidebarItemStyles } from './navigationStyles';
import { iconContainerSize } from './navigationTokens';
import { useSidebarLayout } from './SidebarLayoutProvider';

export interface SidebarItemProps extends InteractableProps<HTMLAnchorElement> {
  active?: boolean;
  icon?: IconName;
  label: string;
  badge?: number | string;
  renderContainer?: (props: React.HTMLAttributes<HTMLAnchorElement>) => JSX.Element;
}

export const SidebarItem = memo(
  ({ renderContainer, active, icon, label, badge, onPress }: SidebarItemProps) => {
    const sidebarLayout = useSidebarLayout();
    const isExpanded = sidebarLayout === 'expanded';
    const color = active ? 'primary' : 'foreground';
    const flexStyles = getFlexStyles({
      flexDirection: 'row',
      alignItems: 'center',
    });
    const spacingStyles = useSpacingStyles({
      spacing: 1,
    });

    const { className, style } = useInteractable({
      backgroundColor: 'secondary',
      borderColor: 'secondary',
      borderRadius: 'standard',
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
                <Badge dangerouslySetClassName={showForCondensed} value={badge} variant="dot" />
              }
            />
          </Box>
        )}
        <HStack
          dangerouslySetClassName={hideForCondensed}
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
                style,
                className: cx(flexStyles, spacingStyles, sidebarItemStyles, className),
                children: sidebarContent,
                onClick: onPress,
                // https://www.aditus.io/aria/aria-current/
                ...(active ? ({ 'aria-current': 'page' } as const) : emptyObject),
              }
            );

            return renderContainer
              ? renderContainer(enhancedProps)
              : createElement('a', enhancedProps);
          }}
        </Tooltip>
      </li>
    );
  }
);

SidebarItem.displayName = 'SidebarItem';
