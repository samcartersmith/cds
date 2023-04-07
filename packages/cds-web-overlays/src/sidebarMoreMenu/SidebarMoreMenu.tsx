import React, { memo, ReactNode, useCallback, useMemo, useRef } from 'react';
import { SharedProps, SpacingScale } from '@cbhq/cds-common';
import { sidebarMenuMaxWidth, sidebarMenuMinWidth } from '@cbhq/cds-common/tokens/menu';
import { sidebarGutter, sidebarHorizontalSpacing } from '@cbhq/cds-common/tokens/sidebar';
import { useSidebarContext } from '@cbhq/cds-web/navigation/SidebarContext';

import { Dropdown, DropdownProps } from '../dropdown';
import { PopoverContentPositionConfig } from '../popover/PopoverProps';
import { Tooltip } from '../tooltip/Tooltip';

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
        onPress={onPress}
        title={triggerTitle}
        icon="moreVertical"
        active={active}
        ref={triggerRef}
        testID="sidebar-more-menu-trigger"
      />
    ),
    [onPress, active, triggerTitle],
  );

  const trigger = useMemo(() => {
    return collapsed && tooltipContent ? (
      <Tooltip placement="right" disablePortal={disablePortal} content={tooltipContent}>
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
      minWidth={sidebarMenuMinWidth}
      maxWidth={sidebarMenuMaxWidth}
      contentPosition={defaultContentPosition}
      value={value}
      disablePortal={disablePortal}
      content={children}
      onCloseMenu={handleCloseMenu}
      {...props}
    >
      {trigger}
    </Dropdown>
  );
});
