import React, { useMemo } from 'react';
import { useThemeConfig } from '@docusaurus/theme-common';
import { useWindowSize } from '@docusaurus/theme-common/internal';
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle';
import NavbarLogo from '@theme/Navbar/Logo';
import NavbarMobileSidebarToggle from '@theme/Navbar/MobileSidebar/Toggle';
import NavbarItem, { type Props as NavbarItemConfig } from '@theme/NavbarItem';
import SearchBar from '@theme/SearchBar';
import { HStack } from '@cbhq/cds-web2/layout';

function useNavbarItems() {
  // TODO temporary casting until ThemeConfig type is improved
  return useThemeConfig().navbar.items as NavbarItemConfig[];
}

export default function NavbarContent(): JSX.Element {
  const windowSize = useWindowSize({ desktopBreakpoint: 1280 });

  const items = useNavbarItems();
  const linkItems = useMemo(
    () => items.filter((item) => item.type === 'default' || !item.type),
    [items],
  );
  const searchBarItem = useMemo(() => items.find((item) => item.type === 'search'), [items]);

  return (
    <HStack flexGrow={1} justifyContent="space-between" paddingX={4} paddingY={2}>
      <HStack gap={1.5}>
        {windowSize === 'mobile' && <NavbarMobileSidebarToggle />}
        <NavbarLogo />
      </HStack>
      <HStack alignItems="center" gap={1.5}>
        {searchBarItem && <SearchBar />}
        {windowSize === 'desktop' && (
          <HStack borderRadius={1000} gap={0} height={40} overflow="hidden">
            {linkItems.map((item) => (
              <NavbarItem key={item.title} {...item} />
            ))}
          </HStack>
        )}
        <NavbarColorModeToggle />
      </HStack>
    </HStack>
  );
}
