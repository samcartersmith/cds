import React, { memo, ReactNode, useMemo } from 'react';
import { SharedProps, SpacingScale } from '@cbhq/cds-common';
import { sidebarMenuMaxWidth, sidebarMenuMinWidth } from '@cbhq/cds-common/tokens/menu';
import { sidebarGutter, sidebarHorizontalSpacing } from '@cbhq/cds-common/tokens/sidebar';

import { Dropdown, DropdownProps } from '../dropdown';
import { Tooltip } from '../overlays';
import { PopoverContentPositionConfig } from '../overlays/positionedOverlay/PositionedOverlayProps';

import { useSidebarContext } from './SidebarContext';
import { SidebarItem, SidebarItemProps } from './SidebarItem';

export type SidebarMoreMenuProps = {
  children: ReactNode;
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
  ...props
}: SidebarMoreMenuProps) {
  const { collapsed } = useSidebarContext();
  const sidebarGap = (sidebarHorizontalSpacing + sidebarGutter) as SpacingScale;
  const defaultContentPosition: PopoverContentPositionConfig = useMemo(
    () => ({
      gap: sidebarGap,
      placement: 'right-start',
    }),
    [sidebarGap],
  );

  const baseTrigger = useMemo(
    () => <SidebarItem onPress={onPress} title="More" icon="moreVertical" active={active} />,
    [onPress, active],
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

  return (
    <Dropdown
      minWidth={sidebarMenuMinWidth}
      maxWidth={sidebarMenuMaxWidth}
      contentPosition={defaultContentPosition}
      value={value}
      disablePortal={disablePortal}
      content={children}
      {...props}
    >
      {trigger}
    </Dropdown>
  );
});
