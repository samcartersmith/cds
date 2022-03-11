import React, { memo, ReactNode, useMemo } from 'react';
import { PopoverMenuBaseProps, PopoverPositionConfig, SharedProps } from '@cbhq/cds-common';
import { useScaleDensity } from '@cbhq/cds-common/scale/useScaleDensity';
import { sidebarMenuMaxWidth, sidebarMenuMinWidth } from '@cbhq/cds-common/tokens/menu';
import { sidebarGutter, sidebarHorizontalSpacing } from '@cbhq/cds-common/tokens/sidebar';

import {
  PopoverMenu,
  PopoverTrigger,
  PopoverTriggerProps,
  PopoverTriggerWrapper,
  Tooltip,
} from '../overlays';

import { useSidebarContext } from './SidebarContext';
import { SidebarItem, SidebarItemProps } from './SidebarItem';

export type SidebarMoreMenuProps = {
  children: ReactNode;
} & Pick<
  PopoverMenuBaseProps,
  'onChange' | 'value' | 'visible' | 'openMenu' | 'closeMenu' | 'onBlur' | 'disablePortal'
> &
  Pick<SidebarItemProps, 'active' | 'tooltipContent'> &
  Pick<PopoverTriggerProps, 'onPress'> &
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
  const scale = useScaleDensity();
  const scaleMultiplier = scale === 'dense' ? 4 : 8;
  const calculateMoreMenuOffset = sidebarHorizontalSpacing * scaleMultiplier;
  const { collapsed } = useSidebarContext();

  const popoverPositionConfig = {
    offset: [0, calculateMoreMenuOffset + sidebarGutter],
    placement: 'right-start',
  } as PopoverPositionConfig;

  const baseTrigger = useMemo(
    () => (
      <PopoverTrigger onPress={onPress}>
        <SidebarItem title="More" icon="moreVertical" active={active} />
      </PopoverTrigger>
    ),
    [onPress, active],
  );

  const trigger = useMemo(() => {
    return collapsed && tooltipContent ? (
      <PopoverTriggerWrapper>
        <Tooltip placement="right" disablePortal={disablePortal} content={tooltipContent}>
          {baseTrigger}
        </Tooltip>
      </PopoverTriggerWrapper>
    ) : (
      baseTrigger
    );
  }, [collapsed, tooltipContent, disablePortal, baseTrigger]);

  return (
    <PopoverMenu
      minWidth={sidebarMenuMinWidth}
      maxWidth={sidebarMenuMaxWidth}
      popoverPositionConfig={popoverPositionConfig}
      value={value}
      flush
      disablePortal={disablePortal}
      {...props}
    >
      {trigger}
      {children}
    </PopoverMenu>
  );
});
