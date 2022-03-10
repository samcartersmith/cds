import React, { memo, ReactNode } from 'react';
import { PopoverMenuBaseProps, PopoverPositionConfig, SharedProps } from '@cbhq/cds-common';
import { useScaleDensity } from '@cbhq/cds-common/scale/useScaleDensity';
import { sidebarGutter, sidebarHorizontalSpacing } from '@cbhq/cds-common/tokens/sidebar';
import { sidebarMenuMinWidth, sidebarMenuMaxWidth } from '@cbhq/cds-common/tokens/menu';
import { SidebarItemProps, SidebarItem } from './SidebarItem';
import { PopoverMenu, PopoverTrigger, PopoverTriggerProps } from '../overlays';

export type SidebarMoreMenuProps = {
  children: ReactNode;
} & Pick<
  PopoverMenuBaseProps,
  'onChange' | 'value' | 'visible' | 'openMenu' | 'closeMenu' | 'onBlur' | 'disablePortal'
> &
  Pick<SidebarItemProps, 'active'> &
  Pick<PopoverTriggerProps, 'onPress'> &
  SharedProps;

export const SidebarMoreMenu = memo(function SidebarMoreMenu({
  children,
  active,
  onPress,
  ...props
}: SidebarMoreMenuProps) {
  const scale = useScaleDensity();
  const scaleMultiplier = scale === 'dense' ? 4 : 8;
  const calculateMoreMenuOffset = sidebarHorizontalSpacing * scaleMultiplier;

  const popoverPositionConfig = {
    offset: [0, calculateMoreMenuOffset + sidebarGutter],
    placement: 'right-start',
  } as PopoverPositionConfig;

  return (
    <PopoverMenu
      minWidth={sidebarMenuMinWidth}
      maxWidth={sidebarMenuMaxWidth}
      flush
      popoverPositionConfig={popoverPositionConfig}
      {...props}
    >
      <PopoverTrigger onPress={onPress}>
        <SidebarItem title="More" icon="moreVertical" active={active} />
      </PopoverTrigger>
      {children}
    </PopoverMenu>
  );
});
