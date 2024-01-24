import React, { useCallback, useState } from 'react';
import { useToggler } from '@cbhq/cds-web';
import { Button } from '@cbhq/cds-web/buttons';
import { LogoMark, NavigationIcon } from '@cbhq/cds-web/icons';
import { HStack, VStack } from '@cbhq/cds-web/layout';
import { NavigationBar, NavigationTitle, Sidebar } from '@cbhq/cds-web/navigation';
import { SidebarItem } from '@cbhq/cds-web/navigation/SidebarItem';
import { PortalProvider } from '@cbhq/cds-web/overlays/PortalProvider';
import { FeatureFlagProvider } from '@cbhq/cds-web/system';

import { items } from '../navigation/__stories__/NavigationStorySetup';
import { SelectOption } from '../select/SelectOption';
import { SidebarMoreMenu } from '../sidebarMoreMenu/SidebarMoreMenu';

import { AppSwitcher } from './AppSwitcher.stories';
import { UserSwitcher } from './UserSwitcher.stories';

const sidebarItems = items.slice(0, 4);
const moreMenuOptions = items.slice(4);
/** @deprecated @cbhq/cds-web-overlays will be removed in CDS v6.0.0. Please use cds-web instead */
export const NavigationRecipe = () => {
  const [isCollapsed, handleToggleCollapsed] = useToggler(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [moreMenuValue, setMoreMenuValue] = useState<string | undefined>(undefined);

  const handleMoreMenuChange = useCallback(
    (newValue: string) => {
      const moreIndex =
        moreMenuOptions.findIndex((option) => option.title === newValue) + sidebarItems.length;
      setActiveIndex(moreIndex);
      setMoreMenuValue(newValue);
    },
    [setActiveIndex, setMoreMenuValue],
  );

  const handleItemPress = useCallback(
    (index: number) => {
      setActiveIndex(index);
      setMoreMenuValue(undefined);
    },
    [setActiveIndex, setMoreMenuValue],
  );

  return (
    <PortalProvider>
      <FeatureFlagProvider frontierButton frontierColor>
        <HStack>
          <Sidebar collapsed={isCollapsed} logo={<LogoMark />}>
            {sidebarItems.map((props, index) => (
              <SidebarItem
                key={`sidebar-item--${props.title}`}
                active={index === activeIndex}
                // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
                onPress={() => handleItemPress(index)}
                tooltipContent={props.title}
                {...props}
              />
            ))}
            <SidebarMoreMenu
              active={activeIndex >= sidebarItems.length}
              onChange={handleMoreMenuChange}
              tooltipContent="More"
              value={moreMenuValue}
            >
              {moreMenuOptions.map((item) => (
                <SelectOption
                  key={`sidebar-more-menu-item--${item.title}`}
                  description={item.title}
                  media={<NavigationIcon name={item.icon} />}
                  value={item.title}
                />
              ))}
            </SidebarMoreMenu>
          </Sidebar>
          <VStack width="100%">
            <NavigationBar
              end={
                <HStack alignItems="center" gap={1} justifyContent="flex-end">
                  <AppSwitcher />
                  <UserSwitcher title="Brian" />
                </HStack>
              }
            >
              <NavigationTitle>{[...items, ...moreMenuOptions][activeIndex].title}</NavigationTitle>
            </NavigationBar>
            <HStack
              alignItems="flex-start"
              background="backgroundAlternate"
              flexGrow={1}
              justifyContent="center"
              spacing={4}
            >
              <HStack
                alignItems="flex-start"
                background="backgroundAlternate"
                flexGrow={1}
                justifyContent="center"
                spacing={4}
              >
                <Button compact onPress={handleToggleCollapsed.toggle} variant="primary">
                  {isCollapsed ? 'Expand' : 'Collapse'} Sidebar
                </Button>
              </HStack>
            </HStack>
          </VStack>
        </HStack>
      </FeatureFlagProvider>
    </PortalProvider>
  );
};

export default {
  title: 'Deprecated/Navigation',
  component: NavigationRecipe,
};
