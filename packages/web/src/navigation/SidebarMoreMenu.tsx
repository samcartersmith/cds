import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import { SharedProps, SpacingScale } from '@cbhq/cds-common';
import { sidebarMenuMaxWidth, sidebarMenuMinWidth } from '@cbhq/cds-common/tokens/menu';
import { sidebarGutter, sidebarHorizontalSpacing } from '@cbhq/cds-common/tokens/sidebar';

import { Dropdown, DropdownProps } from '../dropdown';
import { useA11yControlledVisibility } from '../hooks/useA11yControlledVisibility';
import { PopoverContentPositionConfig } from '../overlays/popover/PopoverProps';
import { Tooltip } from '../overlays/Tooltip/Tooltip';

import { useSidebarContext } from './SidebarContext';
import { SidebarItem, SidebarItemProps } from './SidebarItem';

export type SidebarMoreMenuProps = {
  children: React.ReactNode;
  /**
   * Title of the menu trigger. Use this prop to localize the trigger title.
   * @default More
   */
  triggerTitle?: string;
} & Pick<DropdownProps, 'value' | 'onBlur' | 'disablePortal' | 'onChange'> &
  Pick<SidebarItemProps, 'active' | 'tooltipContent' | 'onPress' | 'Component' | 'borderRadius'> &
  SharedProps;

export const SidebarMoreMenu = memo(function SidebarMoreMenu({
  children,
  active,
  onPress,
  value,
  tooltipContent,
  disablePortal,
  triggerTitle = 'More',
  Component,
  borderRadius,
  ...props
}: SidebarMoreMenuProps) {
  const [visible, setVisible] = useState(false);
  const { collapsed } = useSidebarContext();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const sidebarGap = (sidebarHorizontalSpacing + sidebarGutter) as SpacingScale;
  const defaultContentPosition: PopoverContentPositionConfig = useMemo(
    () => ({
      gap: sidebarGap,
      placement: 'right-start',
    }),
    [sidebarGap],
  );
  const { triggerAccessibilityProps, controlledElementAccessibilityProps } =
    useA11yControlledVisibility(visible, {
      accessibilityLabel: triggerTitle,
      hasPopupType: 'menu',
    });

  const baseTrigger = useMemo(
    () => (
      <SidebarItem
        ref={triggerRef}
        Component={Component}
        active={active}
        borderRadius={borderRadius}
        icon="moreVertical"
        onPress={onPress}
        testID="sidebar-more-menu-trigger"
        title={triggerTitle}
        {...triggerAccessibilityProps}
      />
    ),
    [onPress, active, triggerTitle, triggerAccessibilityProps, Component, borderRadius],
  );

  const trigger = useMemo(() => {
    return collapsed && tooltipContent ? (
      <Tooltip content={tooltipContent} disablePortal={disablePortal} placement="right">
        {baseTrigger}
      </Tooltip>
    ) : (
      baseTrigger
    );
  }, [collapsed, tooltipContent, disablePortal, baseTrigger]);

  const handleCloseMenu = useCallback(() => {
    triggerRef.current?.focus();
    setVisible(false);
  }, []);
  const handleOpenMenu = useCallback(() => {
    setVisible(true);
  }, []);

  return (
    <Dropdown
      content={children}
      contentPosition={defaultContentPosition}
      controlledElementAccessibilityProps={controlledElementAccessibilityProps}
      disablePortal={disablePortal}
      maxWidth={sidebarMenuMaxWidth}
      minWidth={sidebarMenuMinWidth}
      onCloseMenu={handleCloseMenu}
      onOpenMenu={handleOpenMenu}
      value={value}
      {...props}
    >
      {trigger}
    </Dropdown>
  );
});
