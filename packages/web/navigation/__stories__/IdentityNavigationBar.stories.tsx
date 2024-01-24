import { memo, useCallback, useState } from 'react';
import { Story } from '@storybook/react';

import { AppSwitcher } from '../../__stories__/AppSwitcher.stories';
import { HelpMenu } from '../../__stories__/HelpMenu.stories';
import { ProfileMenu } from '../../__stories__/ProfileMenu.stories';
import { Button, IconButton, NavigationIconButton } from '../../buttons';
import { SearchInput } from '../../controls';
import { HStack, Spacer, VStack } from '../../layout';
import { PortalProvider } from '../../overlays/PortalProvider';
import { FeatureFlagProvider, ThemeProvider } from '../../system';
import { TabNavigation } from '../../tabs';
import { TextTitle1 } from '../../typography';
import { enableJavascript } from '../../utils/storybookParams/percy';
import { NavigationBar, NavigationBarProps } from '..';

import { tabs } from './NavigationStorySetup';

export default {
  component: NavigationBar,
  title: 'Recipes/IdentityNavigationBar',
};

const IdentityNavigationBar = memo(({ start, end, bottom, children }: NavigationBarProps) => {
  return (
    <NavigationBar
      accessibilityLabel="main navigation"
      bottom={bottom}
      end={
        <HStack alignItems="center" gap={1}>
          {end}
          <AppSwitcher />
          <ProfileMenu isOpen={false} title="Brian" />
        </HStack>
      }
      start={start}
    >
      {children}
    </NavigationBar>
  );
});

const IdentityNavigationBarConsumer = () => {
  const [tab, setTab] = useState(tabs[0].id);
  const [search, setSearch] = useState('');
  const handleBackIconClick = useCallback(() => {
    setTab(tabs[0].id);
  }, [setTab]);
  return (
    <IdentityNavigationBar
      bottom={<TabNavigation onChange={setTab} tabs={tabs} value={tab} />}
      end={
        <HStack alignItems="center" gap={2}>
          <HStack alignItems="center" gap={1}>
            <Button compact>Primary</Button>
            <Button compact variant="secondary">
              Secondary
            </Button>
          </HStack>
          <HStack alignItems="center" gap={1}>
            <HelpMenu />
            <NavigationIconButton accessibilityLabel="Language" active={false} name="globe" />
            <NavigationIconButton accessibilityLabel="Notifications" active={false} name="bell" />
          </HStack>
        </HStack>
      }
      start={
        tab !== tabs[0].id && (
          <IconButton accessibilityLabel="Back" name="backArrow" onPress={handleBackIconClick} />
        )
      }
    >
      <HStack alignItems="center" flexGrow={1} gap={1}>
        <VStack width="100%">
          <SearchInput
            compact
            accessibilityLabel="Search"
            onChangeText={setSearch}
            placeholder="Search"
            value={search}
          />
        </VStack>
      </HStack>
    </IdentityNavigationBar>
  );
};

export const IdentityNavigationBarExampleDefault: Story = () => {
  return (
    <PortalProvider>
      <FeatureFlagProvider frontierButton frontierColor>
        <ThemeProvider>
          <TextTitle1 as="h1">NavigationBar example for Identity Team</TextTitle1>
          <Spacer />
          <IdentityNavigationBarConsumer />
        </ThemeProvider>
      </FeatureFlagProvider>
    </PortalProvider>
  );
};

IdentityNavigationBarExampleDefault.parameters = {
  percy: enableJavascript,
  a11y: {
    config: {
      /**
       * The TabNavigation docs explain the proper way to setup the tabpanel.
       * Disabled because CDS TabNavigation doesn't have associated panels.
       * @link https://cds.cbhq.net/components/tab-navigation#accessibility
       * */
      rules: [{ id: 'aria-valid-attr-value', enabled: false }],
    },
  },
};
