import React, { memo, ReactNode, useCallback, useMemo, useRef } from 'react';
import { SharedProps, SpacingScale } from '@cbhq/cds-common';
import { sidebarMenuMaxWidth, sidebarMenuMinWidth } from '@cbhq/cds-common/tokens/menu';
import { sidebarGutter, sidebarHorizontalSpacing } from '@cbhq/cds-common/tokens/sidebar';

import { Dropdown, DropdownProps } from '../dropdown';
import { PopoverContentPositionConfig } from '../overlays/popover/PopoverProps';
import { Tooltip } from '../overlays/Tooltip/Tooltip';

import { useSidebarContext } from './SidebarContext';
import { SidebarItem, SidebarItemProps } from './SidebarItem';

export type SidebarMoreMenuProps = {
  children: ReactNode;
  /**
   * Title of the menu trigger. Use this prop to localize the trigger title.
   * @default More
   */
  triggerTitle?: string;
} & Pick<DropdownProps, 'value' | 'onBlur' | 'disablePortal' | 'onChange'> &
  Pick<SidebarItemProps, 'active' | 'tooltipContent' | 'onPress'> &
  SharedProps;

export const SidebarMoreMenu = memo(function SidebarMoreMenu({
  children,
  active,
  onPress,
  value,
  tooltipContent,
  disablePortal,
  triggerTitle = 'More',
  ...props
}: SidebarMoreMenuProps) {
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

  const baseTrigger = useMemo(
    () => (
      <SidebarItem
        ref={triggerRef}
        active={active}
        icon="moreVertical"
        onPress={onPress}
        testID="sidebar-more-menu-trigger"
        title={triggerTitle}
      />
    ),
    [onPress, active, triggerTitle],
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
  }, []);

  return (
    <Dropdown
      content={children}
      contentPosition={defaultContentPosition}
      disablePortal={disablePortal}
      maxWidth={sidebarMenuMaxWidth}
      minWidth={sidebarMenuMinWidth}
      onCloseMenu={handleCloseMenu}
      value={value}
      {...props}
    >
      {trigger}
    </Dropdown>
  );
});
