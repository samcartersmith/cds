import React, { useCallback, useEffect, useState } from 'react';
import { TabProps } from '@cbhq/cds-common';

import { AppSwitcher } from '../../../__stories__/AppSwitcher.stories';
import { HelpMenu } from '../../../__stories__/HelpMenu.stories';
import { ProfileMenu } from '../../../__stories__/ProfileMenu.stories';
import { Button, IconButton, NavigationIconButton } from '../../../buttons';
import { useBreakpoints } from '../../../hooks/useBreakpoints';
import { LogoMark, LogoWordmark } from '../../../icons';
import { Box, HStack, VStack } from '../../../layout';
import { TabNavigation } from '../../../tabs';
import { NavigationBar } from '../..';

import { primaryTabs } from './data';
import MobileAppMenu from './MobileAppMenu';
import { MobileMenu } from './MobileMenu';
import { useWindowDimensions } from './utils';

/**
 * @internal
 */
export const PrimaryNav = () => {
  const [primaryTab, setPrimaryTab] = useState(primaryTabs[0]?.id);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileAppMenuOpen, setIsMobileAppMenuOpen] = useState(false);

  const { width } = useWindowDimensions();

  // Window Breakpoints
  const {
    isPhone,
    isPhoneLandscape,
    isTablet,
    isTabletLandscape,
    isDesktop,
    isDesktopLarge,
    isExtraWide,
  } = useBreakpoints();

  // Close the mobile menu when the window is not in mobile mode anymore
  useEffect(() => {
    if (width > 559) {
      setIsMenuOpen(false);
      setIsMobileAppMenuOpen(false);
    }
  }, [width]);

  const handleMenuButtonClick = useCallback(() => {
    setIsMobileAppMenuOpen(false);
    setIsMenuOpen(!isMenuOpen);
  }, [isMenuOpen]);

  const handleAppMenuOpen = useCallback(() => {
    setIsMenuOpen(false);
    setIsMobileAppMenuOpen(!isMobileAppMenuOpen);
  }, [isMobileAppMenuOpen]);

  return (
    <VStack position="relative">
      <NavigationBar
        end={
          <HStack alignItems="flex-end" gap={1}>
            {isPhone &&
              (isMobileAppMenuOpen ? (
                <IconButton name="close" onClick={handleAppMenuOpen} variant="secondary" />
              ) : (
                <NavigationIconButton
                  compact
                  accessibilityLabel="App Switcher Menu"
                  name="appSwitcher"
                  onClick={handleAppMenuOpen}
                />
              ))}
            {isPhoneLandscape && <AppSwitcher />}
            {(isTablet || isTabletLandscape || isDesktop || isDesktopLarge || isExtraWide) && (
              <HStack gap={1}>
                <Button compact>Get Wallet</Button>
                <HelpMenu />
                <AppSwitcher />
                <ProfileMenu isOpen={false} title="Brian" />
              </HStack>
            )}
          </HStack>
        }
        spacingBottom={0}
        spacingTop={0}
        start={
          <HStack alignItems="center" gap={1} position="relative" top={0} width={120}>
            {width < 1024 && (
              <Box alignItems="center" offsetStart={0} spacingStart={0}>
                <IconButton
                  transparent
                  accessibilityLabel="hamburger"
                  name={isMenuOpen ? 'close' : 'hamburger'}
                  onClick={handleMenuButtonClick}
                  variant="secondary"
                />
              </Box>
            )}
            <Box alignItems="center" spacingBottom={0} width={100}>
              {isPhone ? <LogoMark size={24} /> : <LogoWordmark />}
            </Box>
          </HStack>
        }
      >
        {isDesktop || isTabletLandscape ? (
          <HStack alignItems="center">
            <TabNavigation
              onChange={setPrimaryTab}
              tabs={primaryTabs as Omit<TabProps<string>, 'children'>[]}
              value={primaryTab}
            />
          </HStack>
        ) : (
          // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
          <Box dangerouslySetStyle={{ marginBottom: '40px' }}>&nbsp;</Box>
        )}
      </NavigationBar>
      {isMenuOpen && <MobileMenu />}
      {isMobileAppMenuOpen && <MobileAppMenu />}
    </VStack>
  );
};
